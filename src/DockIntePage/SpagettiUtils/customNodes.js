import { ThreeRenderAction } from "../ThreeComponent";
import { DrawRamenFix, DrawSlabFix } from "./threeFuncs";

export function CustomNodesCreate(LiteGraph) {
  function ThreeRenderer() {
    this.addInput("mesh", "meshxx");
  }

  ThreeRenderer.prototype.onExecute = function() {
    ThreeRenderAction(this.getInputData(0));
  };

  LiteGraph.registerNodeType("nexivil/threerenderer", ThreeRenderer);

  function RamenMaker() {
    this.addInputs([
      ["ramenX", "number"],
      ["ramenColumnXY", "number"],
      ["ramenBeamZ", "number"],
      ["height", "number"],
      ["spanLength", "number"],
      ["pivotPos", "number"],
      ["floor", "number"],
      ["floorHeight", "number"]
    ]);
    this.addOutput("mesh", "meshxx");
  }

  RamenMaker.prototype.onExecute = function() {
    var ramenMesh = DrawRamenFix(
      this.getInputData(0),
      this.getInputData(1),
      this.getInputData(2),
      this.getInputData(3),
      this.getInputData(4),
      this.getInputData(5),
      this.getInputData(6),
      this.getInputData(7)
    );

    this.setOutputData(0, ramenMesh);
  };

  LiteGraph.registerNodeType("nexivil/ramenMaker", RamenMaker);

  function SlabMaker() {
    this.addInputs([
      ["slabX", "number"],
      ["slabY", "number"],
      ["slabZ", "number"],
      ["floorHeight", "number"],
      ["floor", "number"],
      ["leftCantilever", "number"],
      ["rightCantilever", "number"],
      ["loads", "LoadType"]
    ]);
    this.addOutput("mesh", "meshxx");
  }

  SlabMaker.prototype.onExecute = function() {
    //console.log(this.getInputData(7))
    var slabMesh = DrawSlabFix(
      this.getInputData(0),
      this.getInputData(1),
      this.getInputData(2),
      this.getInputData(3),
      this.getInputData(4),
      this.getInputData(5),
      this.getInputData(6),
      this.getInputData(7)
    );

    this.setOutputData(0, slabMesh);
  };

  LiteGraph.registerNodeType("nexivil/slabmaker", SlabMaker);

  function Subtract() {
    this.addInputs([["x", "number"], ["y", "number"]]);
    this.addOutput("result", "number");
  }

  Subtract.prototype.onExecute = function() {
    var result = this.getInputData(0) - this.getInputData(1);
    //console.log(result)
    this.setOutputData(0, result);
  };

  LiteGraph.registerNodeType("nexivil/subtract", Subtract);

  function Sum() {
    this.addInputs([["x", "number"], ["y", "number"]]);
    this.addOutput("result", "number");
  }

  Sum.prototype.onExecute = function() {
    var result = this.getInputData(0) + this.getInputData(1);
    //console.log(result)
    this.setOutputData(0, result);
  };

  LiteGraph.registerNodeType("nexivil/sum", Sum);

  function Load() {
    this.addInputs([["magnitude", "number"], ["direction", "number"]]);
    this.addProperty("Type", "area", "enum", {
      values: ["area", "point", "line"]
    });
    this.addOutput("load", "LoadType");
  }
  Load.title = "Load";

  Load.prototype.getTitle = function() {
    return `${this.title} (${this.properties.Type})`;
  };

  Load.prototype.onPropertyChanged = function() {
    switch (this.properties.Type) {
      case "area":
        if (this.inputs.find(item => item.name === "position"))
          this.removeInput(2);
        if (this.inputs.find(item => item.name === "position2"))
          this.removeInput(3);
        break;
      case "point":
        if (!this.inputs.find(item => item.name === "position"))
          this.addInput("position", "pos");
        if (this.inputs.find(item => item.name === "position2"))
          this.removeInput(3);
        break;
      case "line":
        if (!this.inputs.find(item => item.name === "position"))
          this.addInput("position", "pos");
        if (!this.inputs.find(item => item.name === "position2"))
          this.addInput("position2", "pos");
        break;
    }
  };

  Load.prototype.onExecute = function() {
    var loads = {};
    loads.magnitude = this.getInputData(0);
    loads.direction = this.getInputData(1);
    this.setOutputData(0, loads);
  };

  LiteGraph.registerNodeType("nexivil/Load", Load);
}
