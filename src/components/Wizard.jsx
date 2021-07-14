import React from "react";

const Wizard = ({ player }) => {
  const x = player.x;
  const y = player.y;
  const width = player.width;
  const height = player.height;
  const isFacingRight = player.facingDirection === "right";
  const health = player.health;
  let healthColor;
  switch (true) {
    case health < 30:
      healthColor = "red";
      break;
    case health < 70:
      healthColor = "yellow";
      break;
    case health < 101:
    default:
      healthColor = "lime";
      break;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        bottom: y - height / 2,
        width: width,
        height: height,
        backgroundColor: "green",
      }}
    >
      <div
        style={{
          height: 10,
          width: "99%",
          backgroundColor: "grey",
          border: "black solid 1px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${health}%`,
            backgroundColor: healthColor,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: !isFacingRight ? 0 : "",
          right: isFacingRight ? 0 : "",
          width: "10px",
          height: "10px",
          backgroundColor: "blue",
          zIndex: 100,
        }}
      ></div>
    </div>
  );
};

export default Wizard;
