import React from "react"

import "../styles/resizable-container.css"

interface Props {
    className?: string
    style?: React.CSSProperties
}

export default class ResizableContainer extends React.Component<Props> {
    private _resizeStartPosition = 0
    private _mouseDown = false
    private _containerRef?: HTMLDivElement = undefined

    render () {
        let { className, style, children } = this.props

        return (
        <div className={className} style={style}
             ref={r => this._containerRef = r || undefined}>
            <div className="w-full h-full relative">
                <div className="flex-grow h-full">
                    {children}
                </div>
            </div>
        </div>
        )
    }
}
