import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import your route components too
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert message="This is an alert" />
          <div className="container my-2 py-2">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
