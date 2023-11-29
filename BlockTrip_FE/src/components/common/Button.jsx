const Button = ({ children }) => {
  return (
    <button className="rounded-lg border-2 border-gray text-gray max-w-2xl px-4 py-[0.2rem] my-2 mr-2">
      {children}
    </button>
  );
};

export default Button;
