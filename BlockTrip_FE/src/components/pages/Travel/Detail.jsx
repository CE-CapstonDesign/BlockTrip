const Detail = ({ data }) => {
  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-10">여행 장소 상세</p>
      <div className="flex text-xl">
        <div className="leading-10">
          {data?.map((el) => {
            return el.map((x) => {
              return (
                <div key={x.id} className="mb-10">
                  <div>
                    <span className="text-neutral-500 mr-10">장소</span>
                    <span>{x.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 mr-10">위치</span>
                    <span>
                      {x.latitude} {x.longitude}
                    </span>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
