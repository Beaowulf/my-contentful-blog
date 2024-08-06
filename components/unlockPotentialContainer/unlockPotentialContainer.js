"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MainButton } from "@/components/buttons";
import "./unlockPotentialContainer.css";

const UnlockPotentialContainer = ({ hasMarginTop = true }) => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  function openModal() {
    return setModalIsOpen(true);
  }

  function closeModal() {
    return setModalIsOpen(false);
  }

  return (
    <div
      className={`hidden md:block parentColoredBorderWrapper ${
        hasMarginTop ? "mt-40" : "mt-0"
      }`}
    >
      <div className="introTextBtnContainer">
        <div className="flex items-center flex-col lg:flex-row gap-8 lg:gap-0 justify-between lg:px-12 lg:py-8 px-6 py-4 w-full">
          <h5 className="md:text-[20px] 2xl:text-[25px] unlockPotentialTypography">
            Unlock the full potential of your capital
          </h5>
          <Link href="/">
            <MainButton
              onClick={openModal}
              label="LAUNCH APP"
              hasArrowRight={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnlockPotentialContainer;
