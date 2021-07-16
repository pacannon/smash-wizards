import Wizard from "./components/Wizard";
import JoinScreen from "./components/JoinScreen";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import GameObject from "./components/GameObject";
import PlayersDisplay from "./components/PlayersDisplay";
import ModalContent from "./components/ModalContent";
import Modal from "react-modal";

Modal.setAppElement("div");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
  overlay: {
    zIndex: 100,
  },
};

let socket = io("http://localhost:3030");

function App() {
  const [joined, setJoined] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [gameState, setGameState] = useState(undefined);

  useEffect(() => {
    if (joined) {
      document.addEventListener("keydown", (e) => {
        // simple but powerful
        let newKeyState = {};

        if (e.code === "KeyV") {
          setOpenModal(true);
        }

        newKeyState[e.code] = e.type === "keydown";
        socket.emit("userCommand", newKeyState);
      });
    }
  }, [joined]);

  useEffect(() => {
    socket.on("gameState", (gameState) => {
      setGameState(gameState);
    });
    socket.on("joined", () => {
      setJoined(true);
    });
  }, []);

  const joinRoom = (id) => {
    socket.emit("join", { id });
  };

  return (
    <div className="App">
      {!joined ? (
        <JoinScreen join={joinRoom} />
      ) : (
        <>
          {gameState && (
            <PlayersDisplay
              players={Object.keys(gameState.players).map(
                (playerId) => gameState.players[playerId]
              )}
            />
          )}
          {gameState &&
            Object.keys(gameState.players).map((playerId) => {
              return (
                <Wizard key={playerId} player={gameState.players[playerId]} />
              );
            })}
          {gameState &&
            Object.keys(gameState.gameObjects).map((id) => {
              let gameObject = gameState.gameObjects[id];
              return <GameObject key={gameObject.id} gameObject={gameObject} />;
            })}
          <Modal
            isOpen={openModal}
            onRequestClose={() => {
              setOpenModal(false);
            }}
            style={customStyles}
          >
            <ModalContent />
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;
