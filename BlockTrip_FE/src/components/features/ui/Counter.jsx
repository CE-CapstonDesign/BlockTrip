const Counter = ({
  section,
  description,
  name,
  min,
  max,
  value,
  onNumberChange,
}) => {
  const BUTTON = `rounded-full border-2 border-green text-green w-5 h-5 flex items-center justify-center hover:text-white hover:border-green hover:bg-green`;

  const handleOnMinus = () => {
    if (value > min) {
      onNumberChange(value - 1);
    }
  };

  const handleOnPlus = () => {
    if (value < max) {
      onNumberChange(value + 1);
    }
  };

  return (
    <div className="flex items-center mb-10 space-x-8">
      {section && (
        <div className="flex flex-col">
          <p>{section}</p>
          <p className="text-gray text-sm">{description}</p>
        </div>
      )}

      <div className="text-xl flex items-center space-x-4">
        <button type="button" onClick={handleOnMinus} className={`${BUTTON}`}>
          -
        </button>
        <input type="text" name={name} readOnly className="w-3" value={value} />
        <button onClick={handleOnPlus} className={`${BUTTON}`}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
