import Wizard from './components/wizard';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

function App() {
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [currentSpeed, setCurrentSpeed] = useState(40);
  const [keyState, setKeyState] = useState({});
  let socket = undefined;

  useEffect(() => {
    document.addEventListener("keydown",(e) => {  // simple but powerful
      let newKeyState = {...keyState};
      newKeyState[e.code] = e.type === "keydown";
      setKeyState(newKeyState);
    });
  }, []);

  useEffect(() => {
    socket = io("http://localhost:3030");
  }, []);
  
  useEffect(() => {
    const { KeyW, KeyA, KeyS, KeyD} = keyState;
    //UP
    if (KeyW) {
      setY(y - currentSpeed);
    }

    //DOWN
    if (KeyS) {
      setY(y + currentSpeed);
    }

    //LEFT
    if (KeyA) {
      setX(x - currentSpeed);
    }
    
    //RIGHT
    if (KeyD) {
      setX(x + currentSpeed)
    } 
  }, [keyState]);

  return (
    <div className="App">
      <div style={{ position: 'absolute', left: x, top: y}}>
        <Wizard x={x} y={y} />
      </div>
    </div>
  );
}

export default App;
