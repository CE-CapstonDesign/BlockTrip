const Input = ({ className, register, ...inputProps }) => {
  return (
    <input
      autoFocus
      className={`border-b-2 border-gray text-lg focus:outline-none ${className}`}
      {...register}
      {...inputProps}
    />
  );
};

export default Input;
