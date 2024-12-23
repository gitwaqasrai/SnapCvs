/* eslint-disable react/prop-types */

import "../../assets/fonts/BodoniOldFaceBQ-Regular-normal.js";
import SummaryPreview from "../PreviewSections/SummaryPreview/SummaryPreview.jsx";
import PersonalInfoPreview from "../PreviewSections/PersonalInfoPreview/PersonalInfoPreview.jsx";
import EducationPreview from "../PreviewSections/EducationPreview/EducationPreview.jsx";
import SkillsPreview from "../PreviewSections/SkillsPreview/SkillsPreview.jsx";
import ExperiencePreview from "../PreviewSections/ExperiencePreview/ExperiencePreview.jsx";
import ProjectPreview from "../PreviewSections/ProjectPreview/ProjectPreview.jsx";

const CvPreview = ({ onBackToEdit }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex items-center justify-center py-8 px-4 border-2 border-blue-500 shadow-lg rounded-lg bg-white no-print">
        <div className="w-[90%] text-center bg-white p-2 border border-gray-300 print-content">
          <PersonalInfoPreview />
          <div className="px-4">
            <SummaryPreview />
            <EducationPreview />
            <SkillsPreview />
            <ExperiencePreview />
            <ProjectPreview />
          </div>
        </div>
      </div>

      <div className="text-center mt-6 no-print">
        <button
          onClick={onBackToEdit}
          className="mr-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default CvPreview;
