import React from "react"
import { Edge, EdgeStyle, Vertex } from "./graph"

export const DEFAULT_VERTEX_COLOR = "#6366F1"
export const DEFAULT_EDGE_COLOR = "#666666"
export const DEFAULT_EDGE_THICKNESS = 1

/**
 * Generate an SVG representation for the vertex
 * */
export function drawVertex (vertex: Vertex,
                            onClick?: (v: Vertex, e: React.MouseEvent) => void) {
    let fillColor = vertex.colorHex || DEFAULT_VERTEX_COLOR
    let className = "vertex"
    let _onClick = onClick ?
        (e: React.MouseEvent) => onClick(vertex, e) :
        undefined
    if (vertex.highlighted) {
        return (
            <g key={vertex.key} onClick={_onClick}>
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
                    onClick={_onClick}/>
        )
    }
}


/**
 * Generate an SVG representation for the edge and save it in the attribute
 * `svgRepresentation` of the edge
 * */
export function drawEdge (edge: Edge) {
    let xa = edge.vertexA.position.x
    let ya = edge.vertexA.position.y
    let xb = edge.vertexB.position.x
    let yb = edge.vertexB.position.y

    let className = "edge"
    let stroke = edge.colorHex || DEFAULT_EDGE_COLOR
    let strokeWidth = edge.thickness || DEFAULT_EDGE_THICKNESS
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
