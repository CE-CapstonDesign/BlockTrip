export const PlaceInfo = ({ id, data, children }) => {
  return (
    data && (
      <div className="flex text-lg">
        <p className="text-neutral-500 w-28">{children}</p>
        {Array.isArray(data) ? (
          <div>
            {data.map((item, index) => (
              <div key={index}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {id === "link" ? (
              <a href={data} target="_blank" rel="noreferrer">
                {data}
              </a>
            ) : (
              <p className="w-[50rem]">{data}</p>
            )}
          </div>
        )}
      </div>
    )
  );
};
