import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

import RecordState from "./context/record/state";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import { Login } from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";

export default function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <RecordState>
      <Router>
        <NavBar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/login" element={<Login showAlert={showAlert} />} /> 
            <Route path="/signup" element={<Signup showAlert={showAlert} />} /> 
          </Routes>
        </div>
      </Router>
    </RecordState>
  );
}
