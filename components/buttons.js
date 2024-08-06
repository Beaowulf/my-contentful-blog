import "./index.css";
import Image from "next/image";
import ArrowRightBlack from "@/public/assets/arrow-right.svg";
import ArrowRightWhite from "@/public/assets/arrow-right-white.svg";

export function NavBarButton({ label, onClick }) {
  return (
    <>
      <div className="navButtonWrapper">
        <button onClick={onClick} className={"navBarButtonBGDark"}>
          <div className={"mainButton w-full h-[35px] md:h-[45px]"}>
            <p
              className={
                "text-[12px] md:text-[14px] lg:text-[16px] dark:text-black text-white text-nowrap mainButtonText"
              }
            >
              {label}
            </p>
          </div>
        </button>
      </div>
    </>
  );
}

export function MainButton({
  label,
  onClick,
  hasArrowRight = false,
  typographyClass,
  hasBorder = true,
  className,
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={
          hasBorder
            ? `${className} mainButtonWithBorderBG`
            : `${className} mainButtonBGwithoutBorder`
        }
      >
        <div className="mainButton w-full h-[45px] md:h-full p-4 ">
          <h6
            className={
              typographyClass
                ? `${typographyClass}`
                : " text-[10px] md:text-[12px] lg:text-[14px]  text-nowrap font-extrabold mainButtonText"
            }
          >
            {label}
          </h6>
          {hasArrowRight && (
            <Image
              className={"size-5"}
              src={ArrowRightBlack}
              alt={"Arrow Right"}
            />
          )}
        </div>
      </button>
    </>
  );
}

export function AboutButtonDarkBG({
  customClass,
  label,
  onClick,
  hasArrowRight = false,
  hasWhiteArrowRight = false,
}) {
  return (
    <>
      <button className={customClass} onClick={onClick}>
        <div className="aboutButtonDarkBG">
          <p className="buttonLightModeText min-w-fit">{label}</p>
          {hasArrowRight && (
            <Image
              className={"size-5"}
              src={ArrowRightBlack}
              alt={"Arrow Right"}
            />
          )}
          {hasWhiteArrowRight && (
            <Image
              className={"size-5"}
              src={ArrowRightWhite}
              alt={"Arrow Right"}
            />
          )}
        </div>
      </button>
    </>
  );
}
