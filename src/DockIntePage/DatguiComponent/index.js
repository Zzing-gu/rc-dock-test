import React, {useEffect, useRef} from 'react'
import dat from 'dat.gui'
import { addDragStateListener } from "rc-dock";




var AdboObject = function() {
    this.ramenWidth = 43;
    this.ramenColumnXY= 5;
    this.ramenBeamZ= 4;
    this.height= 27;
    this.spanLength=0 ;
    this.pivotMode= 0;
    this.floor= 1;
    this.floorHeight= 30;
  };


export default function DatguiComponent(){
    const datRef =useRef()

    useEffect(()=>{
        var Adbo = new AdboObject()
        var gui = new dat.GUI({autoPlace:false});
        gui.add(Adbo , 'ramenWidth')
        gui.width = datRef.current.clientWidth
        datRef.current.appendChild(gui.domElement)

        addDragStateListener(()=>{
            gui.width = datRef.current.clientWidth
        })
    },[])

    return (
        <div ref={datRef} style={{height:'100%'}}></div>
    )
}