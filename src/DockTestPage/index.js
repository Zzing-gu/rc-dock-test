import React, {useEffect} from "react";
import DockLayout from "rc-dock";

let name = window.location.pathname.split("/").pop();
name = name.substr(0, name.length - 5);
console.log(name);

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
  closable: true
};

var defaultLayout = {
  dockbox: {
    mode: "horizontal",
    children: [
      {
        mode: "vertical",
        size: 200,
        children: [
          {
            tabs: [
              { ...tab, id: "t1", title: "Tab 1" },
              { ...tab, id: "t2", title: "Tab 2" }
            ]
          },
          {
            tabs: [
              {
                ...tab,
                id: "t3",
                title: "Min Size",
                content: (
                  <div>
                    <p>This tab has a minimal size</p>
                    150 x 150 px
                  </div>
                ),
                minWidth: 150,
                minHeight: 150
              },
              { ...tab, id: "t4", title: "Tab 4" }
            ]
          }
        ]
      },
      {
        size: 1000,
        tabs: [
          {
            ...tab,
            id: "t5",
            title: "basic demo",
            content: (
              <div>
                This panel won't be removed from layout even when last Tab is
                closed
              </div>
            )
          }
        ],
        panelLock: { panelStyle: "main" }
      },
      {
        size: 200,
        tabs: [{ ...tab, id: "t8", title: "Tab 8" }]
      }
    ]
  }
};

export default function DockTestPage() {

    useEffect(()=>{
        //document.querySelector(".dock-layout").style.height = 1
    },[])

// height 1 넣어주면 되긴함 ... 안넣어주면 이동에 재약 
  return (
    <div style={{ height: "100vh" }}>
      <DockLayout style={{height:1}} defaultLayout={defaultLayout} />
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
