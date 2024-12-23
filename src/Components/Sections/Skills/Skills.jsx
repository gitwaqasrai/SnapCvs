import { IoMdAdd } from "react-icons/io";
import SkillItem from "./SkillsItem";
import { useSkills } from "../../Context/SkillsProvider";
import Heading from "../Heading/Heading";

const Skills = () => {
  const {
    skillSections,
    addSkillSection,
    updateSkillSection,
    addSkill,
    removeSkill,
    removeSkillSection,
  } = useSkills();

  return (
    <>
      <Heading heading="Skills" />
      <div className="select-none">
        <div className="text-left mt-[-25px]">
          <p className="text-[#828BA2] ml-6 text-[16px] leading-6 mt-[-28px] mb-[25px]">
            Choose 5 important skills that show you fit the position. Make sure
            they match the key skills mentioned in the job listing (especially
            when applying via an online system).
          </p>
        </div>
      </div>

      {skillSections.map((section) => (
        <SkillItem
          key={section.id}
          section={section}
          onTitleChange={(value) =>
            updateSkillSection(section.id, "title", value)
          }
          onAddSkill={(newSkill) => addSkill(section.id, newSkill)}
          onRemoveSkill={(skillToRemove) =>
            removeSkill(section.id, skillToRemove)
          }
          onRemoveSection={() => removeSkillSection(section.id)}
          showRemoveSection={skillSections.length > 1}
        />
      ))}

      {/* Add More Skills Button */}
      <div className="text-left">
        <button
          onClick={addSkillSection}
          className="flex items-center gap-2 text-[15px] font-medium text-[#1A91F0] cursor-pointer mt-3 ml-7"
        >
          <IoMdAdd className="font-semibold" />
          Add one more skill
        </button>
      </div>
    </>
  );
};

export default Skills;
