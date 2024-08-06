import DarkMode_logo from "@/public/assets/logo.svg";
import Image from "next/image";

export const Logo = () => {
  return (
    <a
      href="/#"
      className="title-font flex items-center font-medium text-[#A79DFF] dark:text-white"
    >
      <Image
        className="md:h-[42px] md:w-[39px] h-[25px] w-[23px]"
        src={DarkMode_logo}
        alt="logo_img"
      />
      <p className="ml-3 font-extrabold md:text-2xl text-lg">
        Delta
        <span className="font-normal">Prime</span>
      </p>
    </a>
  );
};

export const MobileMenuLogo = () => {
  return (
    <a
      href="/#"
      className="title-font flex items-center font-medium text-[#A79DFF] dark:text-white"
    >
      <Image
        className="md:h-[42px] md:w-[39px] h-[25px] w-[23px]"
        src={DarkMode_logo}
        alt="logo_img"
      />
      <p className="ml-3 font-extrabold md:text-2xl text-lg">
        Delta
        <span className="font-normal">Prime</span>
      </p>
    </a>
  );
};

export const FooterLogo = () => {
  return (
    <a
      href="/#"
      className="flex title-font font-medium items-center text-gray-900 dark:text-white"
    >
      <Image className="h-[54px] w-[53px]" src={DarkMode_logo} alt="logo_img" />
      <p className="ml-3 font-extrabold text-3xl text-white">
        Delta
        <span className="font-normal">Prime</span>
      </p>
    </a>
  );
};
