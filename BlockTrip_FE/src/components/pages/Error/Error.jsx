import { Header } from "@/components/features/ui";

export const Error = ({ error }) => {
  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center w-[100vw] h-[80vh]">
        <h1 className="text-5xl mb-6">ERROR</h1>
        <p className="text-xl mb-8">
          에러가 발생했습니다. 관리자에게 문의하세요.
        </p>
        <p className="text-lg">
          에러내용: {error.message}
          <br />
          <details>
            <summary>자세한 에러 내용</summary>
            {error.response.data.error.message}
          </details>
        </p>
        <p
          className="text-green text-xl cursor-pointer mt-10"
          onClick={() => window.location.reload()}
        >
          홈으로 가기
        </p>
      </section>
    </>
  );
};
