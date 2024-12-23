import "./App.css";
import { EducationProvider } from "./Components/Context/EducationProvider";
import { ExperienceProvider } from "./Components/Context/ExperienceProvider";
import { PersonalInfoProvider } from "./Components/Context/PersonalInfoProvider";
import { ProjectProvider } from "./Components/Context/ProjectProvider";
import { SkillsProvider } from "./Components/Context/SkillsProvider";
import { SummaryProvider } from "./Components/Context/SummaryProvider";
import CvBuilder from "./Components/CvBuilder/CvBuilder";
import Header from "./Components/Header/Header";
function App() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[82%] text-center ">
          <Header />
          <PersonalInfoProvider>
            <SummaryProvider>
              <EducationProvider>
                <SkillsProvider>
                  <ExperienceProvider>
                    <ProjectProvider>
                      <CvBuilder />
                    </ProjectProvider>
                  </ExperienceProvider>
                </SkillsProvider>
              </EducationProvider>
            </SummaryProvider>
          </PersonalInfoProvider>
        </div>
      </div>
      <div className="bg-blue-500 p-1 pt-2 text-[13px] text-center text-white mt-3">
        💻 Powered by Waqas Rai 🚀
        <div className="flex justify-center items-center gap-3 pt-2 pb-[10px]">
          <a
            className="hover:text-blue-800"
            target="_blank"
            href="https://github.com/gitwaqasrai"
          >
            GitHub
          </a>
          <a
            className="hover:text-blue-800"
            target="_blank"
            href="https://www.linkedin.com/in/waqas-rai/"
          >
            Linkedin
          </a>
          <a
            className="hover:text-blue-800"
            target="_blank"
            href="https://www.instagram.com/code_withwaqas/"
          >
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
