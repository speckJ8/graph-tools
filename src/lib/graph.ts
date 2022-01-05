export enum EdgeStyle {
    Dotted,
    Dashed,
    Solid,
}

export enum EdgeDirection {
    AToB,
    BToA,
    Undirected
}

export interface Graph {
    name?: string
    vertices: Vertex[]
    edges: Edge[]
}

export interface Vertex {
    key: number
    incidentEdges: Edge[]
    name?: string
    highlighted?: boolean
    colorHex?: string
    position: { x: number, y: number }

    // for use in internal algorithms
    _marked?: boolean
}

export interface Edge {
    key: number
    vertexA: Vertex
    vertexB: Vertex
    direction?: EdgeDirection
    name?: string
    highlighted?: boolean
    colorHex?: string
    thickness?: string
    style?: EdgeStyle
    svg?: SVGElement

    // for use in internal algorithms
    _marked?: boolean
}

export interface GraphState {
    graph: Graph
    setGraph: (graph: Graph) => void
    addVertex: (vertex: Vertex) => void
    updateVertex: (vertex: Vertex) => void
    addEdge: (edge: Edge) => void
    updateEdge: (edge: Edge) => void
}

/**
 * Return the vertex adjacent to `vertex` through the `edge`
 * */
export function neighbor(vertex: Vertex, edge: Edge): Vertex {
    if (vertex.key === edge.vertexA.key) {
        return edge.vertexB
    } else {
        return edge.vertexA
    }
}
