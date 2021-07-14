import React from "react";

const PlayersDisplay = ({ players = [] }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        width: "100%",
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {players.map(({ id, health }, index) => (
          <div
            style={{
              padding: "10px",
              backgroundColor: "grey",
              borderRadius: "20px",
            }}
          >
            Player {index + 1}
            <p>{health}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersDisplay;
