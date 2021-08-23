import React from 'react'

import ResizableContainer from "./components/ResizableContainer"

import TextEditorArea from './components/TextEditorArea'
import LeftPanel from './components/LeftPanel'
import DisplayArea from './components/DisplayArea'

import GraphContext from "./lib/graph-context"

let _graph = {
    vertices: [
        {
            name: "The important vertex",
            position: { x: 100, y: 100 },
            highlighted: true,
            svgRepresentation: undefined,
            colorHex: "#065F46"
        },
        {
            position: { x: 150, y: 100 },
            highlighted: false,
            svgRepresentation: undefined,
        },
    ],
    edges: [
    ]
}

export default class App extends React.Component {
    render () {
        return (
        <GraphContext.Provider value={_graph}>
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
