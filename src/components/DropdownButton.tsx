import React from "react"

interface Props {
    title?: string | JSX.Element
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
}

interface State {
    active: boolean
}

export default class DropdownButton extends React.Component<Props, State> {
    state = {
        active: false,
    }

    render () {
        let { className, style, title, disabled, children } = this.props
        let { active } = this.state

        return (
        <button className={"relative " + className} style={style}
                disabled={disabled}
                onClick={_ => this.setState({ active: !active })}
                onMouseLeave={_ => this.setState({ active: false })}>
            {title}
        {active &&
            <div className="absolute left-0 bg-white border shadow-lg"
                 style={{ top: "105%" }}>
                {children}
            </div>
        }
        </button>
        )
    }
}
