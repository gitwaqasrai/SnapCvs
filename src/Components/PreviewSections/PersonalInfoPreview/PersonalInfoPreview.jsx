import { usePersonalInfo } from "../../Context/PersonalInfoProvider";

const PersonalInfoPreview = () => {
  const { formData } = usePersonalInfo();

  const firstName = formData.firstName || "FIRSTNAME";
  const lastName = formData.lastName || "LASTNAME";
  const phone = formData.phone || "+92 302 047 0251";
  const city = formData.city || "Okara";
  const country = formData.country || "Pakistan";
  const email = formData.email || "contact@snapcvs.com";
  const linkedin = formData.linkedin || "waqas-rai";
  const website = formData.website || "waqas-seven.vercel.app";

  return (
    <>
      <div className="">
        <h2 className="text-[28px] font-bodoni flex items-center justify-center  font-medium">
          {`${firstName} ${lastName}`}
        </h2>
      </div>
      <div className="text-[15px] text-[#1b1a1aec]  font-bodoni font-thin flex items-center justify-center gap-1">
        <div className="">{phone}</div>
        <div className="">⋄ {`${city}, ${country}`}</div>
      </div>
      <div className="flex text-[14px] items-center font-bodoni font-thin  justify-center gap-3">
        <div className="">
          <a
            className="text-blue-700"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            E-Mail
          </a>
        </div>

        <div className="">
          {`⋄  `}
          <a
            href={`https://www.linkedin.com/in/${linkedin}/`}
            className="text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </div>
        <div className="">
          {`⋄  `}
          <a
            href={`https://${website}`}
            className="text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoPreview;
