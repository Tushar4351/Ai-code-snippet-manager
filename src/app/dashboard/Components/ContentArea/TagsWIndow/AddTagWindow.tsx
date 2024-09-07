import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGlobalContext } from "@/ContextApi";
import ErrorIcon from "../../../../../assets/icons/error.svg";
import { Button } from "@/components/ui/button";

const AddTagWindow = () => {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();

  const [tagName, setTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setTagName(e.target.value);
  };

  useEffect(() => {
    if (openNewTagsWindow) {
      setTagName("");
      setErrorMessage("");
    }
  }, [openNewTagsWindow]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage]);

  useEffect(() => {
    if (selectedTagToEdit) {
      setTagName(selectedTagToEdit.name);
    }
  }, [selectedTagToEdit]);

  function handleClickedTag() {
    // Check if the tag already exists
    if (tagName.trim().length === 0) {
      setErrorMessage("Tag name is still empty!");
      return;
    }
    if (!allTags.some((tag) => tag.name === tagName)) {
      if (!selectedTagToEdit) {
        addNewTagFunction(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          tagName,
          sharedUserId
        );
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

  return (
    <AlertDialog open={openNewTagsWindow} onOpenChange={setOpenNewTagsWindow}>
      <AlertDialogContent
        className={`${
          darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
        } border-none`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedTagToEdit ? "Edit Tag" : "Add New Tag"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-semibold text-gray-400">Tag Name</span>
            <input
              ref={inputRef}
              value={tagName}
              onChange={onInputChange}
              placeholder="Enter tag name"
              className={`outline-none ${
                darkMode[1].isSelected
                  ? "bg-[#1f1e25] text-white"
                  : "bg-white text-gray-700 border"
              } text-sm w-full rounded-md p-2 mt-1`}
            />
            {errorMessage && (
              <div className="text-red-500 text-sm flex gap-1 items-center mt-2">
                <ErrorIcon className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              setOpenNewTagsWindow(false);
              setSelectedTagToEdit(null);
            }}
            variant="outline"
            className={`mt-2 sm:mt-0 ${
          darkMode[1].isSelected ?"text-black":""}`}
          >
            Cancel
          </Button>
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
      headers: { "Content-Type": "application/json" },
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
      _id: data.tags._id,
      name: data.tags.name,
      clerkUserId: data.tags.clerkUserId,
    };
    setAllTags((prevTags) => [...prevTags, addedTag]);
    setOpenNewTagsWindow(false);
    toast({
      title: "Tag has been Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleEditTag(
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
  try {
    // Update the tag in the database
    const response = await fetch("/api/tags", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedTagToEdit._id,
        name: tagName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to update tag in the database"
      );
    }

    const updatedTagData = await response.json();

    // Update all tags in the frontend state
    const updatedAllTags = allTags.map((tag) =>
      tag._id === selectedTagToEdit._id ? { ...tag, name: tagName } : tag
    );

    // Update all notes with the new tag name
    const updatedNotes = allNotes.map((note) => {
      if (
        note.tags.some(
          (tag) =>
            tag.name.toLowerCase() === selectedTagToEdit.name.toLowerCase()
        )
      ) {
        return {
          ...note,
          tags: note.tags.map((tag) =>
            tag.name.toLowerCase() === selectedTagToEdit.name.toLowerCase()
              ? { ...tag, name: tagName }
              : tag
          ),
        };
      }
      return note;
    });

    // Update state
    setAllTags(updatedAllTags);
    setAllNotes(updatedNotes);
    setSelectedTagToEdit(null);
    setOpenNewTagsWindow(false);

    // Show success toast
    toast({
      title: "Tag has been updated successfully",
    });
  } catch (error) {
    console.error("Error updating tag:", error);
    toast({
      title: "Failed to update tag",
      variant: "destructive",
    });
  }
}
