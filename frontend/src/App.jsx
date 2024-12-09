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
          path="/login"
          element={<LandingPageWrapper element={<pages.Login />} />}
        />
        <Route
          path="/signup"
          element={<LandingPageWrapper element={<pages.Signup />} />}
        />
        <Route
          path="/*"
          element={
            <LayoutWrapper
              element={
                <Routes>
                  <Route path="/" element={<pages.Home />} />
                  <Route
                    path="/recommendation"
                    element={<pages.Recommendation />}
                  />
                  <Route path="/favorite" element={<pages.Favorite />} />
                  <Route
                    path="/restaurants"
                    element={<pages.RestaurantList />}
                  />
                  <Route
                    path="/restaurants/:id"
                    element={<pages.Restaurant />}
                  />
                  <Route path="/settings" element={<pages.Settings />} />
                  <Route path="/test"></Route>
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
