import { useGlobalContext } from "@/ContextApi";
import CloseIcon from "../../../../../assets/icons/close.svg";
import { RiEditCircleLine } from "react-icons/ri";

import SearchIcon from "../../../../../assets/icons/search.svg";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import { MdDeleteOutline } from "react-icons/md";
import { TbTags } from "react-icons/tb";
import DragIcon from "../../../../../assets/icons/drag.svg";
import { Button } from "@/components/ui/button";
import AddTagWindow from "./AddTagWindow";
import { toast } from "@/components/ui/use-toast";
import EmptyPlaceHolder from "../../EmptyPlaceHolder";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TagsWindow = () => {
  const {
    openTagsWindowObject: { openTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");

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
      } border m-20 sm:w-1/2 z-50 p-4 shadow-md rounded-md ${
        darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
      }`}
    >
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TagsList searchQuery={searchQuery} />
    </div>
  );
};

export default TagsWindow;

const Header = () => {
  const {
    openTagsWindowObject: { setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center ">
      {" "}
      <div className="flex items-center gap-2">
        <TbTags className="h-7 w-7 mr-1 text-[#9588e8]" />
        <span className="text-md font-bold">Tags</span>
      </div>{" "}
      <div>
        <CloseIcon
          className=" text-slate-400 cursor-pointer h-6 w-6 mr-1"
          onClick={() => setOpenTagsWindow(false)}
        />
      </div>
    </div>
  );
};

function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openTagsWindow]);
  return (
    <div className="flex gap-5 items-center justify-between mt-11">
      <div
        className={`h-[42px] flex items-center text-sm rounded-md ${
          darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-gray-100"
        } pl-3 gap-1 w-[85%]`}
      >
        <SearchIcon className="text-slate-400 h-6 w-6 mr-1" />
        <input
          ref={inputRef}
          value={searchQuery}
          placeholder="Search a tag..."
          className={` outline-none w-full font-light ${
            darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-gray-100"
          }`}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button
        className="bg-[#9588e8] hover:bg-[#a49ae4]  p-[10px] text-white max-lg:w-auto"
        onClick={() => setOpenNewTagsWindow(true)}
      >
        <PlusIcon className="h-6 w-6" />
        <span className="max-md:hidden">Add Tag</span>
      </Button>
      {openNewTagsWindow && <AddTagWindow />}
    </div>
  );
}

function TagsList({ searchQuery }: { searchQuery: string }) {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags },
  } = useGlobalContext();

  const filterAllItemsFromAllTags = allTags.filter((tag) => tag.name != "All");

  const filterAllTagsBasedOnSearchQuery = filterAllItemsFromAllTags.filter(
    (tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`rounded-md p-4 ${
        darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : "bg-gray-100"
      } h-[380px] overflow-auto mt-9 flex flex-col gap-4`}
    >
      {filterAllItemsFromAllTags.length === 0 && (
        <EmptyPlaceHolder
          Icon={<TbTags className="h-20 w-20 mr-1 text-gray-400" />}
          Text={
            <span className="text-slate-400">No Tags has been created Yet</span>
          }
        />
      )}

      {filterAllTagsBasedOnSearchQuery.length === 0 &&
        filterAllItemsFromAllTags.length !== 0 && (
          <EmptyPlaceHolder
            Icon={<TbTags className="h-20 w-20 mr-1 text-gray-400" />}
            Text={<span className="text-slate-400">No Tags Found</span>}
          />
        )}

      {filterAllTagsBasedOnSearchQuery.map((tag, index) => (
        <div key={index}>
          <SingleTag tag={tag} />
        </div>
      ))}
    </div>
  );
}

function SingleTag({ tag }: { tag: SingleTagType }) {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    selectedTagToEditObject: { setSelectedTagToEdit },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    tagsClickedObject: { tagsClicked, setTagsClicked },
  } = useGlobalContext();

  function openTagWindow(tag: SingleTagType) {
    setOpenNewTagsWindow(true);
    setSelectedTagToEdit(tag);
  }

  function countTagInAllNotes(tag: SingleTagType) {
    let count = 0;
    allNotes.forEach((note) => {
      if (note.tags.some((t) => t.name === tag.name)) count++;
    });
    return count;
  }

  return (
    <div
      className={` ${
        darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-gray-300"
      } p-2 rounded-lg flex gap-3 items-center justify-between px-4`}
    >
      <div className="flex gap-3 items-center">
        <DragIcon className="text-slate-400 cursor-pointer h-6 w-6" />
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold">{tag.name}</span>
          <span className="text-slate-500 text-[12px]">
            {countTagInAllNotes(tag)} snippets
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div
          className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer "
          onClick={() => openTagWindow(tag)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`${
                    darkMode[1].isSelected
                      ? "bg-[#1f1e25] hover:bg-gray-800"
                      : "bg-white hover:bg-gray-200"
                  }  border-none rounded-full p-2 h-8`}
                >
                  <RiEditCircleLine className="text-[#9588e8] h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className={`${
                  darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
                }`}
              >
                <p>Edit Tag</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
          onClick={() =>
            deleteTag(
              tag,
              allTags,
              setAllTags,
              allNotes,
              setAllNotes,
              tagsClicked,
              setTagsClicked
            )
          }
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`${
                    darkMode[1].isSelected
                      ? "bg-[#1f1e25] hover:bg-gray-800"
                      : "bg-white hover:bg-gray-200"
                  }  border-none rounded-full p-2 h-8`}
                >
                  <MdDeleteOutline className="text-[#9588e8] h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className={`${
                  darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
                }`}
              >
                <p>Delete Tag</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
async function updateNote(note: SingleNoteType, tagToRemove: string) {
  const updatedTags = note.tags.filter(
    (tag) => tag.name.toLowerCase() !== tagToRemove.toLowerCase()
  );
  const updateNoteResponse = await fetch(
    `/api/snippets?snippetId=${note._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...note,
        tags: updatedTags,
      }),
    }
  );

  if (!updateNoteResponse) {
    throw new Error(`Failed to update note: ${note._id}`);
  }
  const updateNote = await updateNoteResponse.json();
  return updateNote;
}

const deleteTag = async (
  tag: SingleTagType,
  allTags: SingleTagType[],
  setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  tagsClicked: string[],
  setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    // Delete tag from database
    const deleteTagResponse = await fetch(`/api/tags?tagId=${tag._id}`, {
      method: "DELETE",
    });

    if (!deleteTagResponse.ok) {
      const errorData = await deleteTagResponse.json();
      throw new Error(`Failed to delete tag: ${errorData.message}`);
    }

    // Get notes that need to be updated
    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase())
    );

    const updatePromises = notesToUpdate.map((note) =>
      updateNote(note, tag.name)
    );

    const updateNotes = await Promise.all(updatePromises);

    const updateAllTags = allTags.filter(
      (t) => t.name.toLocaleLowerCase() !== tag.name.toLocaleLowerCase()
    );

    // Update all notes
    const updateAllNotes = allNotes.map((note) => {
      const updatedNote = updateNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }
      return {
        ...note,
        tags: note.tags.filter(
          (t) => t.name.toLocaleLowerCase() !== tag.name.toLocaleLowerCase()
        ),
      };
    });

    setAllTags(updateAllTags);
    setAllNotes(updateAllNotes);
    setTagsClicked(
      tagsClicked.filter((t) => t.toLowerCase() !== tag.name.toLowerCase())
    );
    toast({
      title: "Tag has been Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    toast({
      title: "Failed to Delete tag",
      variant: "destructive",
    });
  }
};
