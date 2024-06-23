const Flight = ({ data }) => {
  return (
    <div>
      <article className="flex items-baseline">
        <p className="text-neutral-500 text-3xl mb-10">항공권 정보</p>
        <span className="text-xl ml-8 text-gray">
          <a
            href="https://kr.trip.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            -&gt; 예약하러 가기
          </a>
        </span>
      </article>
      <div className="flex gap-32">
        {data.map((x, i) => (
          <div className="flex flex-col text-xl" key={i}>
            <p className="text-2xl mb-6">{x.departDate}</p>
            <div className="[&_div]:leading-10 flex">
              <div className="text-neutral-500">
                <p>항공사</p>
                <p>가격</p>
                <p>출발시간</p>
                <p>도착시간</p>
                <p>소요시간</p>
              </div>
              <div className="ml-20">
                <p>{x.flightname}</p>
                <p>{x.price}</p>
                <p>{x.depart}</p>
                <p>{x.arrive}</p>
                <p>{x.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flight;
