import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Tracking from "./Tracking"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [numberOfRolls, setNumberOfRolls] = React.useState(0) //initialize number of rolls to 0
    const [timerRunning, setTimerRunning] = React.useState(true)
    const [bestRecord, setBestRecord] = React.useState(localStorage.getItem("bestRecord") ? localStorage.getItem("bestRecord") : 0); //Initialize bestRecord to 0
    const [resetTime, setResetTime] = React.useState(true);

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)

            /** execute line below only if a new record */
            if (numberOfRolls < bestRecord || bestRecord == 0) {
                setBestRecord(numberOfRolls)
                localStorage.setItem("bestRecord", numberOfRolls)
            }

            /** At the end of the game, stop the timer */
            setTimerRunning(false)

            /** Have to change state because the reset in useEffect in Die component will 
             * not be triggered if the state resetTime has the same value as the previous value */
            setResetTime(false)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    /** Set a new game */
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {

        /** Track number of rolls */
        setNumberOfRolls(prevCount => prevCount + 1);
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else { //If game is already won
            setTenzies(false)
            setNumberOfRolls(0)
            setDice(allNewDice())
            setTimerRunning(true)
            setResetTime(true)
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {

            if (die.id === id) {
                return {
                    id: die.id,
                    value: die.value,
                    isHeld: !die.isHeld
                }
            }

            return die

            /** There is a compatibility issue with the spread operator below so 
             * I'm temporarily replacing it until all packages are fixed */
            // return die.id === id ? 
            //     {...die, isHeld: !die.isHeld} :
            //     die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>

            <Tracking numberOfRolls={numberOfRolls} timerRunning={timerRunning} resetTime={resetTime} bestRecord={bestRecord} />

            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}