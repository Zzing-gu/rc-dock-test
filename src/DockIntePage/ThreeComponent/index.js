import React, { useEffect, useRef } from "react";
import { addDragStateListener } from "rc-dock";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

export default function ThreeWrapper() {
  var scene, camera, renderer, mesh, material, geometry;
  const threeRef = useRef();

  function animate() {
    //console.log('animateddd')
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //console
  }

  useEffect(() => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    threeRef.current.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      70,
      threeRef.current.clientWidth / threeRef.current.clientHeight
    );
    camera.up = new THREE.Vector3(0, 0, 1);

    renderer.setSize(
      threeRef.current.clientWidth,
      threeRef.current.clientHeight
    );

    geometry = new THREE.BoxGeometry(2, 2, 2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    //mesh.position.set(10, 0, 0)
    scene.add(mesh);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    // threeRef.current.appendChild(renderer.domElement);
    // threeRef.current.appendChild(stats.dom)

    var GridHelper = new THREE.GridHelper(1000, 100);
    //  y z axis exchange
    GridHelper.rotation.set(Math.PI / 2, 0, 0);
    scene.add(GridHelper);

    var AxesHelper = new THREE.AxesHelper(50);
    AxesHelper.position.set(0, 0, 0.1);
    scene.add(AxesHelper);

    animate();

    console.log(
      threeRef.current.parentElement.parentElement.parentElement.parentElement
    );

    // threeRef.current.parentElement.parentElement.parentElement.parentElement.addEventListener("resize", (e)=>{
    //     console.log('resized!!')
    // })
    window.addEventListener("resize", () => {
      console.log("hihi");
    });

    addDragStateListener(() => {
      console.log("hihihi");
      camera.aspect =
        renderer.domElement.parentElement.clientWidth /
        renderer.domElement.parentElement.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        renderer.domElement.parentElement.clientWidth,
        renderer.domElement.parentElement.clientHeight
      );
    });
  }, []);

  return <div style={{ height: "100%" }} ref={threeRef}></div>;
}
