import React, { useEffect, useRef } from "react";

import "litegraph.js/css/litegraph.css";
import { LiteGraph, LGraph, LGraphCanvas } from "litegraph.js";
import { addDragStateListener, removeDragStateListener } from "rc-dock";

import { CustomNodesCreate } from "../SpagettiUtils/customNodes";
import { CheckResultJson, ClearData } from "../SpagettiUtils/threeFuncs";

import { ClearWrapper } from "../ThreeComponent";

CustomNodesCreate(LiteGraph);

export const graphRef = new LGraph();
var lgCanvasRef;

var fileInputRef;

export default function LiteGraphComponent() {
  const lgRef = useRef();
  fileInputRef = useRef();
  useEffect(() => {
    lgCanvasRef = new LGraphCanvas(lgRef.current, graphRef);
    const funz = () => {
      lgCanvasRef.resize();
    };
    graphRef.onAfterExecute = function() {
      lgCanvasRef.draw(true);
    };

    addDragStateListener(funz);

    return () => {
      removeDragStateListener(funz);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#3d3d3d"
      }}
    >
      <button onClick={StartAction}>Start</button>
      <button onClick={StopAction}>Stop</button>
      <button onClick={saveAction}>Save</button>
      <button onClick={loadAction}>Load</button>
      <input
        type="file"
        name="myFile"
        ref={fileInputRef}
        onChange={loadFileAction}
      ></input>
      <button onClick={downloadAction}>Download</button>
      <button onClick={clearScene}>ClearScene</button>
      <button onClick={JsonFetchAction}>SendJson</button>
      <canvas ref={lgRef} id="mycanvas" width="1024" height="720"></canvas>
    </div>
  );
}

const StartAction = () => {
  
  ClearData();

  graphRef.runStep(1);
 
};
const StopAction = () => {
  graphRef.stop();
};

const saveAction = () => {
  console.log("saved");
  localStorage.setItem("graphdemo_save", JSON.stringify(graphRef.serialize()));
};

const loadAction = () => {
  var data = localStorage.getItem("graphdemo_save");

  if (data) {
    graphRef.configure(JSON.parse(data));
  }
  console.log("loaded");
};

const loadFileAction = () => {
  const fr = new FileReader();

  fr.addEventListener("load", e => {
    graphRef.configure(JSON.parse(fr.result));
  });

  fr.readAsText(fileInputRef.current.files[0]);

  console.log(" json loaded");
};

const downloadAction = () => {
  var data = JSON.stringify(graphRef.serialize());
  var file = new Blob([data]);
  var url = URL.createObjectURL(file);
  var element = document.createElement("a");
  element.setAttribute("href", url);
  element.setAttribute("download", "graph.JSON");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  setTimeout(function() {
    URL.revokeObjectURL(url);
  }, 1000 * 60); //wait one minute to revoke url
};

const clearScene = () => {
  ClearWrapper();
};

const JsonFetchAction = () => {
  var result = CheckResultJson();
  console.log(result);

  var data = JSON.stringify(result);
  var file = new Blob([data]);
  var url = URL.createObjectURL(file);
  var element = document.createElement("a");
  element.setAttribute("href", url);
  element.setAttribute("download", "result.JSON");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  setTimeout(function() {
    URL.revokeObjectURL(url);
  }, 1000 * 60); //wait one minute to revoke url
};
