import { useGlobalContext } from "@/ContextApi";
import MenuIcon from "../../../../../assets/icons/menu.svg";
import CloseIcon from "../../../../../assets/icons/close.svg";

const SideBarMenuIcon = () => {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();

  return (
    <>
      {!openSideBar ? (
        <MenuIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="text-gray-500 cursor-pointer hidden max-md:block"
        />
      ) : (
        <CloseIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="text-gray-500 cursor-pointer hidden max-md:block w-6 h-6"
        />
      )}
    </>
  );
};

export default SideBarMenuIcon;
