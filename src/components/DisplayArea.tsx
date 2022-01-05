import React from "react"
import DisplayAreaHeader from "./DisplayAreaHeader"
import { GraphState, Vertex, Edge, EdgeStyle } from "../lib/graph"

interface Props {
    graphState: GraphState
}

export default class DisplayArea extends React.Component<Props> {
    private _DEFAULT_VERTEX_COLOR = "#444444"
    private _DEFAULT_EDGE_COLOR = "#666666"
    private _DEFAULT_EDGE_THICKNESS = 1

    private _svgContainer?: SVGGraphicsElement
    private _clicked = false
    private _activeVertex?: Vertex = undefined
    private _vertexBeingDragged?: Vertex = undefined

    private _canvasClick = (event: React.MouseEvent) => {
        if (!this._svgContainer)
            return

        let { addVertex, updateVertex } = this.props.graphState
        if (!this._clicked) {
            this._clicked = true
            setTimeout(() => this._clicked = false, 500)
        } else {
            this._clicked = false
            let svgRect = this._svgContainer.getBoundingClientRect()
            let x = event.clientX - svgRect.x
            let y = event.clientY - svgRect.y
            addVertex({ key: -1, position: { x, y }, incidentEdges: [] })
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

        let { addEdge, updateVertex } = this.props.graphState

        if (this._activeVertex) {
            addEdge({ key: -1, vertexA: this._activeVertex, vertexB: vertex })
            this._activeVertex.highlighted = false
            updateVertex(this._activeVertex)
            this._activeVertex = undefined
            return
        }

        if (!this._clicked) {
            this._clicked = true
            setTimeout(() => this._clicked = false, 500)
        } else {
            this._activeVertex = vertex
            this._activeVertex.highlighted = true
            updateVertex(this._activeVertex)
        }
    }

    private _dragStart = (vertex: Vertex, event: React.MouseEvent) => {
        this._vertexBeingDragged = vertex
    }

    private _doDrag = (event: React.MouseEvent) => {
        let { updateVertex } = this.props.graphState
        if (this._vertexBeingDragged && this._svgContainer) {
            event.preventDefault()
            let ctm = this._svgContainer.getScreenCTM()
            if (ctm) {
                let x = (event.clientX - ctm.e) / ctm.a
                let y = (event.clientY - ctm.f) / ctm.d
                this._vertexBeingDragged.position = { x, y }
                updateVertex(this._vertexBeingDragged)
            }
        }
    }

    private _dragEnd = (event: React.MouseEvent) => {
        this._vertexBeingDragged = undefined
    }

    private _drawVertex = (vertex: Vertex) => {
        let fillColor = vertex.colorHex || this._DEFAULT_VERTEX_COLOR

        if (vertex.highlighted) {
            return (
                <g key={vertex.key}
                   onClick={e => this._onVertexClick(vertex, e)}
                   onMouseDown={e => this._dragStart(vertex, e)}>
                    <circle cx={vertex.position.x} cy={vertex.position.y}
                            r={14} fill={fillColor + "50"}/>
                    <circle className="vertex"
                            cx={vertex.position.x} cy={vertex.position.y}
                            r={8} fill={fillColor}/>
                </g>
            )
        } else {
            return (
                <circle className="vertex" key={vertex.key}
                        cx={vertex.position.x} cy={vertex.position.y}
                        r={8} fill={fillColor}
                        onClick={e => this._onVertexClick(vertex, e)}
                        onMouseDown={e => this._dragStart(vertex, e)}/>
            )
        }
    }

    private _drawEdge = (edge: Edge) => {
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

        return (
            <line className={className} key={edge.key}
                  x1={xa} y1={ya} x2={xb} y2={yb}
                  stroke={stroke} strokeWidth={strokeWidth}
                  strokeDasharray={strokeDashArray}/>
        )
    }

    render () {
        let { graph } = this.props.graphState

        return (
        <div className="relative w-full h-full flex flex-col">
            <DisplayAreaHeader graphState={this.props.graphState}/>
            <div className="flex-grow">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                     ref={r => this._svgContainer = r || undefined}
                     onMouseMove={this._doDrag}
                     onClick={this._canvasClick}
                     onMouseUp={this._dragEnd}
                     onMouseLeave={this._dragEnd}>
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
        )
    }
}
