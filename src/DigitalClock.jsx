// Importing React hooks
// useState → stores dynamic data (time)
// useEffect → handles side effects (interval, cleanup)
import { useState, useEffect } from "react"

// Importing styles for the clock UI
import "./index.css"

function DigitalClock() {

    // time → state variable that stores current Date object
    // Initialized with the current time when component mounts
    const [time, setTime] = useState(new Date());

    // useEffect is REQUIRED here because:
    // - setInterval is a SIDE EFFECT (outside React rendering)
    // - React render must stay pure (no timers inside render)
    //
    // This effect:
    // 1️⃣ Runs ONCE when component mounts
    // 2️⃣ Starts a timer that updates time every second
    // 3️⃣ Cleans up the timer when component unmounts
    useEffect(() => {

      // setInterval runs every 1000ms (1 second)
      // Each tick updates state with a NEW Date object
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);

      // CLEANUP FUNCTION
      // Runs when component unmounts
      // Prevents memory leaks and duplicate intervals
      return () => {
        clearInterval(interval);
      }

    }, []); // Empty dependency array → run only on mount

    // Formats time into 12-hour digital clock format
    function formatTime(){

        // Extract hours, minutes, seconds from Date object
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        // Determine AM or PM
        const meridiem = hours >= 12 ? "PM" : "AM";

        // Convert 24-hour time to 12-hour format
        hours = hours % 12 || 12;

        // Return formatted time string
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${meridiem}`
    }

    // Adds leading zero if number is less than 10
    // Example: 5 → "05"
    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

  return (
    <div className="clock-container">

        {/* Empty div (could be used for layout or effects) */}
        <div className="clock"></div>

        {/* Display formatted time */}
        <span className="clock">{formatTime()}</span>

    </div>
  )
}

// Exporting component
export default DigitalClock
