import logo from "/logo-green.png";

const Blank = () => {
  const goHome = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className="p-12">
        <img src={logo} className="w-40 cursor-pointer" onClick={goHome} />
      </div>
      <div className="flex flex-col justify-center items-center w-[100vw] h-[80vh]">
        <div className="text-5xl mb-10">ERROR</div>
        <div className="text-xl">
          요청이 잘못 되었습니다. 다시 입력해주세요.
        </div>
        <div
          className="text-green mt-2 text-xl cursor-pointer"
          onClick={goHome}
        >
          홈으로 가기
        </div>
      </div>
    </>
  );
};

export default Blank;
