export const Title = ({ children, src, alt }) => {
  return (
    <div className="flex items-center mb-10">
      <img src={src} alt={alt} className="w-[42px] mr-4" />
      <p className="text-green text-2xl font-bold">{children}</p>
    </div>
  );
};
