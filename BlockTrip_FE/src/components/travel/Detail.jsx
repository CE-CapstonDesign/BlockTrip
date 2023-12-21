import { useQuery } from "@tanstack/react-query";
import { geocode } from "../../services/travel";

const Detail = ({ data }) => {
  const latitude = data.flatMap((x) => x.map((x) => [x.latitude, x.longitude]));
  // const longitude = data.flatMap((x) => x.map((x) => x.longitude));
  // geocode({ latitude: latitude[0][0], longitude: latitude[0][1] })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  // const { data: lat } = useQuery({
  //   queryKey: ["latitude", { latitude, longitude }],
  //   queryFn: () => geocode({ latitude, longitude }),
  // });
  // console.log(lat);

  return (
    <div className="py-12 px-24">
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
