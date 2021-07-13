import React, { useState } from "react";

const JoinScreen = ({ join }) => {
  const [randomCode, setRandomCode] = useState(
    Math.random().toString(36).substring(7)
  );
  const [joinCode, setJoinCode] = useState("");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(#e66465, #9198e5)",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div>
        <div>
          <h1 style={{ color: "white" }}>Smash Wizards</h1>
        </div>
        <div>
          <label>Share this code for friends to join: {randomCode}</label>
          <br />
          <input
            placeholder="Room Code"
            onChange={(e) => {
              setJoinCode(e.target.value);
            }}
          />
          <br />
          <button
            onClick={() => {
              join(joinCode);
            }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinScreen;
