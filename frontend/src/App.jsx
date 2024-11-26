import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import pages from "./pages";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 sidebar">
              <Sidebar/>
            </div>

            <div className="col-10">
            <Routes>
              <Route path="/" element={<pages.Home />} />
              <Route path="/login" element={<pages.Login />} />
            </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
