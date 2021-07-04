import React from 'react';

const GameObject = ({gameObject}) => {
  const id = gameObject.id;
  const x = gameObject.x;
  const y = gameObject.y;
  const width = gameObject.width;
  const height = gameObject.height;
  

    const style = { position: 'absolute', left: x - (width / 2), top: y - (height / 2), width: width, height: height, backgroundColor: 'green'};
    return (
        <div id={id} style={style}>
        </div>
    )
}

export default GameObject;
