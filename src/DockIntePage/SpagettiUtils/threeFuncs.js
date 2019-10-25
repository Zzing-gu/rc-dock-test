import * as THREE from "three";

var slabNodeArr = [];
var ramenNodeArr = [];

var Node = {};
var Part = {};
var Section = {};

export function DrawRamenFix(
  ramenWidth,
  ramenColumnXY,
  ramenBeamZ,
  height,
  spanLength,
  pivotMode,
  floor,
  floorHeight
) {
  var adjustedFloor = floor - 1;
  var ramenPosZ;
  var ramenPivotCenter;
  var spanLengthFix;

  switch (pivotMode) {
    case 0:
      ramenPosZ = -ramenColumnXY / 2;
      ramenPivotCenter = ramenColumnXY / 2;
      spanLengthFix = spanLength;
      break;
    case 1:
      ramenPosZ = ramenColumnXY / 2;
      ramenPivotCenter = -ramenColumnXY / 2;
      spanLengthFix = spanLength + ramenColumnXY;
      break;

    default:
      break;
  }

  var pivotGeo = new THREE.SphereGeometry(1, 15, 15);
  var pivotMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true
  });
  var pivotPoint = new THREE.Mesh(pivotGeo, pivotMat);
  pivotPoint.position.set(spanLengthFix, 0, adjustedFloor * floorHeight);

  var beamPivot = new THREE.Mesh(pivotGeo, pivotMat);
  beamPivot.position.set(0, 0, height - ramenBeamZ);

  //Ramen Beam
  var rbgeometry = new THREE.BoxGeometry(ramenWidth, ramenColumnXY, ramenBeamZ);
  var rbmaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true
  });
  var ramenBeam = new THREE.Mesh(rbgeometry, rbmaterial);
  ramenBeam.position.set(ramenWidth / 2, ramenPosZ, ramenBeamZ / 2);

  //first Ramen Column
  var geometry1 = new THREE.BoxGeometry(ramenColumnXY, ramenColumnXY, height);
  var material1 = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true
  });
  var ramenCol1 = new THREE.Mesh(geometry1, material1);
  ramenCol1.position.set(ramenColumnXY / 2, ramenPosZ, height / 2);

  //second Ramen Column
  var geometry2 = new THREE.BoxGeometry(ramenColumnXY, ramenColumnXY, height);
  var material2 = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true
  });
  var ramenCol2 = new THREE.Mesh(geometry2, material2);
  ramenCol2.position.set(ramenWidth - ramenColumnXY / 2, ramenPosZ, height / 2);

  beamPivot.add(ramenBeam);
  pivotPoint.add(beamPivot);
  pivotPoint.add(ramenCol1);
  pivotPoint.add(ramenCol2);
  //pivotPoint.add(tramenBeam)
  pivotPoint.rotation.set(0, 0, Math.PI / 2);

  // 다커짐 ....
  //pivotPoint.scale.set(2, 1 ,1)

  // 부분 만 커지게 .....
  //ramenBeam.scale.set(2, 1 ,1)

  var result = {
    floor: floor,
    nodes: [
      [
        ramenPivotCenter + spanLength,
        ramenColumnXY / 2,
        adjustedFloor * floorHeight
      ],
      [
        ramenPivotCenter + spanLength,
        ramenColumnXY / 2,
        height - ramenBeamZ / 2 + adjustedFloor * floorHeight
      ],
      [
        ramenPivotCenter + spanLength,
        ramenWidth - ramenColumnXY / 2,
        height - ramenBeamZ / 2 + adjustedFloor * floorHeight
      ],
      [
        ramenPivotCenter + spanLength,
        ramenWidth - ramenColumnXY / 2,
        adjustedFloor * floorHeight
      ]
    ]
  };
  ramenNodeArr.push(result);

  Section["1"] = {
    name: "rahmen",
    width: ramenColumnXY,
    depth: ramenColumnXY,
    height: height
  };

  return pivotPoint;
}

