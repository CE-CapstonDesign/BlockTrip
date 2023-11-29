const SelectInput = ({ name, id, selected, list }) => {
  return (
    <select
      name={name}
      id={id}
      required
      defaultValue={selected}
      className="border-b-2 border-gray w-[15rem]"
    >
      <option value="default" disabled>
        카테고리를 선택하세요.
      </option>
      {list?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
