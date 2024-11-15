
import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const dots = Array.from({ length: props.value }, (_, i) => {
        return (<span key={i} className="dot"></span>)
    })

    console.log({ dots })

    return (
        <div
            className={`die-face die-${props.value}`}
            style={styles}
            onClick={props.holdDice}
        >

            {dots}
            {/* <h2 className="die-num">{props.value}</h2> */}
        </div>
    )
}