export function DrawSlabFix(
  slabX,
  slabY,
  slabZ,
  floorHeight,
  floor,
  lc,
  rc,
  load
) {
  var pivotGeo = new THREE.SphereGeometry(1, 15, 15);
  var pivotMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true
  });
  var pivotPoint = new THREE.Mesh(pivotGeo, pivotMat);

  pivotPoint.position.set(0, 0, floorHeight * floor);

  //first Ramen Column
  console.log(`slabX is ${slabX}`);
  var geometry1 = new THREE.BoxGeometry(slabX, slabY, slabZ);
  var material1 = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true
  });
  var slabMesh = new THREE.Mesh(geometry1, material1);
  slabMesh.position.set(slabX / 2, -slabY / 2, -slabZ / 2);

  pivotPoint.add(slabMesh);
  console.log(slabMesh.geometry.vertices[0]);
  console.log(slabMesh.localToWorld(slabMesh.geometry.vertices[0]));
  slabMesh.updateMatrixWorld();
  var vector = slabMesh.geometry.vertices[0].clone();
  vector.applyMatrix4(slabMesh.matrixWorld);
  console.log(vector);

  // lc, rc 가 존재할경우 추가해서 , pivot point 의 자식으로 넣어주자
  console.log(`lc is ${lc}`);
  if (lc !== 0 && lc !== undefined) {
    console.log(typeof lc);
    console.log(lc);
    var geometry = new THREE.BoxGeometry(slabX, lc, slabZ);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffbb00,
      wireframe: true
    });
    var lcMesh = new THREE.Mesh(geometry, material);
    lcMesh.position.set(slabX / 2, lc / 2, -slabZ / 2);
    pivotPoint.add(lcMesh);
  }
  console.log(`rc is ${rc}`);
  if (rc !== 0 && rc !== undefined) {
    console.log(typeof rc);
    console.log(rc);
    var geometry = new THREE.BoxGeometry(slabX, rc, slabZ);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffbb00,
      wireframe: true
    });
    var rcMesh = new THREE.Mesh(geometry, material);
    rcMesh.position.set(slabX / 2, -rc / 2 - slabY, -slabZ / 2);
    pivotPoint.add(rcMesh);
  }

  pivotPoint.rotation.set(0, 0, Math.PI / 2);

  var result = {
    floor: floor,
    nodes: [
      [-lc, 0, floor * floorHeight - slabZ],
      [slabY + rc, 0, floor * floorHeight - slabZ],
      [slabY + rc, slabX, floor * floorHeight - slabZ],
      [-lc, slabX, floor * floorHeight - slabZ]
    ],
    loads: load
  };
  slabNodeArr.push(result);

  Section["2"] = {
    name: "slab",
    width: slabY,
    depth: slabX,
    height: slabZ
  };

  return pivotPoint;
}

export function ClearData() {
  ramenNodeArr = [];
  slabNodeArr = [];

  Node = {};
  Section = {};
  Part = {};
}

export function CheckResultJson() {
  var LiveLoad = {};

  console.log(slabNodeArr);
  console.log(ramenNodeArr);

  var sortedRamen = ramenSorting(ramenNodeArr);
  var sortedSlab = SlabSorting(slabNodeArr);

  sortedSlab.map((v, i) => {
    v.nodes.map((v, j) => {
      Node[Object.keys(Node).length + 1] = v;
    });

    LiveLoad[i] = { ...v.loads, floor: v.floor };
  });

  sortedRamen.map((v, i) => {
    v.nodes.map((v, j) => {
      Node[Object.keys(Node).length + 1] = v;
    });
  });

  sortedSlab.map((v, i) => {
    var len = Object.keys(Part).length * 4;
    Part[Object.keys(Part).length + 1] = {
      type: "slab",
      nodes: [len + 1, len + 2, len + 3, len + 4],
      section: 2,
      material: 1,
      floor: v.floor
    };
  });

  sortedRamen.map((v, i) => {
    var len = Object.keys(Part).length * 4;
    Part[Object.keys(Part).length + 1] = {
      type: "rahmen",
      nodes: [len + 1, len + 2, len + 3, len + 4],
      section: 1,
      material: 1,
      floor: v.floor
    };
  });

  console.log(Node);
  console.log(Part);
  console.log(LiveLoad);

  ramenNodeArr = [];
  slabNodeArr = [];

  var NodeResult = { ...Node };
  var SectionResult = { ...Section };
  var PartResult = { ...Part };

  //Node = {}
  //Section = {}
  //Part = {}

  return {
    Node: NodeResult,
    Section: SectionResult,
    Material: {
      "1": {
        name: "concrete",
        strength: 35,
        elastic_modulus: 20e6,
        nu: 0.17,
        density: 2.3
      },
      "2": {
        name: "steel",
        strength: 400,
        elastic_modulus: 210e6,
        nu: 0.3,
        density: 7.85
      },
      "3": {
        name: "RC",
        strength: 400,
        elastic_modulus: 210e6,
        nu: 0.3,
        density: 2.45
      }
    },
    Part: PartResult,
    LiveLoad: LiveLoad
  };
}

function ramenSorting(ramenArr) {
  var tmpArr = [...ramenArr];

  tmpArr.sort((a, b) => {
    return a.nodes[0][0] - b.nodes[0][0];
  });

  tmpArr.sort((a, b) => {
    return a.floor - b.floor;
  });

  console.log(tmpArr);

  return tmpArr;
}

function SlabSorting(slabArr) {
  var tmpArr = [...slabArr];

  tmpArr.sort((a, b) => {
    return a.floor - b.floor;
  });

  console.log(tmpArr);

  return tmpArr;
}
