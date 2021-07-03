import React from 'react';

const Wizard = ({player}) => {
  const x = player.x;
  const y = player.y;
  const isFacingRight = player.facingDirection == 'right';

    const style = { position: 'absolute', left: x, top: y, width: '100px', height: '100px', borderRadius: '50px', backgroundColor: 'green'};
    return (
        <div id="wizard" style={style}>
            <div style={{ position: 'absolute', left: !isFacingRight ? 0 : '', right: isFacingRight ? 0 : '', width: '10px', height: '10px', backgroundColor: 'blue', zIndex: 100}}></div>
        </div>
    )
}

export default Wizard;
