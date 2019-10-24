import React, { useEffect, useRef } from "react";

import "litegraph.js/css/litegraph.css";
import { LGraph, LGraphCanvas } from "litegraph.js";
import { addDragStateListener } from "rc-dock";

export default function LiteGraphComponent() {
    const lgRef = useRef()
  useEffect(() => {
    
    const graphRef = new LGraph();
    const graphcanvas = new LGraphCanvas(lgRef.current, graphRef);
    

    graphRef.onAfterExecute = function() {
      graphcanvas.draw(true);
    };

    addDragStateListener(()=>{
        graphcanvas.resize();
    })
  }, []);

  return (
    <div
       
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <canvas ref={lgRef} id='mycanvas' width='1024' height='720' ></canvas>
    </div>
  );
}
