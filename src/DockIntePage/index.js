import React from "react";
import DockLayout from "rc-dock";

import ThreeComponent from "./ThreeComponent";
import LiteGraphComponent from "./LiteGraphComponent";
import DatguiComponent from "./DatguiComponent";

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
        cashed: true,
        tabs: [
          {
            ...tab,
            id: "t5",
            title: "LiteGraph",
            content: <LiteGraphComponent />,
            minWidth: 3
          }
        ]
      },
      {
        size: 600,
        cashed: true,
        tabs: [
          { ...tab, id: "t8", title: "Three.js", content: <ThreeComponent /> }
        ]
      },
      {
        size: 200,
        cashed: true,
        tabs: [
          { ...tab, id: "t9", title: "DatGui", content: <DatguiComponent /> }
        ]
      }
    ]
  }
};

export default function DockIntePage() {
  // height 1 넣어주면 되긴함 ... 안넣어주면 이동에 재약
  return (
    <div style={{ height: "100vh" }}>
      <DockLayout style={{ height: 1 }} defaultLayout={defaultLayout} />
    </div>
  );
}
