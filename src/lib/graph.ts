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
    name?: string
    highlighted?: boolean
    colorHex?: string
    position: { x: number, y: number }
    svgRepresentation?: SVGElement
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
    svgRepresentation?: SVGElement
}

