/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useExperience } from "../../Context/ExperienceProvider";

const ExperienceItem = ({ index, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { experiences, setExperiences } = useExperience();
  const dropdownRef = useRef(null);
  const threeDotRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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

  const confirmDelete = () => {
    setShowDeleteModal(true);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    if (onDelete) onDelete();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleChange = (field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setExperiences(updatedExperiences);
  };

  return (
    <>
      <div className="mt-6 flex w-full items-center justify-between">
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
                {experiences[index]["job-title"]
                  ? `${experiences[index]["job-title"]} at ${experiences[index]["employer"]}`
                  : "(Not Specified)"}
              </h2>
              <p className="text-[#828BA2] mt-[-1px] text-[14px]  ">
                {experiences[index]["startDate"]
                  ? new Date(
                      experiences[index]["startDate"]
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    }) +
                    (experiences[index]["endDate"]
                      ? " - " +
                        new Date(
                          experiences[index]["endDate"]
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "")
                  : ""}
              </p>
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
                    onClick={confirmDelete}
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
            <div className="select-none">
              <div className="flex items-center mt-3 w-full gap-6">
                <div className="w-[50%] flex flex-col items-start">
                  <label
                    htmlFor="job-title"
                    className="mb-2 text-[#828BA2] text-[13px] tracking-wide "
                  >
                    Job title
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      autoComplete="false"
                      id="job-title"
                      value={experiences[index]["job-title"]}
                      onChange={(e) =>
                        handleChange("job-title", e.target.value)
                      }
                      className="peer exper-input-field"
                      name="job-title"
                      required
                    />
                    <div className="input-border"></div>
                  </div>
                </div>
                <div className="w-[50%]   flex flex-col items-start">
                  <label
                    htmlFor="first-name"
                    className="mb-2 text-[#828BA2] text-[13px] tracking-wide "
                  >
                    Employer
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      autoComplete="false"
                      id="employer"
                      className="peer exper-input-field"
                      value={experiences[index]["employer"]}
                      onChange={(e) => handleChange("employer", e.target.value)}
                      required
                      name="employer"
                    />
                    <div className="input-border"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center  my-6  w-full gap-6">
                {/* Start & End Date Column */}
                <div className="w-[50%] flex flex-col items-start">
                  <label
                    htmlFor="start-date"
                    className="mb-2 text-[#828BA2] text-[13px] tracking-wide"
                  >
                    Start & End Date
                  </label>
                  <div className="flex items-center gap-4 w-full">
                    <div className="relative w-[50%]">
                      <input
                        type="date"
                        id="start-date"
                        className="peer exper-input-field"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => {
                          const date = e.target.value;
                          setStartDate(date);
                          handleChange("startDate", date);
                        }}
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                    <div className="relative w-[50%]">
                      <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => {
                          const date = e.target.value;
                          setEndDate(date);
                          handleChange("endDate", date);
                        }}
                        className="peer exper-input-field"
                        name="endDate"
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                  </div>
                </div>

                {/* City Column */}
                <div className="w-[50%] flex flex-col items-start">
                  <label
                    htmlFor="city"
                    className="mb-2 text-[#828BA2] text-[13px] tracking-wide"
                  >
                    City
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="city"
                      className="peer exper-input-field"
                      name="city"
                      value={experiences[index]["city"]}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                    />
                    <div className="input-border"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center  my-6 ">
                {/* Start & End Date Column */}
                <div className="w-[100%] flex flex-col items-start">
                  <label
                    htmlFor="description"
                    className="mb-2 text-[#828BA2] text-[13px] tracking-wide"
                  >
                    Description
                  </label>
                  <div className="w-full h-full pb-2">
                    <div className="relative">
                      <textarea
                        name="description"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={experiences[index]["description"]}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        id=""
                        className="w-full h-[300px] mt-3 border-none resize-none outline-none bg-[#eff2f9] py-4 px-4 rounded-md "
                      ></textarea>
                      <span
                        className={`absolute left-0 bottom-[5px] h-[2px] transition-all duration-500 ease-in-out ${
                          isFocused
                            ? "w-full bg-[#1d4ed8]"
                            : "w-0 bg-transparent"
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-[400px] text-center shadow-lg">
            <h2 className="text-[18px] font-semibold text-[#1E2532]">
              Delete Entry
            </h2>
            <p className="text-[#828BA2] mt-2">
              Are you sure you want to delete this entry?
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceItem;
