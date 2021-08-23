import React from "react"
import { Graph, Vertex, Edge } from "./graph"

interface ContextType {
    graph: Graph
    addVertex: (vertex: Vertex) => void
    addEdge: (edge: Edge) => void
}

let Context = React.createContext<ContextType>({
    graph: {
        vertices: [], edges: []
    },
    addVertex: (_) => {},
    addEdge: (_) => {},
})
export default Context
