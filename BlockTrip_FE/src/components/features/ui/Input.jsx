const Input = ({ className, register, ...inputProps }) => {
  return (
    <input
      className={`border-b-2 border-gray text-lg ${className}`}
      {...register}
      {...inputProps}
    />
  );
};

export default Input;
