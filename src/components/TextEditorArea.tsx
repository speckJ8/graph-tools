import React from "react"
import TextEditor from "./TextEditor"

import { ReactComponent as DocumentAdd } from "../icons/document-add.svg"

export default class TextEditorAreaa extends React.Component {
    render () {
        return (
        <div className="h-full w-full flex flex-col">
            <div className="px-6 py-2 h-12 border-b flex justify-between items-center">
                <div className="w-full flex items-center justify-between">
                    <select className="button-with-border" title="Choose script">
                        <option>Script 1</option>
                        <option>Maximum Matching</option>
                        <option>Shortest Paths</option>
                    </select>
                    <button className="button" title="New script">
                        <DocumentAdd className="h-4"/>
                    </button>
                </div>
            </div>
            <TextEditor className="w-full flex-grow relative"/>
        </div>
        )
    }
}
