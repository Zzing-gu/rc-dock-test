import React, { useEffect, useRef } from "react";
import { addDragStateListener } from "rc-dock";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { Vector3 } from "three";

var scene, camera, renderer, mesh, material, geometry;
renderer = new THREE.WebGLRenderer({ antialias: true });
scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(70, 100 / 100);

camera.position.z = 5;

camera.up = new Vector3(0, 0, 1);

geometry = new THREE.BoxGeometry(2, 2, 2);
material = new THREE.MeshNormalMaterial();

mesh = new THREE.Mesh(geometry, material);
//mesh.position.set(10, 0, 0)
scene.add(mesh);

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

function animate() {
  //console.log('animateddd')
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //console
}

function CameraSetting() {}

export default function ThreeWrapper() {
  const threeRef = useRef();

  useEffect(() => {
    threeRef.current.appendChild(renderer.domElement);

    camera.aspect =
      renderer.domElement.parentElement.clientWidth /
      renderer.domElement.parentElement.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      renderer.domElement.parentElement.clientWidth,
      renderer.domElement.parentElement.clientHeight
    );
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
