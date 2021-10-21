import React from "react"

import Help from "./Help"

import { ReactComponent as Trash } from "../icons/trash.svg"
import { ReactComponent as Question } from "../icons/question.svg"

import * as Tools from "../lib/tools"
import GraphContext from "../lib/graph-context"

interface State {
    showFile: boolean
    showTools: boolean
    showParameters: boolean
}

export default class DisplayAreaHeader extends React.Component<{}, State> {
    static contextType = GraphContext

    state = {
        showFile: false,
        showTools: false,
        showParameters: false,
    }

    private _generateRandomGraph = () => {
        let randomGraph = Tools.generateRandomGraph()
        let { setGraph } = this.context
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

    render () {
        let { showFile, showTools, showParameters } = this.state

        return (
        <div className="h-12 px-6 py-2 border-b bg-white flex justify-between items-center"
             onClick={this._hideAll}>
            <div className="flex items-center">
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
                            <span className="border-t my-2"></span>
                            <button className="button text-left">
                                Delete vertices
                            </button>
                            <button className="button text-left">
                                Delete edges
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
                            <button className="button text-left"
                                    onClick={this._generateRandomGraph}>
                                Generate parameterized random graph
                            </button>
                            <button className="button text-left">
                                Duplicate
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
                                <button className="button text-left flex-grow">
                                    Number of components
                                </button>
                                <button className="p-1">
                                    <Question className="h-3 text-blue-400"/>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow">
                                    Partitions
                                </button>
                                <button className="p-1">
                                    <Question className="h-3 text-blue-400"/>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow">
                                    Minimum cut
                                </button>
                                <button className="p-1">
                                    <Question className="h-3 text-blue-400"/>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="button text-left flex-grow">
                                    Maximum matching
                                </button>
                                <button className="p-1">
                                    <Question className="h-3 text-blue-400"/>
                                </button>
                            </div>
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
