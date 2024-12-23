import Heading from "../Heading/Heading";
import { IoMdAdd } from "react-icons/io";
import EducationItem from "./EducationItem";
import { useEducation } from "../../Context/EducationProvider";

const Education = () => {
  const { education, setEducation } = useEducation();

  const handleAddNew = () => {
    setEducation((prevEducation) => [
      ...prevEducation,
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    setEducation((prevEducation) =>
      prevEducation.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Heading heading="Education" />
      <div className="">
        <div className="text-left mt-[-25px]">
          <p className="text-[#828BA2] ml-6 text-[16px] leading-6 mt-[-28px] mb-[20px]">
            A varied education on your resume sums up the value that your
            learnings and background will bring to job.
          </p>
          {education.map((entry, index) => (
            <EducationItem
              key={index}
              index={index}
              onDelete={() => handleDelete(index)}
            />
          ))}
          <div className="">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2  text-[15px] font-medium text-[#1A91F0] cursor-pointer mt-3 ml-7"
            >
              <IoMdAdd className="font-semibold" />
              Add one more education
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
