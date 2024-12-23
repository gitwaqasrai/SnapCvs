/* eslint-disable react/prop-types */
const Heading = ({ heading }) => {
  return (
    <div className="text-[34px] my-11 text-[#1E2532] font-extrabold tracking-wide relative">
      <span className="underline decoration-blue-500 decoration-[3px] underline-offset-[6px]">
        {heading}
      </span>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-[3px] w-[120px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2"></div>
    </div>
  );
};

export default Heading;
