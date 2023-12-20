const ToggleBtn = ({ value, onChange, checked, name }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer mt-2 ml-6">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        name={name}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:peer-focus:ring-green dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green"></div>
      <input
        readOnly
        type="text"
        value={value}
        className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300"
      />
    </label>
  );
};

export default ToggleBtn;
