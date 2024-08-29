import { useGlobalContext } from "@/ContextApi";
import CloseIcon from "../../../../assets/icons/close.svg";
import TagsIcon from "../../../../assets/icons/tags.svg";
import SearchIcon from "../../../../assets/icons/search.svg";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import DeleteIcon from "../../../../assets/icons/delete.svg";
import EditIcon from "../../../../assets/icons/edit.svg";
import DragIcon from "../../../../assets/icons/drag.svg";

const TagsWindow = () => {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "30%",
        transform: "translateY(-50%)",
      }}
      className={`${
        openTagsWindow ? "fixed" : "hidden"
      } border m-20 w-1/2 z-50 p-4 bg-white shadow-md rounded-md`}
    >
          <Header />
          <SearchBar />
          <TagsList />
    </div>
  );
};

export default TagsWindow;

const Header = () => {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center ">
      {" "}
      <div className="flex items-center gap-2">
        <TagsIcon /> <span className="text-md font-bold">Tags</span>
      </div>{" "}
      <div>
        <CloseIcon
          sx={{ fontSize: 16 }}
          className=" text-slate-400 cursor-pointer"
          onclick={() => setOpenTagsWindow(false)}
        />
      </div>
    </div>
  );
};

function SearchBar() {
    return (
      <div className="flex gap-5 items-center justify-between mt-11">
        <div className="h-[42px] flex items-center text-sm rounded-md bg-slate-50 pl-3 gap-1 w-[85%]">
          <SearchIcon className="text-slate-400" />
          <input
            placeholder="Search a tag..."
            className="bg-transparent outline-none w-full font-light"
          />
        </div>
        <button className="bg-purple-600 ml-2 p-[10px] flex w-[15%] text-sm rounded-md text-white items-center justify-center max-lg:w-auto">
          <PlusIcon sx={{ fontSize: 17 }} />
          <span className="max-md:hidden">Add Tag</span>
        </button>
      </div>
    );
}
  
function TagsList() {
    return (
      <div className="rounded-md p-4 bg-slate-50 h-[380px] overflow-auto mt-9 flex flex-col gap-4" >
        <SingleTag />
        <SingleTag />
        <SingleTag />
        <SingleTag />
        <SingleTag />
      </div>
    );
  }
  
  function SingleTag() {
    return (
      <div className="bg-white p-2 rounded-lg flex gap-3 items-center justify-between px-4">
        <div className="flex gap-3 items-center">
          <DragIcon className="text-slate-400 cursor-pointer" />
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          <div className="flex flex-col">
            <span className="font-bold">All</span>
            <span className="text-slate-400 text-[12px]">2 Snippets</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
            <EditIcon className="text-slate-400" sx={{ fontSize: 15 }} />
          </div>
          <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
            <DeleteIcon className="text-slate-400" sx={{ fontSize: 15 }} />
          </div>
        </div>
      </div>
    );
  }
  