import React from "react"

import DisplayAreaHeader from "./DisplayAreaHeader"

import { Vertex, Edge } from "../lib/graph"
import { drawVertex, drawEdge } from "../lib/draw"
import GraphContext from "../lib/graph-context"

export default class DisplayArea extends React.Component {
    static contextType = GraphContext

    private _svgContainer?: SVGElement
    private _clicked = false
    private _activeVertex?: Vertex = undefined

    private _canvasClick = (event: React.MouseEvent) => {
        if (!this._svgContainer)
            return

        let { addVertex, updateVertex } = this.context
        if (!this._clicked) {
            this._clicked = true
            setTimeout(() => this._clicked = false, 500)
        } else {
            this._clicked = false
            let svgRect = this._svgContainer.getBoundingClientRect()
            let x = event.clientX - svgRect.x
            let y = event.clientY - svgRect.y
            addVertex({ position: { x, y } })
        }

        if (this._activeVertex) {
            this._activeVertex.highlighted = false
            updateVertex(this._activeVertex)
            this._activeVertex = undefined
        }
    }

    private _onVertexClick = (vertex: Vertex, event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()

        let { addEdge, updateVertex } = this.context

        if (this._activeVertex) {
            addEdge({ vertexA: this._activeVertex, vertexB: vertex })
            this._activeVertex.highlighted = false
            updateVertex(this._activeVertex)
            this._activeVertex = undefined
        } else {
            this._activeVertex = vertex
            this._activeVertex.highlighted = true
            updateVertex(this._activeVertex)
        }
    }

    render () {
        return (
        <GraphContext.Consumer>
        {({ graph }) =>
            <div className="relative w-full h-full flex flex-col">
                <DisplayAreaHeader />
                <div className="flex-grow">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                         ref={r => this._svgContainer = r || undefined}
                         onClick={this._canvasClick}>
                        <defs>
                            <pattern id="smallGrid" width="8" height="8"
                                     patternUnits="userSpaceOnUse">
                                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#ddd"
                                      strokeWidth="0.5"/>
                            </pattern>
                            <pattern id="grid" width="80" height="80"
                                     patternUnits="userSpaceOnUse">
                                <rect width="80" height="80" fill="url(#smallGrid)"/>
                                <path d="M 80 0 L 0 0 0 80" fill="none"
                                      stroke="#ccc" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        {graph.edges.map((e: Edge) => drawEdge(e) )}
                        {graph.vertices.map((v: Vertex) =>
                            drawVertex(v, this._onVertexClick)
                        )}
                    </svg>
                </div>
                <div className="absolute right-2 bottom-2 px-4 py-1 bg-white border flex items-center">
                    <small>{graph.vertices.length} vertices</small>
                    <span className="mx-2 text-gray-300">|</span>
                    <small>{graph.edges.length} edges</small>
                </div>
            </div>
        }
        </GraphContext.Consumer>
        )
    }
}
