import { useEffect, useState } from "react"

const Shot = ({ direction = 'right', initX = 0, initY = 0 }) => {
    const [x, setX] = useState(initX);
    const [bulletSpeed, setBulletSpeed] = useState(10);
    useEffect(() => {
        setInterval(() => {
            console.log('Ran');
            switch (direction) {
                case 'right':
                    setX(x + bulletSpeed);
                    break;
                case 'left':
                    setX(x - bulletSpeed);
                    break;
            }
        }, 100);
    }, []);

    return <div style={{position: 'absolute', left: x, top: initY, width: '50px', height: '50px', borderRadius: '25px', backgroundColor: 'red'}} />
}

export default Shot;