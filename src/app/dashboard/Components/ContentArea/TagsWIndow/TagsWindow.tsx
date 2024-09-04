import { useGlobalContext } from "@/ContextApi";
import CloseIcon from "../../../../../assets/icons/close.svg";
import TagsIcon from "../../../../../assets/icons/tags.svg";
import SearchIcon from "../../../../../assets/icons/search.svg";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import DeleteIcon from "../../../../../assets/icons/delete.svg";
import EditIcon from "../../../../../assets/icons/edit.svg";
import DragIcon from "../../../../../assets/icons/drag.svg";
import { Button } from "@/components/ui/button";
import AddTagWindow from "./AddTagWindow";
import { toast } from "@/components/ui/use-toast";
import EmptyPlaceHolder from "../../EmptyPlaceHolder";
import { useEffect, useRef, useState } from "react";
import { Tags } from "lucide-react";

const TagsWindow = () => {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
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
      } border m-20 w-1/2 z-50 p-4 bg-white shadow-md rounded-md`}
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
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center ">
      {" "}
      <div className="flex items-center gap-2">
        <TagsIcon className="h-7 w-7 mr-1" />
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
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openTagsWindow]);
  return (
    <div className="flex gap-5 items-center justify-between mt-11">
      <div className="h-[42px] flex items-center text-sm rounded-md bg-slate-50 pl-3 gap-1 w-[85%]">
        <SearchIcon className="text-slate-400 h-6 w-6 mr-1" />
        <input
          ref={inputRef}
          value={searchQuery}
          placeholder="Search a tag..."
          className="bg-transparent outline-none w-full font-light"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button
        className="bg-purple-600  p-[10px] text-white max-lg:w-auto"
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
    allTagsObject: { allTags, setAllTags },
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
  } = useGlobalContext();

  const filterAllItemsFromAllTags = allTags.filter((tag) => tag.name != "All");

  const filterAllTagsBasedOnSearchQuery = filterAllItemsFromAllTags.filter(
    (tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="rounded-md p-4 bg-slate-50 h-[380px] overflow-auto mt-9 flex flex-col gap-4">
      {filterAllItemsFromAllTags.length === 0 && (
        <EmptyPlaceHolder
          Icon={<TagsIcon className="h-20 w-20 mr-1" />}
          Text={
            <span className="text-slate-400">No Tags has been created Yet</span>
          }
        />
      )}

      {filterAllTagsBasedOnSearchQuery.length === 0 &&
        filterAllItemsFromAllTags.length !== 0 && (
          <EmptyPlaceHolder
            Icon={<TagsIcon className="h-20 w-20 mr-1" />}
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
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
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
    <div className="bg-white p-2 rounded-lg flex gap-3 items-center justify-between px-4">
      <div className="flex gap-3 items-center">
        <DragIcon className="text-slate-400 cursor-pointer h-6 w-6" />
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold">{tag.name}</span>
          <span className="text-slate-400 text-[12px]">
            {countTagInAllNotes(tag)} snippets
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
          <EditIcon
            className="text-slate-400 h-5 w-5"
            onClick={() => openTagWindow(tag)}
          />
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
          <DeleteIcon className="text-slate-400 h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
async function updateNote(note: SingleNoteType, tagToRemove: string) {
  const updatedTags = note.tags.filter(
    (tag) => tag.name.toLowerCase() !== tagToRemove.toLowerCase()
  );
  const updateNoteResponse = await fetch(`/api/snippets?snippetId=${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...note,
      tags: updatedTags,
    }),
  });

  if (!updateNoteResponse) {
    throw new Error(`Failed to update note: ${note.id}`);
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
      const updatedNote = updateNotes.find((un) => un.id === note.id);
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
  }
};
