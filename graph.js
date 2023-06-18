class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value;
        this.adjacent = adjacent;
    }
}

class Graph {
    constructor() {
        this.nodes = new Set();
    }

    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        this.nodes.add(vertex);
    }

    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
        for (let vertex of vertexArray) {
            this.nodes.add(vertex);
        }
    }

    // this function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(vertex) {
        this.nodes.delete(vertex);

        // check each node to see if it has this vertex as an adjacency and remove
        for (let node of this.nodes) {
            if (node.adjacent.has(vertex))
                node.adjacent.delete(vertex);
        }
    }

    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
        const visited = new Set();
        const result = [];

        function traverse(node) {
            visited.add(node);
            result.push(node.value);

            for (let neighbor of node.adjacent) {
                if (!visited.has(neighbor))
                    traverse(neighbor);
            }
        }

        if (start)
            traverse(start);

        return result;
    }

    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        const queue = [];
        const result = [];
        const visited = new Set();

        if (start) {
            // add first node
            queue.push(start);
            visited.add(start);

            while (queue.length) {
                let current = queue.shift();
                result.push(current.value);

                for (let neighbor of current.adjacent) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                        // must add visited here so we don't add the same neighbors later on
                        visited.add(neighbor);
                    }
                }
            }
        }

        return result;
    }
}

module.exports = { Graph, Node }