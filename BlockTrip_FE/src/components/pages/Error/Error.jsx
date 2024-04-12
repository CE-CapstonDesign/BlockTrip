import { Header } from "@/components/features/ui";
import { useNavigate } from "react-router-dom";

export const Error = ({ error }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center w-[100vw] h-[80vh]">
        <h1 className="text-5xl mb-6">ERROR</h1>
        <p className="text-xl">에러가 발생했습니다. 관리자에게 문의하세요.</p>
        <p className="text-sm">에러내용: {error}</p>
        <p
          className="text-green text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          홈으로 가기
        </p>
      </section>
    </>
  );
};
