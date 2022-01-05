import React from "react"
import { ReactComponent as Trash } from "../icons/trash.svg"
import * as Tools from "../lib/tools"
import { GraphState } from "../lib/graph"
import * as Algos from "../lib/algos"

interface State {
    showFile: boolean
    showTools: boolean
    showParameters: boolean
}

interface Props {
    graphState: GraphState
}

export default class DisplayAreaHeader extends React.Component<Props, State> {
    state = {
        showFile: false,
        showTools: false,
        showParameters: false,
    }

    private _generateRandomGraph = () => {
        let randomGraph = Tools.generateRandomGraph()
        let { setGraph } = this.props.graphState
        setGraph(randomGraph)
    }

    private _showFile = (event: React.MouseEvent, hover?: boolean) => {
        event.stopPropagation()
        if (hover) {
            if (this.state.showTools || this.state.showParameters) {
                this.setState({ showFile: true, showTools: false, showParameters: false, })
            }
        } else {
            this.setState({ showFile: true, showTools: false, showParameters: false, })
        }
    }

    private _showParameters = (event: React.MouseEvent, hover?: boolean) => {
        event.stopPropagation()
        if (hover) {
            if (this.state.showFile || this.state.showTools) {
                this.setState({ showFile: false, showTools: false, showParameters: true, })
            }
        } else {
            this.setState({ showFile: false, showTools: false, showParameters: true, })
        }
    }

    private _showTools = (event: React.MouseEvent, hover?: boolean) => {
        event.stopPropagation()
        if (hover) {
            if (this.state.showFile || this.state.showParameters) {
                this.setState({ showFile: false, showTools: true, showParameters: false, })
            }
        } else {
            this.setState({ showFile: false, showTools: true, showParameters: false, })
        }
    }

    private _hideAll = () => {
        this.setState({ showFile: false, showTools: false, showParameters: false, })
    }

    private _connectedComponents = () => {
        let { graphState } = this.props
        Algos.connectedComponents(graphState)
    }

    render () {
        let { showFile, showTools, showParameters } = this.state

        return (
        <div className="h-12 px-6 py-2 border-b bg-white flex justify-between items-center"
             onClick={this._hideAll}>
            <div className="flex items-center" onMouseLeave={this._hideAll}>
                <div className="relative button mr-2" onClick={this._showFile}
                     onMouseOver={_ => this._showFile(_, true)}>
                    File
                    {showFile &&
                    <div className="absolute left-0 bg-white border shadow-lg"
                         style={{ top: "105%" }}>
                        <div className="w-48 flex flex-col p-4">
                            <button className="button text-left">
                                Save...
                            </button>
                            <button className="button text-left">
                                Open...
                            </button>
                        </div>
                    </div>
                    }
                </div>
                <div className="relative button mr-2" onClick={this._showTools}
                     onMouseOver={_ => this._showTools(_, true)}>
                    Tools
                    {showTools &&
                    <div className="absolute left-0 bg-white border shadow-lg"
                         style={{ top: "105%" }}>
                        <div className="w-72 flex flex-col p-4">
                            <button className="button text-left"
                                    onClick={this._generateRandomGraph}>
                                Generate random graph
                            </button>
                        </div>
                    </div>
                    }
                </div>
                <div className="relative button" onClick={this._showParameters}
                     onMouseOver={_ => this._showParameters(_, true)}>
                    Parameters
                    {showParameters &&
                    <div className="absolute left-0 bg-white border shadow-lg"
                         style={{ top: "105%" }}>
                        <div className="w-64 flex flex-col p-4">
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow"
                                        onClick={this._connectedComponents}>
                                    Connected Components
                                </button>
                            </div>
                            {/*
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow">
                                    Partitions
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow">
                                    Minimum cut
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow">
                                    Maximum matching
                                </button>
                            </div>
                            */}
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="flex items-center">
                <button className="button" title="Clear">
                    <Trash className="h-4"/>
                </button>
            </div>
            {/*<Help helpPage="maximum-matching"/>*/}
        </div>
        )
    }
}
