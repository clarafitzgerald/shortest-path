const data = [
  { name: "a", neighbours: [{ name: "c", value: 2 }] },
  {
    name: "b",
    neighbours: [
      { name: "d", value: 4 },
      { name: "e", value: 7 }
    ]
  },
  {
    name: "c",
    neighbours: [
      { name: "a", value: 2 },
      { name: "d", value: 1 },
      { name: "f", value: 4 }
    ]
  },
  {
    name: "d",
    neighbours: [
      { name: "b", value: 4 },
      { name: "c", value: 1 },
      { name: "f", value: 1 },
      { name: "g", value: 2 }
    ]
  },
  {
    name: "e",
    neighbours: [
      { name: "b", value: 7 },
      { name: "h", value: 10 }
    ]
  },
  {
    name: "f",
    neighbours: [
      { name: "c", value: 4 },
      { name: "d", value: 1 },
      { name: "g", value: 3 }
    ]
  },
  {
    name: "g",
    neighbours: [
      { name: "d", value: 2 },
      { name: "f", value: 3 },
      { name: "h", value: 4 }
    ]
  },
  {
    name: "h",
    neighbours: [
      { name: "e", value: 10 },
      { name: "g", value: 4 }
    ]
  }
];

export default data;
