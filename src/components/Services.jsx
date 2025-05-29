import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
import { allservices } from "../export";

export const Services = () => {
  return (
    <div id="services" className="w-full bg-white ">
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
          SPECIAL OFFER
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-black uppercase text-[40px] font-bold text-center"
        >
          OUR BEST OFFER
        </motion.h1>
        <motion.div
          variants={slideUpVariants}
          className="w-[150px] h-[6px] bg-orange-700"
        ></motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="w-full grid lg:grid-cols-2 grid-cols-1 justify-center items-start gap-[20px] mt-[30px]"
        >
          {allservices.map((item, index) => (
            <motion.div
              variants={zoomInVariants}
              key={index}
              className="flex justify-center items-center gap-5 p-8"
            >
              <img
                src={item.icon}
                alt="sevices"
                className="w-[130px] border-2 border-orange-700 duration-1000 hover:bg-orange-700 rounded-lg p-2 hover:fill-white"
              />
              <div className="flex flex-col justify-center items-start gap-3">
                <h1 className="text-xl font-bold text-black">{item.title}</h1>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
