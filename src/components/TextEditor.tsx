import React from 'react'
import Editor from "@monaco-editor/react"

interface Props {
    className?: string
    style?: React.CSSProperties
}

export default class TextEditor extends React.Component<Props> {
    private _editorSettings = {
        fontSize: 13,
        theme: "vs-dark",
    }

    render () {
        let { className, style } = this.props

        return (
        <div className={className} style={style}>
            <Editor
                height=""
                defaultLanguage="javascript"
                theme={this._editorSettings.theme}
                options={{ fontSize: this._editorSettings.fontSize }}
            />
        </div>
        )
    }
}
