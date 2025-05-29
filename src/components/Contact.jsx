import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
import contactLogo from "../../assets/ey.png";

export const Contact = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState("Male");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobRole: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(null);

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, DOC, and DOCX files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setSelectedFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setError(null);

    // Add validation for required fields
    if (!formData.name || !formData.email || !formData.jobRole) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("gender", gender);
      payload.append("jobRole", formData.jobRole);
      if (selectedFile) {
        payload.append("file", selectedFile);
      }

      const response = await fetch("http://localhost:3001/send", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Submission failed");
      }

      setStatus("success");
      setFormData({ name: "", email: "", jobRole: "" });
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div id="contact" className="bg-white w-full">
      <div className="lg:[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px]">
        {/* Left Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.h1
            variants={slideUpVariants}
            className="text-orange-700 text-2xl"
          ></motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-black uppercase text-[40px] font-bold"
          >
            APPLY NOW!
          </motion.h1>
          <div className="w-[150px] h-[6px] bg-orange-700"></div>
          <div className="flex justify-center items-center w-full">
            <img src={contactLogo} alt="contact logo" />
          </div>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            variants={zoomInVariants}
            className="flex flex-col justify-center items-start gap-4 w-full lg:mt-28"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
            />
            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              required
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
            >
              <option value="">Select Job Role</option>
              <option value="Mechanical Engineering">
                Mechanical Engineer
              </option>
              <option value="Electrical Engineering">
                Electrical Engineer
              </option>
              <option value="Civil Engineering">Civil Engineer</option>
            </select>
            <div className="flex gap-[5px] text-[18px]">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
                className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
              />
              <span className="mr-[10px]">Male</span>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              <span>Female</span>
            </div>
            <span className="text-[18px] mb-[-15px] mt-[5px]">
              Upload Resume:
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full mb-[20px]"
              required
            />
            <motion.button
              type="submit"
              variants={zoomInVariants}
              disabled={isSubmitting}
              className="bg-orange-700 hover:bg-orange-300 hover:text-black px-10 py-4 duration-1000 text-white font-bold rounded-lg w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </motion.button>
            {status === "success" && <p>✅ Application sent successfully!</p>}
            {status === "error" && <p>❌ {error}</p>}
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};
