import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chatbot from './components/Chatbot';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Chatbot />
    </div>
  );

}

export default App
