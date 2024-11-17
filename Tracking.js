import React from "react";
import Timer from "./Timer"

export default function Tracking(props) {
    return (

        <div className="tracking">
            <pre>
                <span className="records-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b76e79">
                        <path d="M302.12-228q30.88 0 52.38-21.62 21.5-21.62 21.5-52.5t-21.62-52.38q-21.62-21.5-52.5-21.5t-52.38 21.62q-21.5 21.62-21.5 52.5t21.62 52.38q21.62 21.5 52.5 21.5Zm0-356q30.88 0 52.38-21.62 21.5-21.62 21.5-52.5t-21.62-52.38q-21.62-21.5-52.5-21.5t-52.38 21.62q-21.5 21.62-21.5 52.5t21.62 52.38q21.62 21.5 52.5 21.5Zm178 178q30.88 0 52.38-21.62 21.5-21.62 21.5-52.5t-21.62-52.38q-21.62-21.5-52.5-21.5t-52.38 21.62q-21.5 21.62-21.5 52.5t21.62 52.38q21.62 21.5 52.5 21.5Zm177 178q30.88 0 52.38-21.62 21.5-21.62 21.5-52.5t-21.62-52.38q-21.62-21.5-52.5-21.5t-52.38 21.62q-21.5 21.62-21.5 52.5t21.62 52.38q21.62 21.5 52.5 21.5Zm1-356q30.88 0 52.38-21.62 21.5-21.62 21.5-52.5t-21.62-52.38q-21.62-21.5-52.5-21.5t-52.38 21.62q-21.5 21.62-21.5 52.5t21.62 52.38q21.62 21.5 52.5 21.5ZM200-94q-43.73 0-74.86-31.14Q94-156.27 94-200v-560q0-43.72 31.14-74.86Q156.27-866 200-866h560q43.72 0 74.86 31.14T866-760v560q0 43.73-31.14 74.86Q803.72-94 760-94H200Zm0-106h560v-560H200v560Zm0-560v560-560Z" />
                    </svg>
                </span>
                Number of Rolls: <span className="records">{props.numberOfRolls}</span></pre>
            <Timer timerRunning={props.timerRunning} resetTime={props.resetTime} />
            <pre>
                <span className="records-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b76e79">
                        <path d="M243-88v-106h184v-112q-47-12-85.5-40T282-418q-85-8-139.5-73.5T88-644v-40q0-45 30.5-75.5T194-790h66v-82h440v82h66q45 0 75.5 30.5T872-684v40q0 87-54.5 152.5T678-418q-21 44-59.5 72T533-306v112h184v106H243Zm17-444v-152h-66v40q0 35 17.5 65t48.5 47Zm220 126q48 0 81-33t33-81v-246H366v246q0 48 33 81t81 33Zm220-126q31-17 48.5-47t17.5-65v-40h-66v152Zm-220-54Z" />
                    </svg>
                </span>
                Best record: <span className="records">{props.bestRecord}</span></pre>
        </div>
    )
}