import React from "react"

import DropdownButton from "./DropdownButton"

import { ReactComponent as Trash } from "../icons/trash.svg"

export default class DisplayAreaHeader extends React.Component {
    render () {
        return (
        <div className="h-12 px-6 py-2 border-b bg-white flex justify-between items-center">
            <div className="flex items-center">
                <DropdownButton className="button mr-2" title="File">
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
                </DropdownButton>
                <DropdownButton className="button mr-2" title="Tools">
                    <div className="w-48 flex flex-col p-4">
                        <button className="button text-left">
                            Generate random graph
                        </button>
                    </div>
                </DropdownButton>
                <DropdownButton className="DropdownButton" title="Parameters">
                    <div className="w-48 flex flex-col p-4">
                        <button className="button text-left">
                            Number of components
                        </button>
                        <button className="button text-left">
                            Partitions
                        </button>
                        <button className="button text-left">
                            Minimum cut
                        </button>
                        <button className="button text-left">
                            Maximum matching
                        </button>
                    </div>
                </DropdownButton>
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
