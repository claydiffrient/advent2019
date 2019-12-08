"use strict";

import {
  getOrbitCount,
  Node,
  findChildlessNode,
  findCommonAncestor,
  buildTree,
  countPathBetween
} from "../index";

describe("getOrbitCount", () => {
  it("returns proper for the intial example", () => {
    const input = [
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L"
    ];

    expect(getOrbitCount(input)).toBe(42);
  });
});

describe("findCommonAncestor", () => {
  it("finds the common ancestor of two nodes", () => {
    const input = [
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L"
    ];
    const comNode = buildTree(input);
    if (!comNode) {
      throw new Error("need a com node");
    }
    const hNode = comNode.findChild("H");
    const lNode = comNode.findChild("L");
    const bNode = comNode.findChild("B");
    if (hNode && lNode && bNode) {
      expect(findCommonAncestor(hNode, lNode)).toStrictEqual(bNode);
    }
  });
});

describe("Node", () => {
  describe("constructor", () => {
    it("creates a Node with a string name and empty child array", () => {
      const testNode = new Node("my name");
      expect(testNode.getName()).toBe("my name");
      expect(testNode.getAllChildren()).toStrictEqual([]);
    });
  });

  describe("addChild", () => {
    it("adds a child node", () => {
      const testNode = new Node("a");
      const testNodeTwo = new Node("b");
      testNode.addChild(testNodeTwo);
      expect(testNode.getAllChildren()).toStrictEqual([testNodeTwo]);
    });
  });

  describe("findChildlessNodes", () => {
    it("finds all childless nodes", () => {
      const testNode = new Node("a");
      const testNodeTwo = new Node("b");
      testNode.addChild(testNodeTwo);
      expect(findChildlessNode(testNode)).toStrictEqual([testNodeTwo]);
    });
  });

  describe("countEdges", () => {
    let rootNode: Node;
    let directChild: Node;
    let indirectChild: Node;
    beforeEach(() => {
      rootNode = new Node("COM");
      directChild = new Node("D");
      indirectChild = new Node("I");

      directChild.addChild(indirectChild);
      rootNode.addChild(directChild);
    });

    it("counts all the edges", () => {
      expect(indirectChild.countEdges()).toBe(2);
      expect(directChild.countEdges()).toBe(1);
    });
  });

  describe("countEdgesUntil", () => {
    it("finds the distance between two points", () => {
      const input = [
        "COM)B",
        "B)C",
        "C)D",
        "D)E",
        "E)F",
        "B)G",
        "G)H",
        "D)I",
        "E)J",
        "J)K",
        "K)L"
      ];
      const comNode = buildTree(input);
      if (!comNode) {
        throw new Error("need a com node");
      }
      const hNode = comNode.findChild("H");
      const lNode = comNode.findChild("L");
      if (hNode && lNode) {
        const common = findCommonAncestor(hNode, lNode);
        if (common) {
          expect(hNode.countEdgesUntil(common)).toBe(2);
        }
      }
    });
  });

  describe("countPathBetween", () => {
    const input = [
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L",
      "K)YOU",
      "I)SAN"
    ];
    const comNode = buildTree(input);
    if (!comNode) {
      throw new Error("need a com node");
    }
    const sanNode = comNode.findChild("SAN");
    const youNode = comNode.findChild("YOU");
    if (sanNode && youNode) {
      const sanNodeParent = sanNode.getParent();
      const youNodeParent = youNode.getParent();
      if (sanNodeParent && youNodeParent) {
        expect(countPathBetween(sanNodeParent, youNodeParent)).toBe(4);
      }
    }
  });

  describe("findChild", () => {
    let rootNode: Node;
    let directChild: Node;
    let indirectChild: Node;
    beforeEach(() => {
      rootNode = new Node("COM");
      directChild = new Node("D");
      indirectChild = new Node("I");

      directChild.addChild(indirectChild);
      rootNode.addChild(directChild);
    });
    it("finds a top level child and returns it", () => {
      expect(rootNode.findChild("D")).toStrictEqual(directChild);
    });

    it("finds an indirect child and returns it", () => {
      expect(rootNode.findChild("I")).toStrictEqual(indirectChild);
    });

    it("finds an indirect node next to a node with no children", () => {
      let noChildNode = new Node("NK");
      let nodeToFind = new Node("F");
      let otherNode = new Node("T");
      otherNode.addChild(nodeToFind);
      indirectChild.addChild(noChildNode);
      indirectChild.addChild(otherNode);
      rootNode.findChild("F");
    });
  });
});
