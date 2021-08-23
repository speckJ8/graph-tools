export enum VertexShape {
    Square,
    Circle,
}

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
    name?: string
    highlighted?: boolean
    colorHex?: string
    shape?: VertexShape
    position: { x: number, y: number }
    svgRepresentation?: SVGElement
}

export interface Edge {
    name?: string
    highlighted?: boolean
    colorHex?: string
    thickness?: string
    style?: EdgeStyle
    vertexA: Vertex
    vertexB: Vertex
    direction: EdgeDirection
    svgRepresentation?: SVGElement
}

