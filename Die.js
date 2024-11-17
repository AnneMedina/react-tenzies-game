
import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#b76e795e" : "white"
    }

    const dots = Array.from({ length: props.value }, (_, i) => {
        return (<span key={i} className="dot"></span>)
    })

    return (
        <div
            className={`die-face die-${props.value}`}
            style={styles}
            onClick={props.holdDice}
        >
            {dots}
        </div>
    )
}