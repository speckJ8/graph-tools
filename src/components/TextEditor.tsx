import React from 'react'
import Editor from "@monaco-editor/react"

interface Props {
    className?: string
    style?: React.CSSProperties
}

export default class TextEditor extends React.Component<Props> {
    private _editorSettings = {
        fontSize: 13,
    }
    private _defaultValue = `/**
 * Include some nice code here...
 * */`

    render () {
        let { className, style } = this.props

        return (
        <div className={className} style={style}>
            <Editor
                height="96%"
                defaultLanguage="javascript"
                defaultValue={this._defaultValue}
                options={{
                    fontSize: this._editorSettings.fontSize,
                    minimap: { enabled: false }
                }}
            />
        </div>
        )
    }
}
