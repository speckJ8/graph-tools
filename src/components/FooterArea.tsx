import React from "react"

interface Props {
    loadingStatus?: boolean
    statusMessage?: string
}

export default class FooterArea extends React.Component<Props> {
    render () {
        let { loadingStatus, statusMessage } = this.props
        return (
        <div className="flex w-full bg-gray-100 px-6 py-2 justify-between">
            <div className="flex items-center">
                {loadingStatus && <small>Loading something</small>}
                <small>{statusMessage}</small>
            </div>
            <div className="flex items-center">
                <small>20 vertices</small>
                <small className="mx-2">|</small>
                <small>20 edges</small>
                <small className="mx-2">|</small>
                <small>3 Components</small>
            </div>
        </div>
        )
    }
}
