import React from "react"

export default class MetadataArea extends React.Component {
    private _logoStyle = {
        height: "1.5em",
        width: "1.5em",
        borderRadius: "50%",
    }

    render () {
        return (
        <div className="h-full w-full border-r border-indigo-200 bg-blue-50">
            <div className="py-4 px-6 flex h-full">
                <div className="w-6 flex flex-col h-full items-center justify-center">
                    <span style={this._logoStyle}
                          className="bg-indigo-800 mb-6">
                    </span>
                    <div className="w-1 flex-grow border-l border-dashed border-indigo-300">
                    </div>
                    <div className="mt-6 flex flex-col items-center">
                        <small>3</small>
                        <span className="my-1"></span>
                        <small>20</small>
                        <span className="my-1"></span>
                        <small>24</small>
                    </div>
                </div>
                <div className="flex flex-col flex-grow h-full">
                    <h3 className="ml-4 mb-6">Graph Tools</h3>
                    <div className="w-1 flex-grow">
                    </div>
                    <div className="ml-4 mt-6 flex flex-col">
                        <small>components</small>
                        <span className="my-1"></span>
                        <small>vertices</small>
                        <span className="my-1"></span>
                        <small>edges</small>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
