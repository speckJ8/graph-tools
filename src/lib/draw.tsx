import React from "react"
import { Edge, EdgeStyle, Vertex, VertexShape } from "./graph"

export const DEFAULT_VERTEX_COLOR = "#444444"
export const DEFAULT_EDGE_COLOR = "#333333"
export const DEFAULT_EDGE_THICKNESS = .5

/**
 * Generate an SVG representation for the vertex
 * */
export function drawVertex (vertex: Vertex,
                            onMouseOver?: (e: React.MouseEvent) => void,
                            onClick?: (e: React.MouseEvent) => void) {
    let fillColor = vertex.colorHex || DEFAULT_VERTEX_COLOR
    let className = "vertex"
    if (vertex.shape === VertexShape.Square) {
        return (
            <rect className={className}
                  x={vertex.position.x} y={vertex.position.y}
                  width={6} height={6} fill={fillColor}
                  onMouseOver={onMouseOver} onClick={onClick}/>
        )
    } else {
        if (vertex.highlighted) {
            return (
                <g>
                    <circle cx={vertex.position.x} cy={vertex.position.y}
                            r={12} fill={fillColor + "50"}
                            onMouseOver={onMouseOver} onClick={onClick}/>
                    <circle className={className}
                            cx={vertex.position.x} cy={vertex.position.y}
                            r={6} fill={fillColor}/>
                </g>
            )
        } else {
            return (
                <circle className={className}
                        cx={vertex.position.x} cy={vertex.position.y}
                        r={6} fill={fillColor}
                        onMouseOver={onMouseOver} onClick={onClick}/>
            )
        }
    }
}


/**
 * Generate an SVG representation for the edge and save it in the attribute
 * `svgRepresentation` of the edge
 * */
export function drawEdge (edge: Edge) {
}
