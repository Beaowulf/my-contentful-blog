import React from "react";
import Link from "next/link";

const DynamicPurpleBar = ({ blogTitle, inBlogPost = false }) => {
  return (
    <div className="">
      <div className="flex items-center gap-3 rounded-[20px] bg-[#565AC2] relative px-5 md:px-16 py-4 text-white ">
        <Link className="hidden sm:block text-nowrap" href={"/"}>
          Home
        </Link>
        <span className="hidden sm:block text-nowrap w-3 h-1 bg-white rounded-[40px]" />
        <Link href={"/"}>Burd Log</Link>
        {blogTitle && (
          <>
            <span className="w-3 h-1 bg-white rounded-[40px] font-extrabold" />
            <p className="font-extrabold">{blogTitle}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicPurpleBar;
