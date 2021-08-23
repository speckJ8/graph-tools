import React from "react"

import { ReactComponent as ZoomIn } from "../icons/zoom-in.svg"
import { ReactComponent as ZoomOut } from "../icons/zoom-out.svg"
import { ReactComponent as XCircle } from "../icons/x-circle.svg"

import { Vertex } from "../lib/graph"
import { drawVertex } from "../lib/draw"
import GraphContext from "../lib/graph-context"

export default class DisplayArea extends React.Component {
    static contextType = GraphContext
    private _clicked = false
    private _svgContainer?: SVGElement

    private _canvasClick = (event: React.MouseEvent) => {
        if (!this._svgContainer)
            return

        if (!this._clicked) {
            this._clicked = true
            setTimeout(() => this._clicked = false, 500)
        } else {
            this._clicked = false
            let { addVertex } = this.context
            let svgRect = this._svgContainer.getBoundingClientRect()
            let x = event.clientX - svgRect.x
            let y = event.clientY - svgRect.y
            console.log("x = ", x, "y = ", y)
            addVertex({ position: { x, y } })
        }
    }

    private _canvasMouseOver = (event: React.MouseEvent) => {
    }

    render () {
        return (
        <GraphContext.Consumer>
        {({ graph }) =>
            <div className="relative w-full h-full flex flex-col">
                <div className="h-12 px-6 py-2 border-b bg-white flex justify-between items-center">
                    <div className="flex items-center">
                        <button className="button mr-2" title="File">
                            File
                        </button>
                        <button className="button" title="File">
                            Parameters
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button className="button" title="Clear">
                            <XCircle className="h-4"/>
                        </button>
                        <div className="mx-1 text-gray-200">|</div>
                        <button className="button" title="Zoom in">
                            <ZoomIn className="h-4"/>
                        </button>
                        <div className="mx-1 text-gray-200">|</div>
                        <button className="button" title="Zoom out">
                            <ZoomOut className="h-4"/>
                        </button>
                    </div>
                </div>
                <div className="flex-grow">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                         ref={r => this._svgContainer = r || undefined}
                         onClick={this._canvasClick}
                         onMouseOver={this._canvasMouseOver}>
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
                        {graph.vertices.map((v: Vertex, idx: number) =>
                            drawVertex(v, idx)
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
