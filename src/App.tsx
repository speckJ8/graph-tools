import React from 'react'
import TextEditorArea from './components/TextEditorArea'
import MetadataArea from './components/MetadataArea'
import DisplayArea from './components/DisplayArea'
import FooterArea from "./components/FooterArea"

export default class App extends React.Component {
    render () {
        return (
        <div className="app-container flex flex-col">
            <div className="flex-1 flex w-full h-full">
                <div className="w-1/6 flex">
                    <MetadataArea />
                </div>
                <div className="w-3/6 flex">
                    <DisplayArea />
                </div>
                <div className="w-2/6">
                    <TextEditorArea/>
                </div>
            </div>
            <FooterArea statusMessage="All systems reloaded"/>
        </div>
        )
    }
}
