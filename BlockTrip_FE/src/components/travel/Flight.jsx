const Flight = ({ data }) => {
  return (
    <div className="py-12 px-24">
      <p className="text-neutral-500 text-3xl mb-10">항공권 정보</p>
      <div className="flex">
        <div className="flex text-xl mr-44">
          <div className="text-neutral-500 leading-10">
            <p>탑승일</p>
            <p>항공사</p>
            <p>가격</p>
            <p>출발시간</p>
            <p>도착시간</p>
            <p>소요시간</p>
          </div>
          <div className="ml-10 leading-10">
            <p>{"null"}</p>
            <p>{data.flightList[0].flightname}</p>
            <p>{data.flightList[0].price}</p>
            <p>{data.flightList[0].depart}</p>
            <p>{data.flightList[0].arrive}</p>
            <p>{data.flightList[0].duration}</p>
          </div>
        </div>
        <div className="flex text-xl">
          <div className="text-neutral-500 leading-10">
            <p>도착일</p>
            <p>항공사</p>
            <p>가격</p>
            <p>출발시간</p>
            <p>도착시간</p>
            <p>소요시간</p>
          </div>
          <div className="ml-10 leading-10">
            <p>{"null"}</p>
            <p>{data.flightList[1].flightname}</p>
            <p>{data.flightList[1].price}</p>
            <p>{data.flightList[1].depart}</p>
            <p>{data.flightList[1].arrive}</p>
            <p>{data.flightList[1].duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
