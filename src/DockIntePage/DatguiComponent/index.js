import React, { useEffect, useRef } from "react";
import dat from "dat.gui";
import { addDragStateListener, removeDragStateListener } from "rc-dock";

import {graphRef} from '../LiteGraphComponent'
import {ClearData} from '../SpagettiUtils/threeFuncs'



const excute = () => {
    for (var key in inputVars) {
      if (!isNaN(key)) {
        graphRef._nodes_by_id[key].properties.value = inputVars[key];
      }
    }
    ClearData();
    graphRef.runStep(1);
  };

  var inputVars = { run: excute };

  const refreshGUI = datGUI => {
    var nodesList = new Map(
      graphRef._nodes
        .filter(node => node.type === "widget/number")
        .map(i => [i.id, i])
    );
    datGUI.destroy();

    graphRef._groups.map(groups => {
      groups.recomputeInsideNodes();
      var f = datGUI.addFolder(groups.title);
      groups._nodes
        .filter(node => node.type === "widget/number")
        .map(node => {
          inputVars[`${node.id}`] = node.properties.value;
          f.add(
            inputVars,
            `${node.id}`,
            node.properties.min,
            node.properties.max,
            node.properties.step
          ).name(`${node.title}`);
          nodesList.delete(node.id);
        });
    });

    for (var node of nodesList.values()) {
      inputVars[`${node.id}`] = node.properties.value;
      datGUI
        .add(
          inputVars,
          `${node.id}`,
          node.properties.min,
          node.properties.max,
          node.properties.step
        )
        .name(`${node.title}`);
    }

    datGUI.add(inputVars, "run");
  };

var FizzyText = function() {
  this.message = "dat.gui";
  this.speed = 0.8;
  this.displayOutline = false;
  this.excuteaction = () => refreshGUI(gui);
};

var text = new FizzyText();

var AdboObject = function() {
  this.ramenWidth = 43;
  this.ramenColumnXY = 5;
  this.ramenBeamZ = 4;
  this.height = 27;
  this.spanLength = 0;
  this.pivotMode = 0;
  this.floor = 1;
  this.floorHeight = 30;
};

var Adbo = new AdboObject();
var gui = new dat.GUI({ autoPlace: false });
gui.add(text, "excuteaction");

var datRef2;

export default function DatguiComponent() {
  const datRef = useRef();

  useEffect(() => {
    gui.width = datRef.current.clientWidth;
    datRef.current.appendChild(gui.domElement);
    datRef2 = datRef.current;
    const resizeFunc = () => {
      gui.width = datRef2.offsetWidth;
    };
    addDragStateListener(resizeFunc);

    return () => {
      removeDragStateListener(resizeFunc);
    };
  }, []);

  return <div ref={datRef} style={{ height: "100%" }}></div>;
}
