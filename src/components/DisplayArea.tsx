import React from "react"

import { ReactComponent as ZoomIn } from "../icons/zoom-in.svg"
import { ReactComponent as ZoomOut } from "../icons/zoom-out.svg"
import { ReactComponent as XCircle } from "../icons/x-circle.svg"

export default class DisplayArea extends React.Component {
    private _containerRef?: HTMLDivElement = undefined
    private _canvasRef?: HTMLCanvasElement = undefined
    private _canvasContext?: CanvasRenderingContext2D = undefined

    componentDidMount () {
        if (this._canvasRef && this._containerRef) {
            this._canvasRef.height = this._containerRef.offsetHeight
            this._canvasRef.width = this._containerRef.offsetWidth
            this._canvasContext = this._canvasRef.getContext("2d") || undefined
            if (!this._canvasContext)
                return
            this._drawBackgroundGrid()
        }
    }

    private _drawBackgroundGrid = () => {
        if (!this._canvasRef || !this._canvasContext)
            return

        let width = this._canvasRef.width
        let height = this._canvasRef.height
        let step = 35
        this._canvasContext.strokeStyle = "#eee"
        this._canvasContext.lineWidth = 0.5

        for (let x = 0; x < width; x += step) {
            this._canvasContext.beginPath()
            this._canvasContext.moveTo(x, 0)
            this._canvasContext.lineTo(x, height)
            this._canvasContext.closePath()
            this._canvasContext.stroke()
        }

        for (let y = 0; y < height; y += step) {
            this._canvasContext.beginPath()
            this._canvasContext.moveTo(0, y)
            this._canvasContext.lineTo(width, y)
            this._canvasContext.closePath()
            this._canvasContext.stroke()
        }
    }

    render () {
        return (
        <div ref={r => this._containerRef = r || undefined}
             className="w-full h-full relative">
            <div className="h-12 px-6 py-2 absolute left-0 right-0 top-0 border-b bg-white flex  justify-between items-center">
                <div></div>
                <div className="flex items-center">
                    <button className="button" title="Clear">
                        <XCircle className="h-4"/>
                    </button>
                    <div className="mx-1 text-gray-200">|</div>
                    <button className="button" title="Zoom in">
                        <ZoomIn className="h-4"/>
                    </button>
                    <div className="mx-1 text-gray-200">|</div>
                    <button className="button" title="Zoom out">
                        <ZoomOut className="h-4"/>
                    </button>
                </div>
            </div>
            <canvas ref={r => this._canvasRef = r || undefined}
                    width="100%" height="100%">
            </canvas>
        </div>
        )
    }
}
