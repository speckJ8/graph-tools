import React from "react"
import TextEditor from "./TextEditor"
import { ReactComponent as DocumentAdd } from "../icons/document-add.svg"
import { ReactComponent as Execute } from "../icons/execute.svg"
import { ReactComponent as Output } from "../icons/output.svg"
import { ReactComponent as ChevronUp } from "../icons/chevron-up.svg"
import { ReactComponent as ChevronDown } from "../icons/chevron-down.svg"
import { ReactComponent as Circle } from "../icons/circle.svg"
import { execute } from "../lib/script"
import { GraphState } from "../lib/graph"

interface State {
    script: string
    showLogs: boolean
    logs: string
    executing: boolean
    executionStatus: "none" | "failed" | "succeeded"
}

interface Props {
    graphState: GraphState
}

export default class TextEditorArea extends React.Component<Props, State> {
    state: State = {
        showLogs: false,
        logs: "No logs...",
        executing: false,
        executionStatus: "none",
        script: `/** Example script */

vertices.forEach((v, i) => {
    setTimeout(() => {
        v.colorHex = "#ff0000"
        v.highlighted = true
    }, i*1000)

    setTimeout(() => {
        v.colorHex = "#444444"
        v.highlighted = false
    }, (i+1)*1000)
})`
    }

    private _runScript = async () => {
        let { script } = this.state

        this.setState({ executing: true })
        let result = await execute(script, this.props.graphState)
        if (result) {
            this.setState({
                executing: false,
                executionStatus: "failed",
                logs: result
            })
        } else {
            this.setState({
                executing: false,
                executionStatus: "succeeded",
                logs: "Execution completed"
            })
        }
        setTimeout(() => {
            this.setState({ executionStatus: "none" })
        }, 5000)
    }

    render () {
        let { showLogs, logs, executing, executionStatus, script } = this.state

        let logsBackground = undefined
        if (executionStatus === "failed") {
            logsBackground = "#FEE2E2"
        } else if (executionStatus === "succeeded") {
            logsBackground = "#ECFDF5"
        }

        return (
        <div className="h-full w-full flex flex-col">
            <div className="px-6 py-2 h-12 border-b flex justify-between items-center">
                <div className="w-full flex items-center justify-between">
                    <select className="button-with-border" title="Choose script">
                        <option>Script 1</option>
                        <option>Maximum Matching</option>
                        <option>Shortest Paths</option>
                    </select>
                    <div className="flex items-center">
                        <button className="button" title="New script"
                                disabled={executing}>
                            <DocumentAdd className="h-4"/>
                        </button>
                        <span className="mx-2 text-gray-300">|</span>
                        <button className="button" title="Run"
                                onClick={this._runScript}
                                disabled={executing}>
                            <Execute className="h-4" fill="green"/>
                        </button>
                    </div>
                </div>
            </div>
            <TextEditor className="w-full flex-grow relative" value={script}
                        onChange={_ => this.setState({ script: _ || "" })}/>
            <div className="border-t w-full">
                <button className="flex justify-between items-center w-full px-6 py-2 hover:bg-gray-50 color-transition"
                        style={{ background: logsBackground }}
                        onClick={_ => this.setState({ showLogs: !showLogs })}>
                    <div className="flex items-center">
                    {executing ?
                        <>
                            <Circle className="loading-circle h-3 mr-4"
                                    fill="#444" />
                            <small>Executing...</small>
                        </>
                    :
                        <>
                            <Output className="h-4 mr-4" />
                        {executionStatus === "failed" ?
                            <small>Execution failed</small>
                        : executionStatus === "succeeded" ?
                            <small>Execution succeeded</small>
                        :
                            <small>Logs</small>
                        }
                        </>
                    }
                    </div>
                {showLogs ?
                    <ChevronDown className="h-3" />
                :
                    <ChevronUp className="h-3" />
                }
                </button>
            {showLogs &&
                <textarea className="h-40 w-full px-6 py-2 border-t"
                          readOnly
                          value={logs || "Nothing to show..."}/>
            }
            </div>
        </div>
        )
    }
}
