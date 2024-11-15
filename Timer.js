import React from "react"

export default function Timer(props) {
    const [timeToFinish, setTimeToFinish] = React.useState(0) //initialize to 0 seconds

    React.useEffect(() => {
        let timer;

        if (props.timerRunning) {
            timer = setInterval(() => {
                setTimeToFinish((prevTime) => prevTime + 1)
            }, 1000)
        }

        //cleanup interval after use
        return () => clearInterval(timer);
    }, [props.timerRunning])

    React.useEffect(() => {
        if (props.resetTime) {
            setTimeToFinish(0)
        }
    }, [props.resetTime])


    function formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <pre>Time to finish: <span className="records">{formatTime(timeToFinish)}</span></pre>
    )

}