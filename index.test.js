export const initializeData = startPoint => {
  let index = labelledGraph.findIndex(node => node.name === startPoint);
  labelledGraph.splice(index, 1, { name: startPoint, value: 0 });
  return labelledGraph;
};

import "./index.js";
import data from "./data.js";

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

test("data starts with 8 values of infinity, ends with 7 infinities and a 0 value on start point", () => {
  expect(labelledGraph.filter(item => item.value === Infinity).length).toBe(8);
  initializeData("b");
  expect(labelledGraph.filter(item => item === Infinity).length).toBe(7);
  expect(labelledGraph.findIndex(item => item.value === 0)).toBe(1);
});
