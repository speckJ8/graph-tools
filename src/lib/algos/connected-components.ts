import { GraphState, Vertex, neighbor } from "../graph"

let colors = [
    "#B81324", "#00FF00", "#800080", "#78AB46", "#7093DB", "#6F4242"
]

export function connectedComponents(graphState: GraphState) {
    let stack = [ ...graphState.graph.vertices ]
    stack.forEach(v => v._marked = false)
    let color = 0
    while (true) {
        let vertex = stack.pop()
        while (vertex !== undefined && vertex._marked) {
            vertex = stack.pop()
        }
        if (vertex === undefined) {
            break
        }
        let c = colors[color++ % colors.length]
        _constructComponent(vertex, graphState, c)
    }
}

function _constructComponent(vertex: Vertex, graphState: GraphState, color: string) {
    vertex._marked = true
    vertex.colorHex = color
    graphState.updateVertex(vertex)
    for (let e of vertex.incidentEdges) {
        let u = neighbor(vertex, e)
        if (!u._marked) {
            _constructComponent(u, graphState, color)
        }
    }
}
