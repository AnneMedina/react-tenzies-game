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
        <pre>
            <span className="records-icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b76e79">
                    <path d="M348-836v-106h264v106H348Zm79 470h106v-264H427v264Zm53 336q-80 0-150.08-30.49-70.08-30.5-122.51-82.92-52.42-52.43-82.92-122.51Q94-336 94-416q0-80 30.49-150.08 30.5-70.08 82.92-122.51 52.43-52.42 122.51-82.92Q400-802 480-802q63.41 0 121.7 19Q660-764 711-726l67-67 75 75-67 67q41 54 60.5 113T866-416q0 80-30.49 150.08-30.5 70.08-82.92 122.51-52.43 52.42-122.51 82.92Q560-30 480-30Zm0-106q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
                </svg>
            </span>
            Time to finish: <span className="records">{formatTime(timeToFinish)}</span>
        </pre>
    )

}