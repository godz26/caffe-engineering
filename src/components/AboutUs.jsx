import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
import { useState } from "react";
import homeBg from "../../assets/wth.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWarehouse,
} from "react-icons/fa";

export const AboutUs = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const fullText = `
    CAFFE Engineering was established in October 2003. The company serves in the Design, Estimates, and Installations of Commercial and Industrial MEPF.

    CAFFE ENGINEERING’s first project was at San Miguel Corporation BPSI Plant for Contract Preventive Maintenance in Electrical and Mechanical Equipment’s and Motors. Later on the following year in Mactan Economic Zone Plant at LEAR Corporation as one of supplier/contractor in the Facilities Department.

    In 2007, Caffe Engineering entered SM Prime Holdings serving in Electrical, Mechanical, Fire Protection, and Fire Detection and Protection in the operation department.

    From 2012 to 2015, was part of the APM Mall Construction for Electrical works, Moreover, In those years, CAFFE ENGINEERING joined with other specialized service providers in construction industries in Private and Government local projects.

    Last 2015 to 2017, CAFFE ENGINEERING joined IPM Development Corporation in Aboitiz Housing Projects for Electrical and Auxiliary activities at PREVEJA Phase 2.

    From the same year 2017 to March 2020, CAFFE ENGINEERING serves at the Mactan International Airport CAAP Building and the Renovation of Terminals one and two for Electrical installations and Automation works (Fuel Hydrant).

    CAFFE ENGINEERING was affected and decided to venture out into other businesses. Hence, Easycure Construction and Supply Co. were established. At present, CAFFE ENGINEERING continues to serve at SM Prime Holdings Inc. and at Johndorf Ventures Corporation.

  `;

  const visibleText = `
    CAFFE Engineering was established in October 2003. The company serves in the Design, Estimates, and Installations of Commercial and Industrial MEPF.

    CAFFE ENGINEERING’s first project was at San Miguel Corporation BPSI Plant for Contract Preventive Maintenance in Electrical and Mechanical Equipment’s and Motors. Later on the following year in Mactan Economic Zone Plant at LEAR Corporation as one of supplier/contractor in the Facilities Department.

    In 2007, Caffe Engineering entered SM Prime Holdings serving in Electrical, Mechanical, Fire Protection, and Fire Detection and Protection in the operation department.
  `;
  return (
    <div
      className="relative lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px]"
      id="about"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6 z-10"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-orange-700 text-2xl"
        >
          WELCOME TO
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-white uppercase text-[40px] font-bold "
        >
          Caffe Engineering
        </motion.h1>
        <div className="w-full h-[6px] bg-orange-700"></div>
        <div className="w-full text-white flex flex-col">
          <h1 className=" text-[40px] font-bold mb-[10px]">
            Company Information
          </h1>
          <p className="flex items-center text-lg">
            <FaMapMarkerAlt className="mr-[15px]" />
            411 Mustang Road, Pusok, Lapu-Lapu City
          </p>
          <p className="flex items-center text-lg">
            <FaPhoneAlt className="mr-[15px]" />
            (032) 492-0171 / 0966-330-2267
          </p>
          <p className="flex items-center text-lg">
            <FaEnvelope className="mr-[15px]" />
            caffeengineering2013@gmail.com
          </p>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[70%] w-full flex flex-col justify-center items-start gap-6 mr-[20px] z-10"
      >
        <h1 className="text-white text-[40px] text-center w-full font-bold">
          COMPANY HISTORY
        </h1>
        <p className="text-white text-lg text-justify whitespace-pre-line mt-[-35px]">
          {isExpanded ? fullText : visibleText}
        </p>
        <div className="w-full flex justify-center">
          <motion.button
            variants={zoomInVariants}
            className="bg-orange-700 duration-1000 hover:bg-white hover:text-black px-10 py-3 rounded-lg font-bold text-white"
            onClick={handleToggle}
          >
            {isExpanded ? "SHOW LESS" : "READ MORE"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
