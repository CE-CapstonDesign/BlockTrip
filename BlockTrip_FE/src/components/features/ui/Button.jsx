export const Button = ({ children, onClick, active, register, className }) => {
  return (
    <button
      className={`rounded-lg border-2 border-gray text-gray max-w-2xl px-4 py-[0.2rem] my-2 mr-2 ${className} ${
        active
          ? "text-white bg-green border-green"
          : "hover:text-white hover:bg-green hover:border-green"
      }`}
      onClick={onClick}
      {...register}
    >
      {children}
    </button>
  );
};
