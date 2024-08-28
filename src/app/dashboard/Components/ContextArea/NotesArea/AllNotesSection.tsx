import { useGlobalContext } from "@/ContextApi";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import DeleteIcon from "../../../../../assets/icons/delete.svg";
import ImportantIcon from "../../../../../assets/icons/important.svg";
import EditIcon from "../../../../../assets/icons/edit.svg";
import RestoreIcon from "../../../../../assets/icons/restore.svg";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getLanguageIcon } from "@/app/localData/LanguageTextToIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sideBarMenuObject: { sideBarMenu },
  } = useGlobalContext();
  //console.log(allNotes);

  const filterIsDeletedNotes = () => {
    return allNotes.filter((note) => note.isDeleted === false);
  };

  const [filteredNotes, setFilteredNotes] = useState(
    allNotes.filter((note) => note.isDeleted === false)
  );

  //this use effect will trigger this code whenever we make a change in the all notes
  useEffect(() => {
    //if all snipperts is selevcted show all the snippets that are deleted
    if (sideBarMenu[0].isSelected) {
      setFilteredNotes(allNotes.filter((note) => !note.isDeleted));
    }
    //if important is selected and we make a note as favourite and not deleted
    if (sideBarMenu[1].isSelected) {
      allNotes.filter((note) => note.isImportant && note.isDeleted === false);
    }
  }, [allNotes]);

  useLayoutEffect(() => {
    if (openContentNote) {
      setOpenContentNote(false);
    }
    //if all snippets is selected
    if (sideBarMenu[0].isSelected) {
      setFilteredNotes(filterIsDeletedNotes);
    }
    //if important is selected filter important notes
    if (sideBarMenu[1].isSelected) {
      const filteredImportnatNotes = allNotes.filter(
        (note) => note.isImportant || note.isDeleted
      );
      setFilteredNotes(filteredImportnatNotes);
      console.log("Important notes filtered ...", filteredNotes);
    }
    //if delted is selected
    if (sideBarMenu[2].isSelected) {
      const filteredDeletedNotes = allNotes.filter((note) => note.isDeleted);

      setFilteredNotes(filteredDeletedNotes);
      console.log("deleted notes filtered ...", filteredNotes);
    }
  }, [sideBarMenu]);

  return (
    <div
      className={`mt-5 gap-4 ${openContentNote ? "" : "flex flex-wrap gap-4"}`}
    >
      {sideBarMenu[0].isSelected && (
        <>
          {filteredNotes.length != 0 ? (
            <>
              {" "}
              {filteredNotes.map((note, index) => (
                <div key={index}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="flex items-center mt-6 text-center rounded-lg h-96 ">
                <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
                  <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
                    No snippets found
                  </h1>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Create a new snippet.
                  </p>
                  <div className="flex items-center justify-center mt-4 sm:mx-auto">
                    <button className="flex items-center justify-center w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-[#9588e8] hover:bg-[#998edf] rounded-lg gap-x-2">
                      <PlusIcon/>
                      <span>Add Snippet</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {filteredNotes.map((note, index) => (
        <div key={index}>
          <SingleNote note={note} />
        </div>
      ))}
    </div>
  );
};

export default AllNotesSection;

const SingleNote = ({ note }: { note: SingleNoteType }) => {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: { openContentNote },
  } = useGlobalContext();
  // console.log("single note :", note);
  const {
    id,
    title,
    createdAt,
    tags,
    description,
    code,
    isImportant,
    isDeleted,
    language,
  } = note;

  return (
    <div
      className={`${
        darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
      } ${
        openContentNote ? "w-full mb-4" : "w-[366px]"
      } max-sm:w-full rounded-lg py-4`}
    >
      <NoteHeader
        id={id}
        title={title}
        isImportant={isImportant}
        isDeleted={isDeleted}
        note={note}
      />
      <NoteDate createdAt={createdAt} />
      <NoteTags tags={tags} />
      <NoteDescription description={description} />
      <CodeBlock language={language} code={code} />
      <NotFooter language={language} note={note} />
    </div>
  );
};

const NoteHeader = ({
  id,
  title,
  isImportant,
  isDeleted,
  note,
}: {
  id: string;
  title: string;
  isImportant: boolean;
  isDeleted: boolean;
  note: SingleNoteType;
}) => {
  const {
    openContentNoteObject: { setOpenContentNote },
    selectedNoteObject: { setSelectedNote },
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const handleEditClick = () => {
    setSelectedNote(note);
    if (!isDeleted) {
      setOpenContentNote(true);
    }
    // setOpenContentNote(true);
  };

  const handleClickedCheckbox = () => {
    const newAllNotes = allNotes.map((n) => {
      if (n.id === note.id) {
        return { ...n, isImportant: !n.isImportant };
      }
      return n;
    });
    setAllNotes(newAllNotes);
  };

  return (
    <div className="flex justify-between items-center mx-4">
      <span className="font-bold text-lg w-[87%]">
        {truncateString(title, 60)}
      </span>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`${
                  darkMode[1].isSelected
                    ? "bg-[#151419] hover:bg-gray-800"
                    : "bg-white hover:bg-gray-200"
                }  border-none rounded-full p-2`}
              >
                <EditIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleEditClick}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className={`${
                darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
              }`}
            >
              <p>Edit Note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {!isDeleted && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`${
                    darkMode[1].isSelected
                      ? "bg-[#151419] hover:bg-gray-800"
                      : "bg-white hover:bg-gray-200"
                  } ${
                    note.isImportant ? "bg-[#d5d0f8]" : ""
                  }  border-none rounded-full p-2`}
                  onClick={handleClickedCheckbox}
                >
                  <ImportantIcon className={`w-6 h-6 cursor-pointer `} />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className={`${
                  darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
                }`}
              >
                <p>Important Note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

const NoteDate = ({ createdAt }: { createdAt: string }) => {
  return (
    <div className="text-gray-400 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span>{getDateOnly(createdAt)}</span>
    </div>
  );

  function getDateOnly(dateTimeString: string) {
    const [date, time] = dateTimeString.split(", ");
    return date;
  }
};
const NoteTags = ({ tags }: { tags: SingleTagType[] }) => {
  return (
    <div className="flex flex-wrap mx-4 text-[11px] gap-1 mt-4 text-gray-400">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="p-1 rounded-md px-2 bg-[#d5d0f8] text-[#9588e8]"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};
const NoteDescription = ({ description }: { description: string }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`${
        darkMode[1].isSelected ? " text-white" : ""
      } text-gray-400 text-[13px] mt-4 mx-4`}
    >
      {truncateString(description, 200)}
    </div>
  );
};
interface CodeBlockProps {
  language: string;
  code: string;
}
const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className="rounded-lg overflow-hidden text-sm px-4">
      <SyntaxHighlighter
        language={"javascript"}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {truncateString(code, 300)}
      </SyntaxHighlighter>
    </div>
  );
};
const NotFooter = ({
  language,
  note,
}: {
  language: string;
  note: SingleNoteType;
}) => {
  const {
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
    selectedNoteObject: { selectedNote, setSelectedNote },
  } = useGlobalContext();
  const { toast } = useToast();

  const deleteNoteFunction = () => {
    if (note.isDeleted) {
      setOpenConfirmationWindow(true);
      setSelectedNote(note);
      return;
    }
    //make a copy of allnotes
    const allNotesCopy = [...allNotes];

    //find the index of the note to be deleted
    const findIndex = allNotesCopy.findIndex((n) => n.id === note.id);

    //mark the note as deleted
    const clickedNote = { ...allNotesCopy[findIndex], isDeleted: true };
    //update the note in the copy of all notes
    allNotesCopy[findIndex] = clickedNote;

    //optionally update the state or the orignal allNotes array
    //setAllNotes(allNotesCopy);// if using a state management library pr react state

    console.log("DEleted note ....", clickedNote);
    setAllNotes(allNotesCopy);
    toast({
      title: "Snippet has been moved to trash",
      action: (
        <ToastAction
          altText="Undo"
          onClick={() => resetNoteFunction()}
          className="bg-[#9588e8] hover:bg-[#9e93e2]"
        >
          Undo
        </ToastAction>
      ),
    });
  };
  const permanentlyDeleteNote = () => {
    if (selectedNote) {
      const updateAllNotes = allNotes.filter((n) => n.id !== selectedNote.id);
      setAllNotes(updateAllNotes);
      setOpenConfirmationWindow(false);
      setSelectedNote(null);
      toast({
        title: "Snippet has been permanently deleted",
      });
    }
  };

  const resetNoteFunction = () => {
    const deletedNoteIndex = allNotes.findIndex((n) => n.id === note.id);
    if (deletedNoteIndex !== -1) {
      const deletedNote = allNotes[deletedNoteIndex];
      deletedNote.isDeleted = false;
      setAllNotes([...allNotes]);
      toast({
        title: "Note has been restored",
      });
    }
  };

  return (
    <div className="flex justify-between items-center text-[13px] mx-4 mt-3">
      <div className="flex items-center">
        {getLanguageIcon(language)}
        <span>{language}</span>
      </div>
      <div className="flex gap-1 items-center">
        {note.isDeleted && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`${
                    darkMode[1].isSelected
                      ? "bg-[#151419] hover:bg-gray-800"
                      : "bg-white hover:bg-gray-200"
                  } border-none rounded-full p-2`}
                  onClick={resetNoteFunction}
                >
                  <RestoreIcon className="w-6 h-6 cursor-pointer" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className={`${
                  darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
                }`}
              >
                <p>Restore Note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`${
                  darkMode[1].isSelected
                    ? "bg-[#151419] hover:bg-gray-800"
                    : "bg-white hover:bg-gray-200"
                } border-none rounded-full p-2`}
                onClick={deleteNoteFunction}
              >
                <DeleteIcon className="w-6 h-6 cursor-pointer" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className={`${
                darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
              }`}
            >
              <p>
                {note.isDeleted ? "Permanently Delete Note" : "Delete Note"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <AlertDialog
        open={openConfirmationWindow}
        onOpenChange={setOpenConfirmationWindow}
      >
        <AlertDialogContent
          className={`${darkMode[1].isSelected ? "bg-[#151419]" : "bg-white"}`}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`${darkMode[1].isSelected ? "text-white" : ""}`}
            >
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete your
              Snippet from your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenConfirmationWindow(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#9588e8] hover:bg-[#9f93ee]"
              onClick={permanentlyDeleteNote}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const truncateString = (str: string, num: number) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};
