import { useSummary } from "../../Context/SummaryProvider";
import PreviewHeading from "../PreviewHeading/PreviewHeading";

const SummaryPreview = () => {
  const { summary } = useSummary();

  return (
    <>
      <div className="my-4 font-serif text-left">
        <PreviewHeading previewHeading="OBJECTIVE" />

        <p className="pt-[6px] text-justify  text-[15px] text-[#4e4c4c]">
          {summary}
        </p>
      </div>
    </>
  );
};

export default SummaryPreview;
