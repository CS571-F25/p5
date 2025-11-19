import { HashRouter, Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Statistics from "./pages/Statistics";
import NavBar from "./components/NavBar";
import NotesPage from "./pages/NotesPage"

export default function App() {
  return <HashRouter>
    <NavBar />
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/documents" element={<Documents />}></Route>
        <Route path="/documents/:id" element={<NotesPage />} />
        <Route path="/statistics" element={<Statistics />}></Route>
      </Routes>
    </div>
  </HashRouter>
}
