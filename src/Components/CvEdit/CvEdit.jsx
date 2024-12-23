/* eslint-disable react/prop-types */
import Education from "../Sections/Education/Education";
import Experience from "../Sections/Experience/Experience";
import PersonalInfo from "../Sections/PersonalInfo/PersonalInfo";
import Projects from "../Sections/Projects/Projects";
import Skills from "../Sections/Skills/Skills";
import Summary from "../Sections/Summary/Summary";

const CvEdit = ({ onPreview }) => {
  return (
    <>
      <PersonalInfo />
      <Summary />
      <Education />
      <Skills />
      <Experience />
      <Projects />

      <button
        onClick={onPreview}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Preview
      </button>
    </>
  );
};

export default CvEdit;
