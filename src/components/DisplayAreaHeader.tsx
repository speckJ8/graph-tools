import React from "react"

import { ReactComponent as Trash } from "../icons/trash.svg"

export default class DisplayAreaHeader extends React.Component {
    render () {
        return (
        <div className="h-12 px-6 py-2 border-b bg-white flex justify-between items-center">
            <div className="flex items-center">
                <button className="button mr-2" title="File">
                    File
                </button>
                <button className="button" title="File">
                    Tools
                    {/* generate random graph, ... */}
                </button>
                <button className="button" title="File">
                    Parameters
                    {/* number of components, is bipartite, ... */}
                </button>
            </div>
            <div className="flex items-center">
                <button className="button" title="Clear">
                    <Trash className="h-4"/>
                </button>
            </div>
        </div>
        )
    }
}
