"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
class Node {
    constructor(name) {
        this.name = name;
        this.children = [];
    }
    addChild(node) {
        node.parentNode = this;
        this.children.push(node);
    }
    getChild(name) {
        return this.children.find(n => n.name === name);
    }
    getName() {
        return this.name;
    }
    getParent() {
        return this.parentNode;
    }
    findChild(name, node = this) {
        if (node.name === name) {
            return node;
        }
        else {
            for (let i = 0; i < node.children.length; i++) {
                const result = this.findChild(name, node.children[i]);
                if (result != null) {
                    return result;
                }
            }
            return null;
        }
    }
    getAllChildren() {
        return this.children;
    }
    hasChildren() {
        return this.children.length > 0;
    }
    countEdges() {
        let parent = this.parentNode;
        let count = 0;
        while (parent != null) {
            count++;
            parent = parent.parentNode;
        }
        return count;
    }
    countEdgesUntil(stopNode) {
        let parent = this.parentNode;
        let count = 0;
        while (parent != null && parent.getName() != stopNode.getName()) {
            console.log(parent.getName());
            count++;
            parent = parent.parentNode;
        }
        return count + 1; // It ends one early so add an additional one here.
    }
}
exports.Node = Node;
function countOrbits(input) {
    let count = 0;
    const nodes = findChildlessNode(input);
    const countedNodes = [];
    nodes.forEach(n => {
        count += n.countEdges();
        countedNodes.push(n);
        let parent;
        while ((parent = n.getParent())) {
            if (!countedNodes.includes(parent)) {
                count += parent.countEdges();
                countedNodes.push(parent);
            }
            n = parent;
        }
    });
    return count;
}
exports.countOrbits = countOrbits;
function findChildlessNode(node) {
    let childless = [];
    if (!node.hasChildren()) {
        childless.push(node);
    }
    else {
        const children = node.getAllChildren();
        children.forEach(n => (childless = childless.concat(findChildlessNode(n))));
    }
    return childless;
}
exports.findChildlessNode = findChildlessNode;
/**
 * Finds the path between two nodes.
 * @param nodeOne
 * @param nodeTwo
 */
function countPathBetween(nodeOne, nodeTwo) {
    const commonNode = findCommonAncestor(nodeOne, nodeTwo);
    if (commonNode) {
        const countUntilOne = nodeOne.countEdgesUntil(commonNode);
        const countUntilTwo = nodeTwo.countEdgesUntil(commonNode);
        return countUntilOne + countUntilTwo;
    }
}
exports.countPathBetween = countPathBetween;
function findCommonAncestor(nodeOne, nodeTwo) {
    let parentOne = nodeOne.getParent();
    let parentTwo = nodeTwo.getParent();
    console.log(`Looking at ${nodeOne.getName()} and ${nodeTwo.getName()}`);
    while (parentOne != null) {
        while (parentTwo != null) {
            console.log(`Looking at ${parentOne.getName()} and ${parentTwo.getName()}`);
            if (parentOne.getName() === parentTwo.getName()) {
                return parentOne;
            }
            else {
                parentTwo = parentTwo.getParent();
            }
        }
        parentTwo = nodeTwo.getParent();
        parentOne = parentOne.getParent();
    }
    return null; // No common thing found
}
exports.findCommonAncestor = findCommonAncestor;
function getOrbitCount(input) {
    const comNode = buildTree(input);
    if (comNode) {
        return countOrbits(comNode);
    }
    else {
        return 0;
    }
}
exports.getOrbitCount = getOrbitCount;
function buildTree(input) {
    const nodes = [];
    input.forEach(orbitEntry => {
        const splitEntry = orbitEntry.split(")");
        console.log(splitEntry);
        let curNode;
        const nodeIndex = nodes.findIndex(n => n.getName() === splitEntry[0]);
        if (nodeIndex > -1) {
            curNode = nodes[nodeIndex];
        }
        else {
            // See if it's a child of any of the ones in our little array
            for (let i = 0; i < nodes.length; i++) {
                const found = nodes[i].findChild(splitEntry[0]);
                if (found) {
                    curNode = found;
                }
            }
            if (!curNode) {
                // We didn't find it anywhere, so make it.
                curNode = new Node(splitEntry[0]);
                nodes.push(curNode);
            }
        }
        let childNode;
        // See if the child node is in our node array
        const childNodeIndex = nodes.findIndex(n => n.getName() === splitEntry[1]);
        if (childNodeIndex > -1) {
            // We found it in our list... add it to the curNode
            childNode = nodes[childNodeIndex];
        }
        else {
            // See if it's a child of any of the ones in our little array
            for (let i = 0; i < nodes.length; i++) {
                const found = nodes[i].findChild(splitEntry[1]);
                if (found) {
                    childNode = found;
                }
            }
            if (!childNode) {
                // We didn't find it anywhere, so make it.
                childNode = new Node(splitEntry[1]);
            }
        }
        curNode.addChild(childNode);
    });
    // console.log(util.inspect(comNode, { showHidden: false, depth: null }));
    const comNode = nodes.find(n => n.getName() === "COM");
    if (comNode) {
        return comNode;
    }
    else {
        return null;
    }
}
exports.buildTree = buildTree;
