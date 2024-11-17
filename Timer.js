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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5035ff">
                    <path d="M355.69-846v-86h248.62v86H355.69ZM437-373.69h86v-248.62h-86v248.62ZM480-50q-76.15 0-142.58-28.76-66.43-28.77-116.16-78.5-49.73-49.73-78.5-116.16Q114-339.85 114-416t28.76-142.58q28.77-66.43 78.5-116.16 49.73-49.73 116.16-78.5Q403.85-782 480-782q61.49 0 118.44 19.39 56.94 19.38 105.64 57.38l60.84-60.84 61.15 61.15-60.84 60.84q41 51.7 60.88 109.35Q846-477.08 846-416q0 76.15-28.76 142.58-28.77 66.43-78.5 116.16-49.73 49.73-116.16 78.5Q556.15-50 480-50Zm0-86q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
                </svg>
            </span>
            Time to finish: <span className="records">{formatTime(timeToFinish)}</span>
        </pre>
    )

}