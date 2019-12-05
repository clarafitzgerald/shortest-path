import data from "./data.js";

let startPoint;
let endPoint;

let labelledGraph = [
  { name: "a", value: Infinity, path: [], visited: false },
  { name: "b", value: Infinity, path: [], visited: false },
  { name: "c", value: Infinity, path: [], visited: false },
  { name: "d", value: Infinity, path: [], visited: false },
  { name: "e", value: Infinity, path: [], visited: false },
  { name: "f", value: Infinity, path: [], visited: false },
  { name: "g", value: Infinity, path: [], visited: false },
  { name: "h", value: Infinity, path: [], visited: false }
];

const getIndexByPointName = (pointName, dataSet) => {
  let index = dataSet.findIndex(node => node.name == pointName);
  return index;
};

const initializeGraph = startPoint => {
  let index = getIndexByPointName(startPoint, labelledGraph);
  labelledGraph.splice(index, 1, {
    name: startPoint,
    value: 0,
    path: [startPoint],
    visited: false
  });
};

const visitNode = node => {
  let unvisitedNodes = labelledGraph.filter(
    x =>
      labelledGraph[getIndexByPointName(x.name, labelledGraph)].visited ===
      false
  );
  if (unvisitedNodes.length > 1) {
    let index = getIndexByPointName(node, data);
    let nodeDistance = labelledGraph[index].value;
    let nodePath = labelledGraph[index].path;

    data[index].neighbours.forEach(adjacentNode => {
      let adjacentNodeIndex = getIndexByPointName(
        adjacentNode.name,
        labelledGraph
      );
      let adjacentNodeName = labelledGraph[adjacentNodeIndex].name;
      let adjacentNodeDistance = labelledGraph[adjacentNodeIndex].value;
      let edgeWeight = adjacentNode.value;

      if (adjacentNodeDistance > nodeDistance + edgeWeight) {
        labelledGraph.splice(adjacentNodeIndex, 1, {
          name: adjacentNodeName,
          value: nodeDistance + edgeWeight,
          path: nodePath.concat(adjacentNodeName),
          visited: false
        });
      }
    });
    labelledGraph[index].visited = true;
    let orderedUnvisitedNodes = labelledGraph
      .filter(
        x =>
          labelledGraph[getIndexByPointName(x.name, labelledGraph)].visited ===
          false
      )
      .sort((x1, x2) => (x1.value > x2.value ? 1 : -1));
    let nextToVisit =
      orderedUnvisitedNodes.length > 0
        ? orderedUnvisitedNodes[0].name
        : console.log("no nodes left");
    visitNode(nextToVisit);
  } else {
    return labelledGraph;
  }
};

const fullProcess = (startPoint, endPoint) => {
  initializeGraph(startPoint);
  visitNode(startPoint);
  let response = `Shortest path is of length ${
    labelledGraph[getIndexByPointName(endPoint, labelledGraph)].value
  } and follows the route: ${
    labelledGraph[getIndexByPointName(endPoint, labelledGraph)].path
  } `;
  return response;
};

const submit = () => {
  startPoint = document.getElementById("start").value;
  endPoint = document.getElementById("end").value;

  document.getElementById("output").innerHTML = fullProcess(
    startPoint,
    endPoint
  );
  return startPoint, endPoint;
};
document.getElementById("submit").addEventListener("click", submit);
