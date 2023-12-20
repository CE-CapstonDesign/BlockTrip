import { Wrapper } from "@googlemaps/react-wrapper";

const Hotel = ({ data }) => {
  const hotel = data.name;

  return (
    <div className="py-12 px-24">
      <p className="text-neutral-500 text-3xl mb-8">숙박 정보</p>
      <div className="flex text-xl">
        <div className="text-neutral-500 leading-10">
          <p>숙소 이름</p>
          <p>숙소 위치</p>
          <p>가격</p>
        </div>
        <div className="ml-10 leading-10">
          <p>{data.name}</p>
          <p>
            {`${data.latitude}
            ${data.longitude}`}
          </p>
          <p>{data.price}</p>
        </div>
      </div>
      <Wrapper>
        <iframe
          className="mt-4"
          width="1000px"
          height="300px"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            import.meta.env.VITE_GOOGLE_KEY
          }&q=${hotel}&zoom=12`}
        />
      </Wrapper>
    </div>
  );
};

export default Hotel;
