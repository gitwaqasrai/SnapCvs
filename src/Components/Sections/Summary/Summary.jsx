import { useState } from "react";
import Heading from "../Heading/Heading";
import { useSummary } from "../../Context/SummaryProvider";

const Summary = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { summary, setSummary } = useSummary();

  // Handle textarea change
  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  // Handle focus state
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full">
      <Heading heading="Professional Summary" />
      <div className="text-start">
        <p className="text-[#828BA2] text-[16px] leading-6 mt-[-28px] mb-[20px]">
          Write 2-4 short, energetic sentences about how great you are. Mention
          the role and what you did. What were the big achievements? Describe
          your motivation and list your skills.
        </p>

        <div className="relative">
          <textarea
            name="description"
            value={summary}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full caret-[#1d4ed8] h-[250px] mt-3 border-none resize-none outline-none bg-[#eff2f9] py-4 px-4 rounded-md"
          ></textarea>
          <span
            className={`absolute left-0 bottom-[5px] h-[2px] transition-all duration-500 ease-in-out ${
              isFocused ? "w-full bg-[#1d4ed8]" : "w-0 bg-transparent"
            }`}
          ></span>
        </div>

        <div className="flex justify-between items-center mt-2 text-sm text-[#828BA2]">
          <span>
            Recruiter tip: write 400-600 characters to increase interview
            chances
          </span>
          <span>{summary.length} / 400+</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
