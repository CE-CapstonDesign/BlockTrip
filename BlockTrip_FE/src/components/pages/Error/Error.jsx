import Header from "@/components/features/ui/Header";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center w-[100vw] h-[80vh]">
        <h1 className="text-5xl mb-6">ERROR</h1>
        <p className="text-xl">요청이 잘못 되었습니다. 다시 입력해주세요.</p>
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
