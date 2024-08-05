import { useGlobalContext } from "@/ContextApi";
import DeleteIcon from "../../../../../assets/icons/delete.svg";
import ImportantIcon from "../../../../../assets/icons/important.svg";
import EditIcon from "../../../../../assets/icons/edit.svg";
import React, { useEffect, useState } from "react";
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

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
    openContentNoteObject: { openContentNote },
    sideBarMenuObject: { sideBarMenu },
  } = useGlobalContext();

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

  useEffect(() => {
    //if all snippets is selected
    if (sideBarMenu[0].isSelected) {
      setFilteredNotes(filterIsDeletedNotes);
    }
    //if important is selected filter important notes
    if (sideBarMenu[1].isSelected) {
      const filteredImportnatNotes = allNotes.filter(
        (note) => note.isImportant && note.isDeleted
      );
      setFilteredNotes(filteredImportnatNotes);
    }
    //if delted is selected
    if (sideBarMenu[2].isSelected) {
      const filteredDeletedNotes = allNotes.filter((note) => note.isDeleted);

      setFilteredNotes(filteredDeletedNotes);
    }
  }, [sideBarMenu]);

  return (
    <div
      className={`mt-5 gap-4 ${openContentNote ? "" : "flex flex-wrap gap-4"}`}
    >
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
  console.log("single note :", note);
  const { title, createdAt, tags, description, code, isImportant, language } =
    note;

  return (
    <div
      className={`${
        darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
      } ${
        openContentNote ? "w-full mb-4" : "w-[366px]"
      } max-sm:w-full rounded-lg py-4`}
    >
      <NoteHeader title={title} isImportant={isImportant} note={note} />
      <NoteDate createdAt={createdAt} />
      <NoteTags tags={tags} />
      <NoteDescription description={description} />
      <CodeBlock language={language} code={code} />
      <NotFooter language={language} note={note} />
    </div>
  );
};

const NoteHeader = ({
  title,
  isImportant,
  note,
}: {
  title: string;
  isImportant: boolean;
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
    setOpenContentNote(true);
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
  } = useGlobalContext();
  const { toast } = useToast();

  const deleteNoteFunction = () => {
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

    console.log(clickedNote);
    setAllNotes(allNotesCopy);
    toast({
      title: "Note has been moved to trash",
      action: (
        <ToastAction altText="Undo" onClick={() => resetNoteFunction(note.id)}>
          Undo
        </ToastAction>
      ),
    });
  };

  const resetNoteFunction = (noteId: string) => {
    const deletedNoteIndex = allNotes.findIndex((n) => n.id === noteId);
    if (deletedNoteIndex !== -1) {
      const updatedNotes = allNotes.map((n) =>
        n.id === noteId ? { ...n, isDeleted: false } : n
      );
      setAllNotes(updatedNotes);
      toast({
        title: "Note has been restored",
      });
    }
  };

  return (
    <div className="flex justify-between items-center text-[13px] text-gray-400 mx-4 mt-3">
      <div className="flex items-center">
        {getLanguageIcon(language)}
        <span>{language}</span>
      </div>
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
            <p>Delete Note</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
