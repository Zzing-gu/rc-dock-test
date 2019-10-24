import React, { useEffect, useRef } from "react";

import "litegraph.js/css/litegraph.css";
import { LGraph, LGraphCanvas } from "litegraph.js";
import { addDragStateListener } from "rc-dock";


const graphRef = new LGraph();
var lgCanvasRef 
export default function LiteGraphComponent() {
  const lgRef = useRef();
  useEffect(() => {
    const graphcanvas = new LGraphCanvas(lgRef.current, graphRef);

    graphRef.onAfterExecute = function() {
      graphcanvas.draw(true);
    };

    lgCanvasRef = graphcanvas

    addDragStateListener(() => {
        lgCanvasRef.resize();
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <canvas ref={lgRef} id="mycanvas" width="1024" height="720"></canvas>
    </div>
  );
}
