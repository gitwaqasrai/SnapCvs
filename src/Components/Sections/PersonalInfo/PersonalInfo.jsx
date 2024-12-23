import { usePersonalInfo } from "../../Context/PersonalInfoProvider";
import Heading from "../Heading/Heading";

const PersonalInfo = () => {
  const { formData, setFormData } = usePersonalInfo();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Heading heading="Personal details" />
      <div className="w-full my-6">
        <div className="flex gap-8 items-center justify-between">
          {/* First Name Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="first-name"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide "
            >
              First Name
            </label>
            <div className="relative w-full">
              <input
                type="text"
                autoComplete="off"
                id="first-name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="peer input-field"
                name="firstName"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>

          {/* Last Name Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="last-name"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              Last Name
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="last-name"
                autoComplete="off"
                value={formData.lastName}
                onChange={handleInputChange}
                className="peer input-field"
                name="lastName"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 my-8 items-center justify-between">
          {/* Email Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="Email"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              Email
            </label>
            <div className="relative w-full">
              <input
                type="email"
                id="e-mail"
                value={formData.email}
                autoComplete="off"
                onChange={handleInputChange}
                className="peer input-field"
                name="email"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>

          {/* Phone Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="phone"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              Phone
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="phone"
                autoComplete="off"
                value={formData.phone}
                onChange={handleInputChange}
                className="peer input-field"
                name="phone"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 mb-8 items-center justify-between">
          {/* Country Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="country"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              Country
            </label>
            <div className="relative w-full">
              <input
                type="country"
                autoComplete="off"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="peer input-field"
                name="country"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>

          {/* City Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="city"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              City
            </label>
            <div className="relative w-full">
              <input
                type="city"
                id="city"
                autoComplete="off"
                value={formData.city}
                onChange={handleInputChange}
                className="peer input-field"
                name="city"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-8  items-center justify-between">
          {/* Likedin Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="linkedin"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              Linkedin
            </label>
            <div className="relative w-full">
              <input
                autoComplete="off"
                type="text"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="peer input-field"
                name="linkedin"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>

          {/* Website Input */}
          <div className="w-[50%] flex flex-col items-start">
            <label
              htmlFor="website"
              className="mb-2 text-[#828BA2] text-[16px] tracking-wide"
            >
              Website
            </label>
            <div className="relative w-full">
              <input
                type="text"
                autoComplete="off"
                id="website"
                value={formData.website}
                onChange={handleInputChange}
                className="peer input-field"
                name="website"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
