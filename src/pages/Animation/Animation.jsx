import React, { useState, useEffect, useRef } from "react";
import "./Animation.css";

const Animation = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [startX, setStartX] = useState((980 - 150) / 2);
  const [startY, setStartY] = useState((600 - 150) / 2);
  const [rotate, setRotate] = useState(0);
  const [rotateSpeed, setRotateSpeed] = useState(0);
  const [checkBallposition_X, setCheckBallposition_X] = useState(true);
  const [checkBallposition_Y, setCheckBallposition_Y] = useState(true);
  const [selectedBall, setSelectedBall] = useState(null);
  const ballRef = useRef(null);
  const intervalId = useRef(null);

  const BallWidth = 150;
  const BallHeight = 150;
  const fieldWidth = 980;
  const fieldHeight = 600;
  const maxX = fieldWidth - BallWidth - 2;
  const maxY = fieldHeight - BallHeight - 2;
  const VBall_X = 7;
  const VBall_Y = 5;

  useEffect(() => {
    const ball = ballRef.current;
    if (ball) {
      ball.style.left = startX + "px";
      ball.style.top = startY + "px";
    }
    const initialBall = Math.floor(Math.random() * 6) + 2;
    selectBallClick(initialBall);
    rotate_random();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(process, 25);
    } else {
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, [isRunning, startX, startY, rotate, selectedBall]);

  const calcul = () => {
    let newX = startX;
    let newY = startY;
    let newCheckBallposition_X = checkBallposition_X;
    let newCheckBallposition_Y = checkBallposition_Y;

    if (checkBallposition_X) {
      newX += VBall_X;
      if (newX >= maxX) {
        newCheckBallposition_X = false;
        rotate_random();
      }
    } else {
      newX -= VBall_X;
      if (newX <= 0) {
        newCheckBallposition_X = true;
        rotate_random();
      }
    }

    if (checkBallposition_Y) {
      newY += VBall_Y;
      if (newY >= maxY) {
        newCheckBallposition_Y = false;
        rotate_random();
      }
    } else {
      newY -= VBall_Y;
      if (newY <= 0) {
        newCheckBallposition_Y = true;
        rotate_random();
      }
    }

    setStartX(newX);
    setStartY(newY);
    setCheckBallposition_X(newCheckBallposition_X);
    setCheckBallposition_Y(newCheckBallposition_Y);
    setRotate((prevRotate) => prevRotate + rotateSpeed);
  };

  const rotate_random = () => {
    const direction = Math.random() < 0.5 ? -1 : 1;
    setRotateSpeed(
      direction * Math.min(Math.floor(Math.random() * 10) + 1, 10)
    );
  };

  const process = () => {
    if (isRunning) {
      calcul();
      if (ballRef.current) {
        ballRef.current.style.left = startX + "px";
        ballRef.current.style.top = startY + "px";
        ballRef.current.style.transform = `rotate(${rotate}deg)`;
      }
    }
  };

  const startClick = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const selectBallClick = (num) => {
    const ball = ballRef.current;
    setSelectedBall(num);
    if (ball) {
      switch (num) {
        case 1:
          ball.style.backgroundImage = "none";
          ball.style.backgroundColor = "lightgrey";
          break;
        case 2:
          ball.style.backgroundImage = "url('./img/basketball.png')";
          break;
        case 3:
          ball.style.backgroundImage = "url('./img/football.png')";
          break;
        case 4:
          ball.style.backgroundImage = "url('./img/volleyball.png')";
          break;
        case 5:
          ball.style.backgroundImage = "url('./img/Human.png')";
          break;
        case 6:
          ball.style.backgroundImage = "url('./img/carton.png')";
          break;
        case 7:
          ball.style.backgroundImage = "url('./img/logo.png')";
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="Animation-container">
      <div id="Field" style={{ width: fieldWidth, height: fieldHeight }}>
        <div
          id="ball"
          ref={ballRef}
          style={{
            width: BallWidth,
            height: BallHeight,
            transform: `rotate(${rotate}deg)`,
          }}
        ></div>
      </div>
      <div className="ball-controller">
        <span style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="ball-changer-status">
            <button
              id="start"
              className={`btn ${isRunning ? "btn-danger" : "btn-success"}`}
              onClick={startClick}
              style={{ width: "150px" }}
            >
              <label
                className={`bi ${isRunning ? "bi-pause-fill" : "bi-play-fill"}`}
                style={{ fontSize: "20px" }}
              >
                {isRunning ? "stop" : "start"}
              </label>
            </button>
          </div>
          <div className="ball-changer-container">
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-1"
              autoComplete="off"
              checked={selectedBall === 1}
              onChange={() => selectBallClick(1)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-1">
              None
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-2"
              autoComplete="off"
              checked={selectedBall === 2}
              onChange={() => selectBallClick(2)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-2">
              Basket ball
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-3"
              autoComplete="off"
              checked={selectedBall === 3}
              onChange={() => selectBallClick(3)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-3">
              Foot ball
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-4"
              autoComplete="off"
              checked={selectedBall === 4}
              onChange={() => selectBallClick(4)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-4">
              Volley ball
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-5"
              autoComplete="off"
              checked={selectedBall === 5}
              onChange={() => selectBallClick(5)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-5">
              Human
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-6"
              autoComplete="off"
              checked={selectedBall === 6}
              onChange={() => selectBallClick(6)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-6">
              Carton
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="offtional-7"
              autoComplete="off"
              checked={selectedBall === 7}
              onChange={() => selectBallClick(7)}
            />
            <label className="btn btn-outline-primary" htmlFor="offtional-7">
              Logo
            </label>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Animation;
