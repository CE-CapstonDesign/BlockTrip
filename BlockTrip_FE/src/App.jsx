import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { Home } from "./components/pages/Home";
import { Travel } from "./components/pages/Travel";
import { Error } from "./components/pages/Error";
import { Loader } from "./components/features/Loader";
import { useState } from "react";
import instance from "./services/index";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  instance.interceptors.request.use((config) => {
    setIsLoading(true);
    return config;
  });

  instance.interceptors.response.use(
    function (response) {
      setIsLoading(false);
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 400) {
        console.log("요청 변수 확인");
      } else if (error.response && error.response.status === 401) {
        console.log("인증 실패");
      } else if (error.response && error.response.status === 403) {
        console.log("호출 금지");
      } else if (error.response && error.response.status === 404) {
        console.log("API 없음");
      } else if (error.response && error.response.status === 405) {
        console.log("메서드 허용 안함");
      } else if (error.response && error.response.status === 500) {
        window.location.href = "/blank";
      } else {
        // 기타 에러 처리
      }
    }
  );

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.result} element={<Travel />} />
        <Route path={routes.blank} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
