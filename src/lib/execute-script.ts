import { Graph } from "./graph"
import { GraphContextType } from "./graph-context"

export function executeScript (script: string, ctx: GraphContextType): string {
    let _script = `
    function __execute__82391_function__ (graph, updateVertex) {
        ${script}
    }`
    let fun = new Function(_script)
    try {
        let s = fun(ctx.graph, ctx.updateVertex)
        console.log(fun, s)
    } catch (exception) {
        return exception.toStsring()
    }
}
