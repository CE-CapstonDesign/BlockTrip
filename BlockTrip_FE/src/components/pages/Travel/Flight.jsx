const Flight = ({ data }) => {
  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-10">항공권 정보</p>
      <div className="flex">
        <div className="flex text-xl mr-44">
          <div className="text-neutral-500 leading-10">
            <p className="text-black text-2xl mb-2">{data[0].departDate}</p>
            <p>항공사</p>
            <p>가격</p>
            <p>출발시간</p>
            <p>도착시간</p>
            <p>소요시간</p>
          </div>
          <div className="ml-10 leading-10 mt-10">
            <p>{data[0].flightname}</p>
            <p>{data[0].price}</p>
            <p>{data[0].depart}</p>
            <p>{data[0].arrive}</p>
            <p>{data[0].duration}</p>
          </div>
        </div>
        <div className="flex text-xl">
          <div className="text-neutral-500 leading-10">
            <p className="text-black text-2xl mb-2">{data[1].departDate}</p>
            <p>항공사</p>
            <p>가격</p>
            <p>출발시간</p>
            <p>도착시간</p>
            <p>소요시간</p>
          </div>
          <div className="ml-10 leading-10 mt-10">
            <p>{data[1].flightname}</p>
            <p>{data[1].price}</p>
            <p>{data[1].depart}</p>
            <p>{data[1].arrive}</p>
            <p>{data[1].duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
