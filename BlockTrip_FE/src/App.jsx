import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "./routes";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
