import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import pages from "./pages";
import LayoutWrapper from "./components/wrappers/LayoutWrapper";
import LandingPageWrapper from "./components/wrappers/LandingPageWrapper";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/guest"
          element={
            <LandingPageWrapper
              element={
                <Routes>
                  <Route path="/guest/login" element={<pages.Login />} />
                  <Route path="/guest/signup" element={<pages.Signup />} />
                </Routes>
              }
            />
          }
        />
        <Route
          path="/"
          element={
            <LayoutWrapper
              element={
                <Routes>
                  <Route path="/" element={<pages.Home />} />
                  <Route
                    path="/recommendation"
                    element={<pages.Recommendation />}
                  />
                  <Route path="/test">
                    <Route
                      path="/test/restaurant"
                      element={<pages.Restaurant />}
                    />
                  </Route>
                </Routes>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
