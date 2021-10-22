import { Graph } from "./user-graph"
import { GraphState } from "./graph"

export function execute (script: string, state: GraphState): string|undefined {
    let graph = new Graph(state)
    let _script = `
        let graph = arguments[0]
        ${script}
    `
    let fun = new Function(_script)
    try {
        fun(graph)
    } catch (exception) {
        return exception.message
    }
}
