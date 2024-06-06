import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { Home } from "./components/pages/Home";
import { Travel } from "./components/pages/Travel";
import { Error } from "./components/pages/Error";
import { Loader } from "./components/features/Loader";
import { useApiInterceptor } from "./services";

function App() {
  const { isLoading, error } = useApiInterceptor();

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      {error ? (
        <Error error={error} />
      ) : (
        <Routes>
          <Route
            path={routes.home}
            element={<Home />}
            errorElement={<Error />}
          />
          <Route
            path={routes.result}
            element={<Travel />}
            errorElement={<Error />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
