import React from 'react'

import ResizableContainer from "./components/ResizableContainer"

import TextEditorArea from './components/TextEditorArea'
import LeftPanel from './components/LeftPanel'
import DisplayArea from './components/DisplayArea'

import { Graph, Vertex, Edge } from "./lib/graph"
import GraphContext from "./lib/graph-context"

interface State {
    graph: Graph
}

export default class App extends React.Component<{}, State> {
    constructor (props: {}) {
        super(props)
        this.state = {
            graph: {
                vertices: [
                    {
                        name: "The important vertex",
                        position: { x: 100, y: 100 },
                        highlighted: true,
                        svgRepresentation: undefined,
                        colorHex: "#065F46"
                    },
                    {
                        position: { x: 150, y: 100 },
                        highlighted: false,
                        svgRepresentation: undefined,
                    },
                ],
                edges: [
                ]
            }
        }
    }

    private _addVertex = (vertex: Vertex) => {
        this.state.graph.vertices.push(vertex)
        this.setState({ graph: this.state.graph })
    }

    private _addEdge = (vertex: Edge) => {
    }

    render () {
        let context = {
            graph: this.state.graph,
            addVertex: this._addVertex,
            addEdge: this._addEdge,
        }

        return (
        <GraphContext.Provider value={context}>
            <div className="app-container flex">
                <div className="w-14">
                    <LeftPanel />
                </div>
                <div className="flex-grow">
                    <DisplayArea />
                </div>
                <ResizableContainer className="border-l w-2/5">
                    <TextEditorArea/>
                </ResizableContainer>
            </div>
        </GraphContext.Provider>
        )
    }
}
