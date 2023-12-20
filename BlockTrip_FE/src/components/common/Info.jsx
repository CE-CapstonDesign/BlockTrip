const Info = ({ label, children }) => {
  return (
    <div className="flex text-xl">
      <span className="font-extralight mr-10">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
};

export default Info;
