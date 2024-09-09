import { useGlobalContext } from "@/ContextApi";
import DarkMode from "./TopBar/DarkMode";
import ProfileUser from "./TopBar/ProfileUser";
import SearchBar from "./TopBar/SearchBar";
import SideBarMenuIcon from "./TopBar/SideBarMenuIcon";
import SwiperSelection from "./NotesArea/SwiperSelection";
import AllNotesSection from "./NotesArea/AllNotesSection";
import ContentNote from "../ContentNote/ContentNote";
import Pricing from "../Pricing";
import CreditInformation from "./TopBar/CreditInformation";
import { getUserById } from "@/app/actions/user.actions";
const ContentArea = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`${
        darkMode[1].isSelected
          ? "bg-[#1f1e25] border-neutral-700"
          : "bg-gray-100 border-neutral-200"
      } p-5 h-screen overflow-y-auto rounded-tl-2xl border`}
    >
      <TopBar />
      <NotesArea />
    </div>
  );
};

export default ContentArea;

const TopBar = () => {
  const {
    darkModeObject: { darkMode },
    sideBarMenuObject: { sideBarMenu },
  } = useGlobalContext();

  // console.log(sharedUserId);
  // const user = await getUserById(sharedUserId);
  // console.log(user);
  return (
    <div
      className={`${
        darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
      } rounded-lg flex justify-between items-center p-3`}
    >
      {sideBarMenu[3].isSelected ? (
        <>
          <ProfileUser />
          <CreditInformation darkmode={darkMode[1].isSelected}/>
          <div className="flex gap-4 items-center">
            <DarkMode />
            <SideBarMenuIcon />
          </div>
        </>
      ) : (
        <>
          <ProfileUser />
          <SearchBar />
          <div className="flex gap-4 items-center">
            <DarkMode />
            <SideBarMenuIcon />
          </div>
        </>
      )}
    </div>
  );
};

const NotesArea = () => {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
    sideBarMenuObject: { sideBarMenu },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className="flex gap-2 mt-5">
      <div
        className={`${
          openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}` : "w-full"
        }`}
      >
        {sideBarMenu[3].isSelected ? (
          <>
            <Pricing darkmode={darkMode[1].isSelected} />
          </>
        ) : (
          <>
            <SwiperSelection />
            <AllNotesSection />
          </>
        )}
      </div>
      <ContentNote />
    </div>
  );
};


