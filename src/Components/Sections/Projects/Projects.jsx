import Heading from "../Heading/Heading";
import { IoMdAdd } from "react-icons/io";
import ProjectItem from "./ProjectItem";
import { useProject } from "../../Context/ProjectProvider";

const Projects = () => {
  const { project, setProject } = useProject();

  const handleAddNew = () => {
    setProject((prevProject) => [
      ...prevProject,
      {
        "job-title": "",
        description: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    setProject((prevProject) => prevProject.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="">
        <Heading heading="Projects" />
        <div className="text-left mt-[-25px]">
          <p className="text-[#828BA2] ml-6 text-[16px] leading-6 mt-[-28px] mb-[20px]">
            Showcase your proudest projects! Add a title and description to
            highlight your skills, creativity, and achievements in a way that
            stands out to recruiters.
          </p>
          {project.map((entry, index) => (
            <ProjectItem key={index} index={index} onDelete={handleDelete} />
          ))}

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2  text-[15px] font-medium text-[#1A91F0] cursor-pointer mt-3 ml-7"
          >
            <IoMdAdd className="font-semibold" />
            Add one more project
          </button>
        </div>
      </div>
    </>
  );
};

export default Projects;
