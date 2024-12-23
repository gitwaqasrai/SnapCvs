/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const SkillItem = ({
  section,
  onTitleChange,
  onAddSkill,
  onRemoveSkill,
  onRemoveSection,
}) => {
  const [currentSkill, setCurrentSkill] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const dropdownRef = useRef(null);
  const threeDotRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      threeDotRef.current &&
      !threeDotRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
    setIsDropdownOpen(false);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      // Prevent adding duplicate skills
      if (!section.skills.includes(currentSkill.trim())) {
        onAddSkill(currentSkill);
        setCurrentSkill("");
      }
    }
  };

  return (
    <>
      {/* First  */}
      <div className="mt-6 select-none flex w-full items-center justify-between">
        <div className="w-[3%] group">
          <RxDragHandleDots2 className="text-[20px] text-[#9FA8BB] group-hover:text-[#1A91F0] transition-colors duration-200" />
        </div>
        <div className="w-[97%] border-[1px] rounded-[3px] border-[#E7EAFA] pt-3 pb-2 px-4 ">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer flex items-center justify-between relative"
          >
            <div>
              <h2 className="font-poppins text-[14px] font-semibold text-[#1E2532] hover:text-[#1A91F0] transition-colors duration-200">
                {section.title || "(Not Specified)"}
              </h2>
            </div>
            <div className="relative flex items-center gap-2 text-[20px]">
              <BsThreeDots
                ref={threeDotRef}
                className="text-[#9FA8BB] cursor-pointer hover:text-[#1A91F0] transition-colors duration-200"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute bottom-[54px] right-[-18px] cursor-pointer text-[#1E3532] font-medium bg-white text-[15px] w-[180px] py-4 px-3 rounded-sm shadow-lg text-left z-10 animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p
                    onClick={handleEdit}
                    className="flex items-center gap-2 mb-2 hover:bg-[#F0F4FF] p-1 rounded-sm transition-colors duration-200 group"
                  >
                    <MdEdit className="text-[#1A91F0] text-[19px] group-hover:scale-110 transition-transform duration-200" />
                    Edit
                  </p>
                  <p
                    onClick={onRemoveSection}
                    className="flex items-center gap-2 hover:bg-[#F0F4FF] p-1 rounded-sm transition-colors duration-200 group"
                  >
                    <RiDeleteBin5Line className="text-[#1A91F0] text-[19px] group-hover:scale-110 transition-transform duration-200" />
                    Delete
                  </p>
                </div>
              )}
              <RiArrowDropDownLine
                onClick={toggleExpand}
                className="text-[30px] text-[#9FA8BB] hover:text-[#1A91F0] cursor-pointer  transform rotate-0 transition-transform duration-200 ease-in-out"
                style={{
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? "max-h-[] opacity-100 mt-2"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="">
              {/* Section Title Input */}

              <div className="w-[100%] flex my-4 flex-col items-start">
                <label
                  htmlFor=""
                  className="mb-2 text-[#828BA2] text-[16px] tracking-wide "
                >
                  Skills Category
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="e.g., Front-End Development"
                    type="text"
                    autoComplete="false"
                    className="peer input-field"
                    value={section.title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
              <div className="w-[100%] flex mb-5  flex-col items-start">
                <label
                  htmlFor=""
                  className="mb-2 text-[#828BA2] text-[16px] tracking-wide "
                >
                  Enter skills
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="press Enter to add each skill"
                    autoComplete="false"
                    className="peer input-field"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              {/* Skills Badges */}
              {section.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {section.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => onRemoveSkill(skill)}
                        className="ml-2 hover:text-red-600"
                        aria-label={`Remove ${skill}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Seconde */}
    </>
  );
};

export default SkillItem;
