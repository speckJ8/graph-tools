import React from 'react'
import Editor from "@monaco-editor/react"

interface Props {
    className?: string
    style?: React.CSSProperties
    onChange?: (newValue?: string) => void
    value?: string
}

export default class TextEditor extends React.Component<Props> {
    private _editorSettings = {
        fontSize: 13,
    }

    render () {
        let { className, style, onChange, value } = this.props

        return (
        <div className={className} style={style}>
            <Editor
                height="96%"
                defaultLanguage="javascript"
                value={value}
                options={{
                    fontSize: this._editorSettings.fontSize,
                    minimap: { enabled: false }
                }}
                onChange={onChange}
            />
        </div>
        )
    }
}
