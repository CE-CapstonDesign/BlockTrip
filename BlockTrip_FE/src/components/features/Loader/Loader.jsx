import "./Loader.css";

export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <p className="mt-[15rem] text-2xl">최적의 여행 경로를 찾고 있습니다.</p>

      <div className="content">
        <svg
          version="1.1"
          id="airplane-loader"
          xmlns="http://www.w3.org/2000/svg"
          width="144"
          height="48"
          viewBox="0 0 144 48"
        >
          <path
            id="airplane-take-off"
            fill="#002F5F"
            d="M59.124,34L56,29h-4l2.947,11H89c1.657,0,3-1.343,3-3s-1.343-3-3-3H78.998L69,18h-4l4.287,16H59.124z"
          />
          <rect
            id="ground"
            x="52"
            y="44"
            fill="#002F5F"
            width="40"
            height="4"
          />
        </svg>
        <svg
          version="1.1"
          id="airplane-loader"
          xmlns="http://www.w3.org/2000/svg"
          width="144"
          height="48"
          viewBox="0 0 144 48"
        >
          <path
            id="airplane-landing"
            fill="#002F5F"
            d="M59.124,34L56,29h-4l2.947,11H89c1.657,0,3-1.343,3-3s-1.343-3-3-3H78.998L69,18h-4l4.287,16H59.124z"
          />
          <rect
            id="ground"
            x="52"
            y="44"
            fill="#002F5F"
            width="40"
            height="4"
          />
        </svg>
      </div>
    </div>
  );
};
