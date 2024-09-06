import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ErrorIcon from "../../../../../assets/icons/error.svg";
import { toast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/ContextApi";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTagWindow = () => {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    sharedUserIdObject:{sharedUserId, }
  } = useGlobalContext();

  const [tagName, setTagName] = useState("");
  const [placeholder, setPlaceHolder] = useState("");
  const [errorMassage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  //write a function of oninputchange
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setErrorMessage("");
    setTagName(newValue);
  };
  // Reset the form when the openTagsWindow state change
  useEffect(() => {
    if (openNewTagsWindow) {
      setTagName("");
      setErrorMessage("");
    }
  }, [openNewTagsWindow]);

  function handleClickedTag() {
    // Check if the tag already exists
    if (tagName.trim().length === 0) {
      setErrorMessage("Tag name is still empty!");
      return;
    }
    if (!allTags.some((tag) => tag.name === tagName)) {
      if (!selectedTagToEdit) {
        addNewTagFunction(allTags, setAllTags, setOpenNewTagsWindow, tagName,sharedUserId);
      } else {
        handleEditTag(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          selectedTagToEdit,
          setSelectedTagToEdit,
          tagName,
          allNotes,
          setAllNotes
        );
      }
    } else {
      setErrorMessage("Tag already exists");
    }
  }
  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMassage, setErrorMessage]);

  useEffect(() => {
    if (selectedTagToEdit) {
      setTagName(selectedTagToEdit.name);
    }
  }, [selectedTagToEdit]);
  return (
    <AlertDialog
      open={openNewTagsWindow}
      //onOpenChange={setOpenConfirmationWindow}
    >
      <AlertDialogContent
        className={`${darkMode[1].isSelected ? "bg-[#151419]" : "bg-white"}`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`${darkMode[1].isSelected ? "text-white" : ""}`}
          >
            {selectedTagToEdit ? "Edit Tag" : "Add New Tag"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            <span className="font-semibold">Tag Name</span>
            <input
              ref={inputRef}
              value={tagName}
              onChange={(e) => onInputChange(e)}
              placeholder={placeholder}
              className={`outline-none ${
                darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-white border"
              } text-gray-500 text-sm w-full rounded-md p-2 mt-1`}
            />
            {errorMassage.length > 0 && (
              <div className="text-red-500 text-sm flex gap-1 items-center  mt-2">
                <ErrorIcon className="w-4 h-4" />
                <span className="text-red-500 text-sm">{errorMassage}</span>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpenNewTagsWindow(false);
              setSelectedTagToEdit(null);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#9588e8] hover:bg-[#9f93ee]"
            onClick={handleClickedTag}
          >
            {selectedTagToEdit ? "Edit Tag" : "Add Tag"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTagWindow;

async function addNewTagFunction(
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  tagName: string,
  sharedUserId: string
) {
  const newTag = {
    id: uuidv4(),
    clerkUserId: sharedUserId || "",
    name: tagName,
  };
  try {
    const response = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(newTag),
    });
    if (!response.ok) {
      throw new Error("Failed to add tag");
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    const addedTag: SingleTagType = {
      _id: data.tags.id,
      name: data.tags.name,
      clerkUserId: data.tags.clerkUserId,
    };
    setAllTags((prevTags)=>[...prevTags, addedTag]);
    setOpenNewTagsWindow(false);
    toast({
      title: "Tag has been Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
function handleEditTag(
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  selectedTagToEdit: SingleTagType,
  setSelectedTagToEdit: (
    value: React.SetStateAction<SingleTagType | null>
  ) => void,
  tagName: string,
  allNotes: SingleNoteType[],
  setAllNotes: (value: React.SetStateAction<SingleNoteType[]>) => void
) {
  // Update all tags
  const updateAllTags = allTags.map((tag) =>
    tag._id === selectedTagToEdit?._id ? { ...tag, name: tagName } : tag
  );

  // Update all notes with the new tag name
  const updatedNotes = allNotes.map((note) => {
    if (
      note.tags.some(
        (tag) =>
          tag.name.toLowerCase() === selectedTagToEdit?.name.toLowerCase()
      )
    ) {
      return {
        ...note,
        tags: note.tags.map((tag) =>
          tag.name.toLowerCase() === selectedTagToEdit?.name.toLowerCase()
            ? { ...tag, name: tagName }
            : tag
        ),
      };
    }
    return note;
  });

  // Update state
  setAllTags(updateAllTags);
  setAllNotes(updatedNotes);
  setSelectedTagToEdit(null);
  setOpenNewTagsWindow(false);
}
