import Login from "./components/SignUp";
import Profile from "./components/profile";
import Signup from "./components/signIn";
import Short from "./components/short";
import Landing from "./components/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Routs() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/home" element={<Short />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
}
