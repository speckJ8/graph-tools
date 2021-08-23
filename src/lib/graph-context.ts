import React from "react"
import { Graph, Vertex, Edge } from "./graph"

export interface GraphContextType {
    graph: Graph
    addVertex: (vertex: Vertex) => void
    updateVertex: (vertex: Vertex, key: number) => void
    addEdge: (edge: Edge) => void
}

let Context = React.createContext<ContextType>({
    graph: {
        vertices: [], edges: []
    },
    addVertex: (_) => {},
    addEdge: (_) => {},
    updateVertex: (_, __) => {}
})
export default Context
