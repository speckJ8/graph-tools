import React from "react"
import { Edge, EdgeStyle, Vertex, VertexShape } from "./graph"

export const DEFAULT_VERTEX_COLOR = "#444444"
export const DEFAULT_EDGE_COLOR = "#333333"
export const DEFAULT_EDGE_THICKNESS = .5

/**
 * Generate an SVG representation for the vertex
 * */
export function drawVertex (vertex: Vertex, key: number,
                            onMouseOver?: (e: React.MouseEvent) => void,
                            onClick?: (e: React.MouseEvent) => void) {
    let fillColor = vertex.colorHex || DEFAULT_VERTEX_COLOR
    let className = "vertex"
    if (vertex.shape === VertexShape.Square) {
        if (vertex.highlighted) {
            return (
                <g key={key}>
                    <rect className={className} key={key}
                          x={vertex.position.x} y={vertex.position.y}
                          width={12} height={12} fill={fillColor + "50"}
                          onMouseOver={onMouseOver} onClick={onClick}/>
                    <rect className={className} key={key}
                          x={vertex.position.x} y={vertex.position.y}
                          width={6} height={6} fill={fillColor}/>
                </g>
            )
        } else {
            return (
                <rect className={className} key={key}
                      x={vertex.position.x} y={vertex.position.y}
                      width={6} height={6} fill={fillColor}
                      onMouseOver={onMouseOver} onClick={onClick}/>
            )
        }
    } else {
        if (vertex.highlighted) {
            return (
                <g key={key}>
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
                <circle className={className} key={key}
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
