import { useState } from "react";
import CvEdit from "../CvEdit/CvEdit";
import CvPreview from "../CvPreview/CvPreview";

const CvBuilder = () => {
  const [isPreview, setIsPreview] = useState(false);

  const handlePreview = () => setIsPreview(true);
  const handleBackToEdit = () => setIsPreview(false);

  return (
    <>
      <div className="p-4">
        {isPreview ? (
          <CvPreview onBackToEdit={handleBackToEdit} />
        ) : (
          <CvEdit onPreview={handlePreview} />
        )}
      </div>
    </>
  );
};

export default CvBuilder;
