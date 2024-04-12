export const SelectInput = ({
  name,
  id,
  selected,
  list,
  register,
  onChange,
  setDefault = false,
}) => {
  return (
    <select
      name={name}
      id={id}
      required
      defaultValue={selected}
      onChange={onChange}
      {...register}
      className="border-b-2 border-gray w-[15rem] text-lg"
    >
      {setDefault && <option value="none">선택</option>}
      {list?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
