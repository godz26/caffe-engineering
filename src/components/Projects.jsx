import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
import { projects } from "../project";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useState } from "react";

export const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const excludedTitles = [
    "JOHNDORF TOWER ",
    "SM CITY CEBU",
    "NUSTAR RESORT & CASINO",
    "MACTAN CEBU INTERNATIONAL AIRPORT",
    "LTH FOOD INDUSTRIES INC.",
    "MACTAN CEBU INTERNATIONAL AIRPORT - TERMINAL 1",
    "MACTAN CEBU INTERNATIONAL AIRPORT - TERMINAL 2",
    "CAAP ADMINISTRATION BUILDING",
    "MANDANI BAY",
    "SM SEASIDE CEBU & SAN PEDRO CALUNGOD",
    "SM SEASIDE CEBU",
    "SM CITY - CONSOLACION",
    "SM CITY BACOLOD",
    "SM SAVEMORE TACLOBAN",
    "PRIVEA HILLS || PHASE 3",
    "S HOTEL",
    "APM SHOPPING CENTER",
    "LEAR CORPORATION",
    "GOLDEN FU' S SHOPPING MALL",
    "BPSI - SAN MIGUEL CORPORATION",
  ];
  const displayedProjects = showAllProjects
    ? projects
    : projects.filter((project) => !excludedTitles.includes(project.title));

  return (
    <div id="projects" className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[80%] w-[90%] m-auto py-[60px] flex flex-col justify-between items-center gap-[20px]"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-orange-700 text-2xl"
        >
          PORTFOLIO
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-white uppercase text-[40px] font-bold text-center"
        >
          OUR BEST PROJECTS
        </motion.h1>
        <motion.div
          variants={slideUpVariants}
          className="w-[120px] h-[6px] bg-orange-700"
        ></motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="w-full m-auto grid lg:grid-cols-2 md:grid-cols-1 gap-6"
        >
          {displayedProjects.map((project, index) => (
            <div key={index} className="w-[80vw] lg:w-full mx-auto">
              <div className="ml-[5px] mb-[10px]">
                <h2 className="text-orange-400 font-bold text-xl">
                  {project.title}
                </h2>
                <p className="text-white text-sm italic">{project.location}</p>
                {project.date && (
                  <p className="text-white text-sm">{project.date}</p>
                )}
                <p className="text-white text-sm font-semibold mt-[10px]">
                  {project.scope}
                </p>
                {project.description && (
                  <div
                    className="text-white text-sm"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
              </div>

              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="w-full aspect-video rounded-lg"
              >
                {project.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full">
                      <img
                        src={img}
                        alt={`Project ${index + 1} Slide ${i + 1}`}
                        className="absolute w-full h-full object-fill rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </motion.div>

        <motion.button
          variants={zoomInVariants}
          className="bg-orange-700 hover:bg-white hover:text-black px-10 py-3 duration-1000 rounded-lg font-bold text-white"
          onClick={() => setShowAllProjects(!showAllProjects)}
        >
          {showAllProjects ? "SHOW LESS" : "SHOW MORE"}
        </motion.button>
      </motion.div>
    </div>
  );
};
