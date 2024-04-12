export const Label = ({ children, htmlFor, className }) => {
  return (
    <p
      className={`text-slate-500 text-xl text-bold mb-6 ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </p>
  );
};
