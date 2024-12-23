/* eslint-disable react/prop-types */
const PreviewHeading = ({ previewHeading }) => {
  return (
    <>
      <h1 className="text-[16px] font-bold leading-normal  tracking-wider border-b-[1px] pb-[1px] border-[#535353e0]">
        {previewHeading}
      </h1>
    </>
  );
};

export default PreviewHeading;
