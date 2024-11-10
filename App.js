import React from "react"


export default function App() {
    console.log("app")
    const gameButtonValues = ["1", "2", "1", "2", "1", "2", "1", "2", "1", "2"]


    return (
        <main>
            <div className="game--box">
                <h2 className="game--title">Tenzies</h2>
                <p className="game--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="game--buttons-box">
                    {gameButtonValues.map((buttonValue) => {
                        return <div className="game--buttons clicked">
                            {buttonValue}
                        </div>
                    })}
                </div>
                <button className="game--button-roll">Roll</button>
            </div>
        </main>
    )

}