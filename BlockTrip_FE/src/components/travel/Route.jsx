const Route = ({ data }) => {
  return (
    <div className="py-12 px-24">
      <p className="text-neutral-500 text-3xl mb-10">여행 계획 안내</p>
      <div className="flex text-xl">
        <div className="text-neutral-500 leading-10">
          <p>숙소 이름</p>
          <p>숙소 위치</p>
          <p>가격</p>
        </div>
        <div className="ml-10 leading-10">
          <p>{data.hotel.name}</p>
          <p>{data.hotel.latitude}</p>
          <p>{data.hotel.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Route;
