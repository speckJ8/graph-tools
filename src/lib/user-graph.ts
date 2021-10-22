import {
    Graph as InternalGraph,
    Edge as InternalEdge,
    Vertex as InternalVertex,
    GraphState as InternalGraphState ,
} from "./graph"

/**
 * Definitions of the graph objects that visible to the user when scripting.
 * */

export class Graph {
    private graph: InternalGraph

    public vertices: Vertex[]
    public edges: Edge[]

    constructor (state: InternalGraphState) {
        this.graph = state.graph
        this.vertices = state.graph.vertices.map(v => new Vertex(v, state.updateVertex))
        this.edges = state.graph.edges.map(v => new Edge(v, state.updateEdge))
    }
}

export class Vertex {
    private vertex: InternalVertex
    private triggerUpdate: (vertex: InternalVertex) => void

    constructor (vertex: InternalVertex,
                triggerUpdate: (v: InternalVertex) => void) {
        this.vertex = vertex
        this.triggerUpdate = triggerUpdate
    }

    public set colorHex (value: string) {
        this.vertex.colorHex = value
        this.triggerUpdate(this.vertex)
    }

    public set highlighted (value: boolean) {
        this.vertex.highlighted = value
        this.triggerUpdate(this.vertex)
    }
}

export class Edge {
    private edge: InternalEdge
    private triggerUpdate: (edge: InternalEdge) => void

    constructor (edge: InternalEdge,
                triggerUpdate: (v: InternalEdge) => void) {
        this.edge = edge
        this.triggerUpdate = triggerUpdate
    }

    public set colorHex (value: string) {
        this.edge.colorHex = value
        this.triggerUpdate(this.edge)
    }

    public set highlighted (value: boolean) {
        this.edge.highlighted = value
        this.triggerUpdate(this.edge)
    }
}
