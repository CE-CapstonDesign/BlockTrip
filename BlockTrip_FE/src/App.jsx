import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "./routes";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import Blank from "./pages/Blank";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.result} element={<Travel />} />
        <Route path={routes.blank} element={<Blank />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
