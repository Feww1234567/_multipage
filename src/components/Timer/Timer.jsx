import "./Timer.css";
import { useEffect, useState } from "react";

function Timer() {
  const [Secon, setSecon] = useState(0);
  const [Minute, setMinute] = useState(0);
  const [Runing, setRuning] = useState(false);
  const [Hour, setHour] = useState(0);
  const [Day, setDay] = useState(0);

  var Timer;

  useEffect(() => {
    if (Runing) {
      Timer = setInterval(() => {
        setSecon(Secon + 1);
        if (Secon === 60) {
          setSecon(0);
          setMinute(Minute + 1);
        }
        if (Minute === 60) {
          setMinute(0);
          setHour(Hour + 1);
        }
        if (Hour === 24) {
          setHour(0);
          setDay(Day + 1);
        }
      }, 1000);
      return () => clearInterval(Timer);
    }
  }, [Runing, Secon, Minute, Hour, Day]); //เรียกใช้งานใหม่

  function stop() {
    clearInterval(Timer);
    setSecon(0);
    setMinute(0);
    setHour(0);
    setDay(0);
    setRuning(false);
  } //Resetค่าทุกอย่างไปเริ่มต้นใหม่

  function start() {
    if (!Runing) {
      setRuning(true);
    } else {
      setRuning(false);
    }
  } //ทำงานหรือหยุดทำงาน
  return (
    <div>
      <div className="Time-container">
        <div className="Time">
          <h3 style={{ textAlign: "center" }}>Timer</h3>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              textAlign: "center",
              background: "linear-gradient(to right, #f44336, #e91e63)",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            }}
          >
            {Day}d:{Hour}h:{Minute}m:{Secon}s
          </h1>
          <div className="button-container">
            <button
              className={"bi btn " + (Runing ? "bi-pause-fill" : "bi-play-fill") + (Runing ? " btn-warning" : " btn-success")}
              onClick={start}
            >
              {Runing ? "Pause" : "Run"}
            </button>
            <button
              className={"btn" + (Runing ? " btn-secondary" : " btn-danger")}
              onClick={stop}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
