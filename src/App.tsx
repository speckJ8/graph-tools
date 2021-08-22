import React from 'react'

import ResizableContainer from "./components/ResizableContainer"

import TextEditorArea from './components/TextEditorArea'
import MetadataArea from './components/MetadataArea'
import DisplayArea from './components/DisplayArea'


export default class App extends React.Component {
    render () {
        return (
        <div className="app-container flex">
            <div className="w-60">
                <MetadataArea />
            </div>
            <div className="flex-grow">
                <DisplayArea />
            </div>
            <ResizableContainer style={{ width: "600px" }}
                    className="border-l">
                <TextEditorArea/>
            </ResizableContainer>
        </div>
        )
    }
}
