'use client'
import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "@/app/layout/ScrollAnimationWrapper";
import { getScrollAnimation } from "@/app/utils";
import { ImportCSV } from "..";
import csvimage from "../../assets/img/3d-file-csv-icon-illustration-png.png";
const Hero = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="about"
    >
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}>
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              Make CSV import and export a breeze with  <strong>EasyCSV</strong>.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Our platform offers the ease of swiftly importing and exporting CSV files for personal contact management. Explore the array of intriguing features we provide to enhance your contact data workflow
            </p>
            <ImportCSV />
          </div>
          <div className="flex w-full">
            <motion.div className="w-9/12 h-9/12" variants={scrollAnimation}>
              <Image
                src={csvimage}
                alt="csvimage Illustrasi"
                quality={100}
                layout="responsive"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Hero;
