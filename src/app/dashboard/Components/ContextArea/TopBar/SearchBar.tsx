import Image from "next/image";
import SearchIcon from "../../../../../assets/icons/search.png";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import { useGlobalContext } from "@/ContextApi";

const SearchBar = () => {
    const {
        darkModeObject: { darkMode },
      } = useGlobalContext();
  return (
      <div className={` relative pl-3 w-[60%] h-[38px] ${darkMode[1].isSelected ? "bg-[#1f1e25]": "bg-gray-100"} rounded-3xl flex items-center gap-2`}>
      <Image src={SearchIcon} alt="Search icon" width={20} height={20} />
      <input
        placeholder="Search Your Snippet"
        className={ `w-[70%] outline-none text-sm ${darkMode[1].isSelected ? "bg-[#1f1e25]": "bg-gray-100"} text-gray-500`} 
      />
      <AddSnippetButton />
    </div>
  );
};

export default SearchBar;

const AddSnippetButton = () => {
  return (
    <div className="absolute flex gap-2 px-3 rounded-3xl max-md:px-1 bg-black p-1 text-[13px] text-white top-[5px] right-[6px] items-center cursor-pointer select-none">
      <PlusIcon/>
      <div className="max-md:hidden">Snippet</div>
    </div>
  );
};
