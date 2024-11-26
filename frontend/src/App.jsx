import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<pages.Home />} />
        <Route path="/login" element={<pages.Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
