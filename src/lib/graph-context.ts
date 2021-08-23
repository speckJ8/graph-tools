import React from "react"
import { Graph, Vertex, Edge } from "./graph"

export interface GraphContextType {
    graph: Graph
    addVertex: (vertex: Vertex) => void
    updateVertex: (vertex: Vertex) => void
    addEdge: (edge: Edge) => void
}

let GraphContext = React.createContext<GraphContextType>({
    graph: {
        vertices: [], edges: []
    },
    addVertex: (_) => {},
    addEdge: (_) => {},
    updateVertex: (_) => {}
})
export default GraphContext
