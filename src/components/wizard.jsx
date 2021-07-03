import React from 'react';
import { useEffect, useState } from 'react';
import Shot from './shot';

const Wizard = () => {
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [shots, setShots] = useState([]);
  const [currentDirection, setCurrentDirection] = useState('right');
  const [currentSpeed, setCurrentSpeed] = useState(40);
  const [keyState, setKeyState] = useState({});

  useEffect(() => {
    document.addEventListener("keydown",(e) => {  // simple but powerful
      let newKeyState = {};
      newKeyState[e.code] = e.type === "keydown";
      setKeyState(newKeyState);
    });
  }, []);
  
  useEffect(() => {
    const { KeyW, KeyA, KeyS, KeyD, Space } = keyState;
    console.log(keyState);
    //UP
    if (KeyW) {
      setCurrentDirection('up');
      setY(y - currentSpeed);
    }

    //DOWN
    if (KeyS) {
      setCurrentDirection('down');
      setY(y + currentSpeed);
    }

    //LEFT
    if (KeyA) {
      setCurrentDirection('left');
      setX(x - currentSpeed);
    }
    
    //RIGHT
    if (KeyD) {
      setCurrentDirection('right');
      setX(x + currentSpeed)
    } 

    if (Space) {
        let newShots = [...shots];
        newShots.push(<Shot direction={currentDirection} initX={x + 10} initY={y + 10} />)
        setShots(newShots);
    }

  }, [keyState]);
    const style = { position: 'absolute', left: x, top: y, width: '100px', height: '100px', borderRadius: '50px', backgroundColor: 'green'};
    return (<div><div id="wizard" style={style} />{shots}</div>)
}

export default Wizard;