import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import pages from "./pages";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<pages.Login />} />
        <Route path="/signup" element={<pages.Signup />} />
        <Route path="/" element={<pages.Home />} />
        <Route path="/recommendation" element={<pages.Recommendation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
