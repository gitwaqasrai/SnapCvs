import { useSkills } from "../../Context/SkillsProvider";
import PreviewHeading from "../PreviewHeading/PreviewHeading";

const SkillsPreview = () => {
  const { skillSections } = useSkills();

  // Example content shown initially
  const exampleData = [
    {
      id: 1,
      title: "Front-end Developer",
      skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Back-end Developer",
      skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
    },
    {
      id: 3,
      title: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    },
  ];

  const dataToRender = skillSections.length > 0 ? skillSections : exampleData;

  return (
    <div className="mb-4 mt-[-2px] font-serif text-left">
      <PreviewHeading previewHeading="SKILLS" />

      {dataToRender.map((section) => (
        <div key={section.id} className="mb-1">
          {section.title && (
            <h3 className="font-semibold text-[#1E2532] mb-1">
              {section.title}
            </h3>
          )}
          {section.skills.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {section.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills in this section</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsPreview;
