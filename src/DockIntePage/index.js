import React, { useEffect, useRef } from "react";
import DockLayout, {
  DragDropDiv,
  addHandlers,
  addDragStateListener
} from "rc-dock";

import { LGraph, LGraphCanvas } from "litegraph.js";




import ThreeComponent from './ThreeComponent'
import LiteGraphComponent from './LiteGraphComponent'
import DatguiComponent from './DatguiComponent'

let name = window.location.pathname.split("/").pop();
name = name.substr(0, name.length - 5);
console.log(name);

//hooks 로 만들고 컨텐츠로 넣어주어야 겠다 ...



export const jsxTab = {
  id: "jsxTab",
  title: "jsx",
  closable: true
};

export const htmlTab = {
  id: "htmlTab",
  title: "html",
  closable: true
};

var tab = {
  content: <div>Tab Content</div>,
  closable: false
};

var defaultLayout = {
  dockbox: {
    mode: "horizontal",
    children: [
      {
        size: 700,
        tabs: [
          {
            ...tab,
            id: "t5",
            title: "LiteGraph",
            content: (
                <LiteGraphComponent/>
            )
          }
        ]
      },
      {
        size: 600,
        tabs: [{ ...tab, id: "t8", title: "Three.js", content: <ThreeComponent /> }]
      },
      {
        size: 200,
        tabs: [{ ...tab, id: "t9", title: "DatGui", content: <DatguiComponent/>}]
      }
    ]
  }
};

export default function DockIntePage() {
  useEffect(() => {
    //document.querySelector(".dock-layout").style.height = 1
  }, []);

  // height 1 넣어주면 되긴함 ... 안넣어주면 이동에 재약
  return (
    <div style={{ height: "100vh" }}>
      <DockLayout style={{ height: 1 }} defaultLayout={defaultLayout} />
    </div>
  );
}

// export default class DockTestPage extends React.Component {
//   render() {
//     return (
//       <div style={{ height: "100vh" }}>
//         <DockLayout defaultLayout={defaultLayout} />
//       </div>
//     );
//   }
// }
