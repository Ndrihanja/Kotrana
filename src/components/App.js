import "../App.css";
import { BrowserRouter, Route, Link, Navigate, Routes } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Home from "./Home";
import About from "./About";
import Blog from "./Blog";
import { useState } from "react";
import React from "react";

function App() {
  const commands = [
    {
      command: ["Go to *", "Open *", "Va dans *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    { commands }
  );
  const [redirectUrl, setRedirectUrl] = useState("");

  const pages = ["home", "about", "blog"];

  const urls = {
    home: "/",
    about: "/about",
    blog: "/blog",
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Navigate to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}!</p>;
    }
  }

  console.log("redirectUrl : ", redirectUrl);
  return (
    <div className="App">
      <BrowserRouter>
        <div id="links" className="links-navigation">
          <div>
            <img src="" alt="Logo" />
          </div>
          <div className="route">
            <Link to="/">Acceuil</Link>
            <Link to="/about">A propos</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/blog" exact element={<Blog />} />
        </Routes>
        {redirect}
      </BrowserRouter>

      <button onClick={SpeechRecognition.startListening}>Start</button>
      <p id="transcript">Transcript: {transcript}</p>
    </div>
  );
}

export default App;
