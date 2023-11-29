const Input = ({ className, register, ...inputProps }) => {
  return (
    <input
      className={`border-b-2 border-gray ${className}`}
      {...register}
      {...inputProps}
    />
  );
};

export default Input;
