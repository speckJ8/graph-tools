import React from "react"

export default class LeftPanel extends React.Component {
    private _largeCircleStyle = {
        height: "1.5em",
        width: "1.5em",
        borderRadius: "50%",
    }

    private _smallCircleStyle = {
        height: ".75em",
        width: ".75em",
        borderRadius: "50%",
    }

    private _titleStyle: any = {
        writingMode: "tb-rl",
        transform: "rotate(-180deg)",
    }

    render () {
        return (
        <div className="py-4 h-full w-full border-r border-indigo-200 bg-blue-50 flex flex-col items-center">
            <span style={this._largeCircleStyle} className="w-6 bg-indigo-800 mb-6">
            </span>
            <h3 style={this._titleStyle}>Graph Tools</h3>
            <div className="w-1 my-6 flex-grow border-l border-dashed border-indigo-300">
            </div>
            <span style={this._smallCircleStyle} className="w-6 bg-indigo-300">
            </span>
        </div>
        )
    }
}
