import { HashRouter, Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Statistics from "./pages/Statistics";

export default function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/documents" element={<Documents/>}></Route>
      <Route path="/statistics" element={<Statistics/>}></Route>
    </Routes>
  </HashRouter>
}
