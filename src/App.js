import Wizard from './components/wizard';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

let socket = io("http://localhost:3030");

function App() {
  const [gameState, setGameState] = useState(undefined);


  useEffect(() => {
    document.addEventListener("keydown",(e) => {  // simple but powerful
      let newKeyState = {};
      newKeyState[e.code] = e.type === "keydown";
      socket.emit('userCommand', newKeyState)
    });
  }, []);

    useEffect(() => {
      socket.connect()
      socket.on('gameState', gameState => {
        setGameState(gameState);
      })
    }, []);

  return (
    <div className="App">
      {gameState && Object.keys(gameState.players).map(playerId => {
        return <Wizard player={gameState.players[playerId]}/>
      })}
    </div>
  );
}

export default App;
