import Wizard from './components/wizard';
import { useEffect} from 'react';
import { io } from "socket.io-client";

let socket = io("http://localhost:3030");

function App() {
    useEffect(() => {
      
    }, []);
  return (
    <div className="App">
      <Wizard />
    </div>
  );
}

export default App;
