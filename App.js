import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [numberOfRolls, setNumberOfRolls] = React.useState(0) //initialize number of rolls to 0
    const [timerRunning, setTimerRunning] = React.useState(true)
    const [timeToFinish, setTimeToFinish] = React.useState(0) //initialize to 0 seconds

    const [bestRecord, setBestRecord] = React.useState(localStorage.getItem("bestRecord") ? localStorage.getItem("bestRecord") : 0); //Initialize bestRecord to 0

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

            setTimerRunning(false)
        }
    }, [dice])

    React.useEffect(() => {
        let timer;
        if (timerRunning) {
            timer = setInterval(() => {
                setTimeToFinish((prevTime) => prevTime + 1)
            }, 1000)
        }

        //cleanup interval after use
        return () => clearInterval(timer);
    }, [timerRunning])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function formatTime(timeInSeconds) {
        const minutes = Math.floor((timeInSeconds / 3600) / 60)
        const seconds = Math.floor(timeInSeconds % 60)

        return `${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
            setNumberOfRolls(0);
            setDice(allNewDice())
            setTimerRunning(true)
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
            <div className="tracking">
                <pre>Number of Rolls: {numberOfRolls}</pre>
                <pre>Time to finish: {formatTime(timeToFinish)}</pre>
                <pre>Best record: {bestRecord}</pre>
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}