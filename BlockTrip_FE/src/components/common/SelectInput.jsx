const SelectInput = ({ name, id, selected, list, register }) => {
  return (
    <select
      name={name}
      id={id}
      required
      defaultValue={selected}
      {...register}
      className="border-b-2 border-gray w-[15rem] text-lg"
    >
      {list?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
