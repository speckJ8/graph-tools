import { Graph } from "./graph"

export interface RandomGraphOptions {
    numVertices?: number
    regular?: boolean
    bipartite?: boolean
    multigraph?: boolean
}

export function generateRandomGraph (options?: RandomGraphOptions): Graph {
    let graph: Graph = { vertices: [], edges: [], }
    let _options = options || {}
    let numVertices = _options.numVertices || Math.floor(Math.random() * 10)
    for (let v = 0; v <= numVertices; v++) {
        let x = Math.floor(100 + Math.random()*600)
        let y = Math.floor(100 + Math.random()*550)
        graph.vertices.push({
            key: v,
            position: { x, y },
            neighbours: [],
        })
    }

    let edgeKey = 0
    for (let v = 0; v <= numVertices; v++) {
        let vertexA = graph.vertices[v]
        let neighbours = Math.floor(Math.random()*(2**numVertices))
        for (let u = 0; u <= numVertices; u++) {
            let vertexB = graph.vertices[u]
            if (!_options.multigraph &&
                // we don't want a multigraph so loops are not included and multiple
                // edges between the same pair of vertices is also not included
                (u === v || vertexA.neighbours.find(v => v.key === vertexB.key))) {
                continue;
            } else if (neighbours & (1 << u)) {
                let edge = {
                    key: edgeKey++,
                    vertexA,
                    vertexB,
                }
                graph.edges.push(edge)
                vertexA.neighbours.push(edge)
                vertexB.neighbours.push(edge)
            }
        }
    }

    return graph
}
