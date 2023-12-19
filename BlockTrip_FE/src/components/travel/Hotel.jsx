const Hotel = ({ data }) => {
  return (
    <div className="py-12 px-24">
      <p className="text-neutral-500 text-3xl mb-10">숙박 정보</p>
      <div className="flex text-xl">
        <div className="text-neutral-500 leading-10">
          <p>숙소 이름</p>
          <p>숙소 위치</p>
          <p>가격</p>
        </div>
        <div className="ml-10 leading-10">
          <p>{data.hotel.name}</p>
          <p>
            {data.hotel.latitude}
            {data.hotel.longitude}
          </p>
          <p>{data.hotel.price}</p>
        </div>
      </div>
      <div className="mt-5 w-[55rem] h-[13rem] bg-slate-400"></div>
    </div>
  );
};

export default Hotel;
