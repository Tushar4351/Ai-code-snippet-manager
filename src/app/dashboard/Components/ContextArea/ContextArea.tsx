import { useGlobalContext } from "@/ContextApi";
import DarkMode from "./TopBar/DarkMode";
import ProfileUser from "./TopBar/ProfileUser";
import SearchBar from "./TopBar/SearchBar";
import SideBarMenuIcon from "./TopBar/SideBarMenuIcon";
import SwiperSelection from "./NotesArea/SwiperSelection";
import AllNotesSection from "./NotesArea/AllNotesSection";
import ContentNote from "../ContentNote";

const ContextArea = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-gray-100"} p-5`}
    >
      <TopBar />
      <NotesArea />
    </div>
  );
};

export default ContextArea;

const TopBar = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"} rounded-lg flex justify-between items-center p-3`}
    >
      <ProfileUser />
      <SearchBar />
      <div className="flex gap-4 items-center">
        <DarkMode />
        <SideBarMenuIcon />
      </div>
    </div>
  );
};

const NotesArea = () => {
  const { openContentNoteObject: { openContentNote }, isMobileObject :{isMobile} } = useGlobalContext();
  return (
    <div className="flex gap-2 mt-5">
      <div className={`${openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}`: "w-full"}`}>
      <SwiperSelection />
      <AllNotesSection/>
      </div>
      <ContentNote/>
    </div>
  );
};
