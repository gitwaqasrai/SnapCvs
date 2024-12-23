import { useEducation } from "../../Context/EducationProvider";
import PreviewHeading from "../PreviewHeading/PreviewHeading";

const EducationPreview = () => {
  const { education } = useEducation();

  return (
    <>
      <div className="mb-4 mt-[-2px] font-serif text-left">
        <PreviewHeading previewHeading="EDUCATION" />

        {education?.map((edu, index) => (
          <div className="" key={index}>
            <div className="">
              <div className="flex items-center justify-between mt-1 mb-[2px]">
                <h3 className="text-[16px] font-semibold tracking-wide ">
                  {edu["degree"] || "Master of Computer Science"}
                  <span className="text-[15px] ">
                    , {edu["school"] || "Stanford University"}
                  </span>
                </h3>

                <p className="text-[#585555] text-[14px]">
                  {edu["startDate"] && edu["endDate"]
                    ? `${new Date(
                        edu["startDate"]
                      ).getFullYear()}  - ${new Date(
                        edu["endDate"]
                      ).getFullYear()}`
                    : "2021 - 2024"}
                </p>
              </div>
              <div className=" mt-[-3px] text-justify  text-[15px]  tracking-wide text-[#4e4c4c]">
                <p>
                  {edu["description"] ||
                    "Graduated with a strong foundation in computer science, specializing in algorithms, software development, and modern web technologies. Excelled in advanced courses and hands-on projects, showcasing expertise in building scalable and efficient front-end solutions."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationPreview;
