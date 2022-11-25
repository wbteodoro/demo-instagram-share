import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import domtoimage from "dom-to-image";
import './App.css'

function Main() {
  const [count, setCount] = useState(0);

  return (
    <div className="main-container">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

function App() {
  const container = useRef(null);
  const [file, setFile] = useState(null);

  function exportToPng(dom) {
    domtoimage
      .toJpeg(dom)
      .then(async function (dataUrl) {
        const response = await fetch(dataUrl);
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        const blob = await response.blob();
        const filesArray = new File([blob], 'meme.jpg', { type: "image/jpeg", lastModified: new Date().getTime() });
        // const blob = new Blob([img], { type: 'image/jpeg' });
        // const generatedFile = new File([blob], 'pic.jpeg', { type: blob.type });
        setFile(filesArray)
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  const share = () => {
      if (navigator.canShare && navigator.canShare({
        files: [file]
      })) {
      navigator.share({
        files: [file]
      })
    }
  }

  return (
    <div className="App" ref={container}>
      <button onClick={() => exportToPng(container.current)}>export</button>
      <Main />
      <button onClick={share}>share</button>
    </div>
  )
}

export default App
