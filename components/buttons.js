import "./index.css";

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
