"use client";
import React from "react";
import Image from "next/image";
import shareIcon from "@/public/assets/shareIcon.svg";

const ShareButton = () => {
  return (
    <button className="w-fit">
      <Image src={shareIcon} alt="share_Icon" width={22} height={22} />
    </button>
  );
};

export default ShareButton;
