import React from "react"

import DisplayAreaHeader from "./DisplayAreaHeader"

import { Vertex, Edge, EdgeStyle } from "../lib/graph"
import GraphContext from "../lib/graph-context"

export default class DisplayArea extends React.Component {
    static contextType = GraphContext

    private _DEFAULT_VERTEX_COLOR = "#444444"
    private _DEFAULT_EDGE_COLOR = "#666666"
    private _DEFAULT_EDGE_THICKNESS = 1

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

    private _drawVertex = (vertex: Vertex) => {
        let fillColor = vertex.colorHex || this._DEFAULT_VERTEX_COLOR
        let className = "vertex"

        if (vertex.highlighted) {
            return (
                <g key={vertex.key}
                   onClick={e => this._onVertexClick(vertex, e)}>
                    <circle cx={vertex.position.x} cy={vertex.position.y}
                            r={12} fill={fillColor + "50"}/>
                    <circle className={className}
                            cx={vertex.position.x} cy={vertex.position.y}
                            r={6} fill={fillColor}/>
                </g>
            )
        } else {
            return (
                <circle className={className} key={vertex.key}
                        cx={vertex.position.x} cy={vertex.position.y}
                        r={6} fill={fillColor}
                        onClick={e => this._onVertexClick(vertex, e)}/>
            )
        }
    }


    _drawEdge = (edge: Edge) => {
        let xa = edge.vertexA.position.x
        let ya = edge.vertexA.position.y
        let xb = edge.vertexB.position.x
        let yb = edge.vertexB.position.y

        let className = "edge"
        let stroke = edge.colorHex || this._DEFAULT_EDGE_COLOR
        let strokeWidth = edge.thickness || this._DEFAULT_EDGE_THICKNESS
        let strokeDashArray = ""
        if (edge.style === EdgeStyle.Dotted) {
            strokeDashArray = "1 3"
        } else if (edge.style === EdgeStyle.Dashed) {
            strokeDashArray = "4 4"
        }

        if (edge.highlighted) {
            return (
                <line className={className} key={edge.key}
                      x1={xa} y1={ya} x2={xb} y2={yb}
                      stroke={stroke} strokeWidth={strokeWidth}
                      strokeDasharray={strokeDashArray}/>
            )
        } else {
            return (
                <line className={className} key={edge.key}
                      x1={xa} y1={ya} x2={xb} y2={yb}
                      stroke={stroke} strokeWidth={strokeWidth}
                      strokeDasharray={strokeDashArray}/>
            )
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
                        {graph.edges.map((e: Edge) => this._drawEdge(e) )}
                        {graph.vertices.map((v: Vertex) => this._drawVertex(v))}
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
