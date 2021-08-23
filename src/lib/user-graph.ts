import { Vertex as InternalVertex } from "./graph"

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
