import { GraphContextType } from "./graph-context"
import { Vertex } from "./user-graph"

export function executeScript (script: string,
                               ctx: GraphContextType): string|undefined {

    let vertices = ctx.graph.vertices.map(v => new Vertex(v, ctx.updateVertex))
    let _script = `
        let vertices = arguments[0]
        ${script}
    `
    let fun = new Function(_script)
    try {
        fun(vertices)
    } catch (exception) {
        return exception.toStsring()
    }
}
