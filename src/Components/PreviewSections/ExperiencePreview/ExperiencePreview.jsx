import { useExperience } from "../../Context/ExperienceProvider";
import PreviewHeading from "../PreviewHeading/PreviewHeading";

const ExperiencePreview = () => {
  const { experiences } = useExperience();

  return (
    <>
      <div className="mb-4 mt-[-2px] font-serif text-left">
        <PreviewHeading previewHeading="EXPERIENCE" />

        {experiences.map((exp, index) => (
          <div className="" key={index}>
            <div className="">
              <div className="flex items-center justify-between font-semibold mt-[2px] text-[16px] mb-[-2px]">
                <div className="">{exp["job-title"] || "Role Name"}</div>
                <div className="text-[15px] font-medium">
                  <p className="  ">
                    {exp["startDate"]
                      ? new Date(exp["startDate"]).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        }) +
                        (exp["endDate"]
                          ? " - " +
                            new Date(exp["endDate"]).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "")
                      : "Jan 2017 - Jan 2019"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="">{exp["employer"] || "Company Name"}</div>
                <div className="text-[15px] font-medium">
                  {exp["city"] || "San Francisco, CA"}
                </div>
              </div>
              <div className="text-justify  mt-1 text-[14px]  tracking-wide text-[#4e4c4c]">
                <p>
                  {exp["description"] ||
                    "Collaborated with a world-class team to design and implement responsive, user-centric web applications. Specialized in creating dynamic interfaces using React, Next.js, and Tailwind CSS, optimizing performance and accessibility. Contributed to innovative projects, adhering to Google's high standards of coding and design excellence."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperiencePreview;
