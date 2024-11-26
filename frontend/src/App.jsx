import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<pages.Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
