import { useProject } from "../../Context/ProjectProvider";
import PreviewHeading from "../PreviewHeading/PreviewHeading";

const ProjectPreview = () => {
  const { project } = useProject();

  return (
    <>
      <div className="mb-4 mt-[-2px] font-serif text-left">
        <PreviewHeading previewHeading="PROJECTS" />
        {project.map((pro, index) => (
          <div
            className="text-justify  mt-1 text-[14px]  tracking-wide"
            key={index}
          >
            <p>
              <span className="font-semibold text-black">
                {`${pro["project-title"]}  : `}
              </span>
              <span className=" text-[#4e4c4c] ">{pro["description"]}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectPreview;
