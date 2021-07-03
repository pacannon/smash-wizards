import React from 'react';
import { useEffect, useState } from 'react';
import Shot from './shot';

const Wizard = ({player}) => {
  const x = player.x;
  const y = player.y;

    const style = { position: 'absolute', left: x, top: y, width: '100px', height: '100px', borderRadius: '50px', backgroundColor: 'green'};
    return (<div><div id="wizard" style={style} /></div>)
}

export default Wizard;
