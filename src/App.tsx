import React from 'react'

import ResizableContainer from "./components/ResizableContainer"
import TextEditorArea from './components/TextEditorArea'
import LeftPanel from './components/LeftPanel'
import DisplayArea from './components/DisplayArea'

import { Graph, GraphState, Vertex, Edge } from "./lib/graph"

interface State {
    graphState: GraphState
}

export default class App extends React.Component<{}, State> {
    constructor (props: {}) {
        super(props)
        this.state = {
            graphState: {
                graph: {
                    vertices: [],
                    edges: []
                },
                setGraph: this._setGraph,
                addVertex: this._addVertex,
                updateVertex: this._updateVertex,
                addEdge: this._addEdge,
                updateEdge: this._updateEdge,
            }
        }
    }

    private _setGraph = (graph: Graph) => {
        let { graphState } = this.state
        this.setState({ graphState: { ...graphState, graph } })
    }

    private _addVertex = (vertex: Vertex) => {
        let { graphState } = this.state
        let { graph } = graphState
        vertex.key = graph.vertices.length
        graph.vertices.push(vertex)
        this.setState({ graphState: { ...graphState, graph: graph } })
    }

    private _addEdge = (edge: Edge) => {
        let { graphState } = this.state
        let { graph } = graphState
        edge.key = graph.edges.length
        graph.edges.push(edge)
        this.setState({ graphState: { ...graphState, graph: graph } })
    }

    private _updateVertex = (vertex: Vertex) => {
        let { graphState } = this.state
        graphState.graph.vertices[vertex.key] = vertex
        this.setState({ graphState })
    }

    private _updateEdge = (edge: Edge) => {
        let { graphState } = this.state
        graphState.graph.edges[edge.key] = edge
        this.setState({ graphState })
    }

    render () {
        let { graphState } = this.state

        return (
        <div className="app-container flex">
            <div className="w-14">
                <LeftPanel />
            </div>
            <div className="flex-grow">
                <DisplayArea graphState={graphState}/>
            </div>
            <ResizableContainer className="border-l w-2/5">
                <TextEditorArea graphState={graphState}/>
            </ResizableContainer>
        </div>
        )
    }
}
