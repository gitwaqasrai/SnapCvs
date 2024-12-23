import { useExperience } from "../../Context/ExperienceProvider";
import Heading from "../Heading/Heading";
import ExperienceItem from "./ExperienceItem";
import { IoMdAdd } from "react-icons/io";

const Experience = () => {
  const { experiences, setExperiences } = useExperience();

  const handleAddNew = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        "job-title": "",
        employer: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Heading heading="Employment History" />
      <div className="">
        <div className="text-left mt-[-25px]">
          <p className="text-[#828BA2] ml-6 text-[16px] leading-6 mt-[-28px] mb-[20px]">
            Show your relevant experience (last 10 years). Use bullet points to
            note your achievements, if possible - use numbers/facts (Achieved X,
            measured by Y, by doing Z).
          </p>
          {experiences.map((entry, index) => (
            <ExperienceItem
              key={index}
              index={index}
              onDelete={() => handleDelete(index)}
            />
          ))}
          <div className="">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 text-[15px] font-medium text-[#1A91F0] cursor-pointer mt-3 ml-7"
            >
              <IoMdAdd className="font-semibold" />
              Add one more employment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
