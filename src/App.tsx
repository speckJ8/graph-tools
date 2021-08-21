import React from 'react'

import ResizableContainer from "./components/ResizableContainer"

import TextEditorArea from './components/TextEditorArea'
import MetadataArea from './components/MetadataArea'
import DisplayArea from './components/DisplayArea'
import FooterArea from "./components/FooterArea"


export default class App extends React.Component {
    render () {
        return (
        <div className="app-container flex flex-col">
            <div className="flex-1 flex w-full h-full">
                <div className="w-52 flex border-r">
                    <MetadataArea />
                </div>
                <div className="flex flex-grow">
                    <DisplayArea />
                </div>
                <ResizableContainer style={{ width: "500px" }}
                        className="border-l">
                    <TextEditorArea/>
                </ResizableContainer>
            </div>
            <FooterArea statusMessage="All systems reloaded"/>
        </div>
        )
    }
}
