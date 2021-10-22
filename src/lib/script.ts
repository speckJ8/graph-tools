import { Vertex } from "./user-graph"
import { GraphState } from "./graph"

export function execute (script: string, state: GraphState): string|undefined {
    let vertices = state.graph.vertices.map(v => new Vertex(v, state.updateVertex))
    let _script = `
        let vertices = arguments[0]
        ${script}
    `
    let fun = new Function(_script)
    try {
        fun(vertices)
    } catch (exception) {
        return exception.message
    }
}
