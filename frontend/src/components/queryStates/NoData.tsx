interface NoDataProps {
  message: string;
  className?: string;
}
const NoData = ({ message, className }: NoDataProps) => {
  return (
    <section className={ `w-full ${className ? className : "min-h-[400px]"}  flex flex-col items-center justify-center gap-2`}>
      <p className=" font-medium text-gray-500">{message}</p>
    </section>
  );
};

export default NoData;
