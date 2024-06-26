interface NoDataProps {
  message: string;
}
const NoData = ({ message }: NoDataProps) => {
  return (
    <section className=" w-full min-h-[400px] flex flex-col items-center justify-center gap-2">
      <p className=" font-medium text-gray-500">{message}</p>
    </section>
  );
};

export default NoData;
