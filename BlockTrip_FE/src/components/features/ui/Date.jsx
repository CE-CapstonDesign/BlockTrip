import { Button } from "./Button";

export const Date = ({ data, filter, onClick }) => {
  return (
    <>
      <p className="text-xl mt-8">여행일자</p>
      {Array.from({ length: data?.length }, (_, i) => (
        <Button key={i} onClick={() => onClick(i)} active={filter === i}>
          {i + 1}일차
        </Button>
      ))}
    </>
  );
};
