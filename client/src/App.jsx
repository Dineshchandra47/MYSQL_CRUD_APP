import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Update } from "./Pages/Update";
import { Books } from "./Pages/Books";
import { Add } from "./Pages/Add";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books/>} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
