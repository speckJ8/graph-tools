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
                        key: 0,
                        position: { x: 100, y: 100 },
                    },
                    {
                        key: 1,
                        position: { x: 150, y: 100 },
                    },
                ],
                edges: []
            }
        }
    }

    private _addVertex = (vertex: Vertex) => {
        vertex.key = this.state.graph.vertices.length
        this.state.graph.vertices.push(vertex)
        this.setState({ graph: this.state.graph })
    }

    private _addEdge = (edge: Edge) => {
        edge.key = this.state.graph.edges.length
        this.state.graph.edges.push(edge)
        this.setState({ graph: this.state.graph })
    }

    private _updateVertex = (vertex: Vertex) => {
        window._viral_variable = "brooklyn"
        this.setState({ graph: { ...this.state.graph, [vertex.key]: vertex } })
    }

    render () {
        let context = {
            graph: this.state.graph,
            addVertex: this._addVertex,
            updateVertex: this._updateVertex,
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
