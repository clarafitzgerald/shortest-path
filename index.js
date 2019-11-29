import data from "./data.js";

let startPoint;
let endPoint;
let visitedNodes = [];

let labelledGraph = [
  { name: "a", value: Infinity, previousVertex: "", path: " " },
  { name: "b", value: Infinity, previousVertex: "", path: " " },
  { name: "c", value: Infinity, previousVertex: "", path: " " },
  { name: "d", value: Infinity, previousVertex: "", path: " " },
  { name: "e", value: Infinity, previousVertex: "", path: " " },
  { name: "f", value: Infinity, previousVertex: "", path: " " },
  { name: "g", value: Infinity, previousVertex: "", path: " " },
  { name: "h", value: Infinity, previousVertex: "", path: " " }
];

export const initializeData = startPoint => {
  let index = labelledGraph.findIndex(node => node.name === startPoint);
  labelledGraph.splice(index, 1, { name: startPoint, value: 0 });
  return labelledGraph;
};

// getIndexByPointName = (pointName, dataSet) => {
//   let index = labelledGraph.findIndex(node => node.name == pointName);
//   return value;
// };

const checkNeighbours = point => {
  let index = data.findIndex(node => node.name === point);
  let pointValue =
    labelledGraph[labelledGraph.findIndex(node => node.name == point)].value;
  let neighbourDetails = data[index].neighbours;
  neighbourDetails.forEach(neighbour => {
    let index = labelledGraph.findIndex(node => node.name === neighbour.name);
    let neighbourValue = Math.min(
      labelledGraph[index].value,
      pointValue + neighbour.value
    );
    let previousVertex =
      labelledGraph[index].value > pointValue + neighbourValue
        ? point
        : labelledGraph[index].previousVertex;

    // let path =
    //   labelledGraph[index].value > pointValue + neighbourValue
    //     ? `${labelledGraph[index].path} ${point}`
    //     : labelledGraph[index].path;

    labelledGraph.splice(index, 1, {
      name: neighbour.name,
      value: neighbourValue,
      previousVertex: previousVertex
    });
  });
  visitedNodes.push(point);
  console.log(visitedNodes);
  return labelledGraph, visitedNodes;
};

const sortLabelledGraphByValue = () => {
  labelledGraph = labelledGraph.sort((node1, node2) =>
    node1.value > node2.value ? 1 : -1
  );
  return labelledGraph;
};

const findNextPoint = () => {
  let index = labelledGraph.findIndex(
    node => visitedNodes.includes(node.name) === false
  );
  let point = labelledGraph[index].name;
  return point;
};
const getPath = (startPoint, endPoint) => {
  let point = endPoint;
  let path = endPoint;
  let getPoint;
  let previousVertex;
  while (point !== startPoint) {
    getPoint =
      labelledGraph[labelledGraph.findIndex(node => point === node.name)];
    previousVertex = getPoint.previousVertex;
    path = `${previousVertex}, ${path}`;
    point = previousVertex;
  }
  return path;
};

const fullProcess = (startPoint, endPoint) => {
  initializeData(startPoint);
  checkNeighbours(startPoint);
  while (labelledGraph.filter(item => item.previousVertex === "").length > 0) {
    sortLabelledGraphByValue();
    findNextPoint();
    checkNeighbours(findNextPoint());
  }
  console.log(labelledGraph);
  let response = `Shortest path is of length ${
    labelledGraph[labelledGraph.findIndex(node => endPoint === node.name)].value
  } and follows the route: ${getPath(startPoint, endPoint)}`;
  return response;
};

const submit = () => {
  startPoint = document.getElementById("start").value;
  endPoint = document.getElementById("end").value;
  console.log(fullProcess(startPoint, endPoint));
  document.getElementById("output").innerHTML = fullProcess(
    startPoint,
    endPoint
  );
  return startPoint, endPoint;
};
document.getElementById("submit").addEventListener("click", submit);
