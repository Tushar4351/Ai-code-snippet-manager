import { useGlobalContext } from "@/ContextApi";
import DocumentIcon from "../../../../../assets/icons/document.svg";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { RiEditCircleLine } from "react-icons/ri";
import { MdOutlineRestore } from "react-icons/md";
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
} from "@/components/ui/alert-dialog";
import EmptyPlaceHolder from "../../EmptyPlaceHolder";

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sideBarMenuObject: { sideBarMenu },
    darkModeObject: { darkMode },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    isLoadingObject: { isLoading, setIsLoading },
  } = useGlobalContext();
  console.log(allNotes);

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
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        setFilteredNotes(allNotes.filter((note) => !note.isDeleted));
        return;
      }
      //Filter out based on the tagsClickedArray
      if (tagsClicked.length > 0) {
        const updateNotes = allNotes
          .filter((note) => {
            return tagsClicked.every((selectedTag) =>
              note.tags.some((noteTag) => noteTag.name === selectedTag)
            );
          })
          .filter((note) => !note.isDeleted);

        setFilteredNotes(updateNotes); // setFilteredNotes (all Notes.filter((note) => !note.isTrash)); //If favorite is selected, and we make a note as favorite and not trashed if (sideBarMenu [1].isSelected) { if (tagsClicked.length === 1 && tagsClicked[0] === "All") { setFilteredNotes ( allNotes.filter((note) => note.isFavorite && note?.isTrash false) );
      }
    }
    //if important is selected and we make a note as favourite and not deleted
    if (sideBarMenu[1].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        setFilteredNotes(
          allNotes.filter(
            (note) => note.isImportant && note?.isDeleted === false
          )
        );
      }
    }
    if (sideBarMenu[2].isSelected) {
      setFilteredNotes(allNotes.filter((note) => note?.isDeleted === true));
    }
  }, [allNotes, tagsClicked]);

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
        (note) => !note.isDeleted && note.isImportant
      );
      setFilteredNotes(filteredImportnatNotes);
    }
    //if delted is selected
    if (sideBarMenu[2].isSelected) {
      const filteredDeletedNotes = allNotes.filter((note) => note.isDeleted);

      setFilteredNotes(filteredDeletedNotes);
    }
  }, [sideBarMenu,setFilteredNotes]);
  if (isLoading) {
    return (
      <div className=" mt-5 flex flex-wrap gap-4">
        <ShimmerNoteEffect />
        <ShimmerNoteEffect />
        <ShimmerNoteEffect />
      </div>
    );
  }
  function ShimmerNoteEffect() {
    return (
      <div className="h-[380px] w-[300px] bg-slate-200 rounded-md flex flex-col">
        <div className=" flex justify-between px-5 pt-5">
          {" "}
          <div className="w-1/2 h-7 bg-slate-300 rounded-sm"></div>{" "}
          <div className="w-7 h-7 bg-slate-300 rounded-sm"></div>{" "}
        </div>
        <div className="h-[230px] mt-12 w-full bg-slate-300 "></div>{" "}
      </div>
    );
  }

  return (
    <div
      className={`mt-5 gap-4 ${openContentNote ? "" : "flex flex-wrap gap-4"}`}
    >
      {sideBarMenu[0].isSelected && (
        <>
          {filteredNotes.length === 0 ? (
            tagsClicked.filter((tag) => tag !== "All").length > 0 ? (
              <EmptyPlaceHolder
                Icon={<DocumentIcon className="w-20 h-20" />}
                Text={
                  <span className="text-gray-400 text-lg text-center">
                    {" "}
                    It looks like there is no <br /> snippets with these tags
                  </span>
                }
              />
            ) : (
              <EmptyPlaceHolder
                Icon={<DocumentIcon className="w-20 h-20" />}
                Text={
                  <span className="text-gray-400 text-lg text-center">
                    {" "}
                    It looks like there is no snippets right now
                  </span>
                }
                isNew={true}
              />
            )
          ) : (
            filteredNotes.map((note, noteIndex) => (
              <div key={noteIndex}>
                <SingleNote note={note} />
              </div>
            ))
          )}
        </>
      )}

      {sideBarMenu[1].isSelected && (
        <>
          {filteredNotes.length != 0 ? (
            <>
              {filteredNotes.map((note, index) => (
                <div key={index}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : (
            <EmptyPlaceHolder
              Icon={<FaRegStar className="w-20 h-20 text-gray-400" />}
              Text={
                <span className="text-gray-400 text-lg text-center">
                  {" "}
                  Currently, there are no snippets
                  <br /> marked as important
                </span>
              }
              isNew={false}
            />
          )}
        </>
      )}

      {sideBarMenu[2].isSelected && (
        <>
          {filteredNotes.length != 0 ? (
            <>
              {filteredNotes.map((note, index) => (
                <div key={index}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : (
            <EmptyPlaceHolder
              Icon={<MdDeleteOutline className="w-20 h-20 text-gray-400" />}
              Text={
                <span className="text-gray-400 text-lg text-center">
                  {" "}
                  Currently, there are no snippets
                  <br /> marked as deleted
                </span>
              }
              isNew={false}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllNotesSection;

const SingleNote = ({ note }: { note: SingleNoteType }) => {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: { openContentNote },
  } = useGlobalContext();
  const {
    _id,
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
        openContentNote ? "w-full mb-4" : "w-[366px] h-full"
      } max-sm:w-full rounded-lg py-4`}
    >
      <NoteHeader
        id={_id}
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
    allNotesObject: { setAllNotes },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const handleEditClick = () => {
    setSelectedNote(note);
    if (!isDeleted) {
      setOpenContentNote(true);
    }
    // setOpenContentNote(true);
  };

  const handleClickedCheckbox = async () => {
    const currentImportant = isImportant;
    const newImportant = !currentImportant;
    try {
      const response = await fetch(`/api/snippets?snippetId=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isImportant: newImportant }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Optional: handle the updatedNote if needed
      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, isImportant: newImportant } : note
        )
      );

      // setSearchQuery("");
    } catch (error) {
      console.error("Error updating importance:", error); // Log the error to understand failures
    }
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
                    ? "bg-[#1f1e25] hover:bg-gray-800"
                    : "bg-gray-200 hover:bg-gray-100"
                }  border-none rounded-full p-2`}
              >
                <RiEditCircleLine
                  className="w-6 h-6 cursor-pointer text-[#9588e8]"
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
                      ? "bg-[#1f1e25] hover:bg-gray-800"
                      : "bg-gray-200 hover:bg-gray-100"
                  } border-none rounded-full p-2`}
                  onClick={handleClickedCheckbox}
                >
                  {note.isImportant ? (
                    <FaStar
                      className={`w-6 h-6 cursor-pointer text-[#9588e8] `}
                    />
                  ) : (
                    <FaRegStar
                      className={`w-6 h-6 cursor-pointer text-[#9588e8] `}
                    />
                  )}
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
      {tags.map((tag, index) => (
        <span
          key={index}
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
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
    selectedNoteObject: { selectedNote, setSelectedNote },
  } = useGlobalContext();
  const { toast } = useToast();
  const [isDeleting, setIsDeleteing] = React.useState(false);

  const deleteNoteFunction = async () => {
    if (note.isDeleted) {
      setOpenConfirmationWindow(true);
      setSelectedNote(note);
      return;
    }
    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: true }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Optional: handle the updatedNote if needed
      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === note._id ? { ...note } : n))
      );

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
      // setSearchQuery("");
    } catch (error) {
      console.error("Error updating importance:", error); // Log the error to understand failures
    }
  };
  const permanentlyDeleteNote = async () => {
    if (selectedNote) {
      setIsDeleteing(true);
      try {
        const response = await fetch(
          `/api/snippets?snippetId=${selectedNote._id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //if the delte request was succesful update the local state
        const copyAllNotes = [...allNotes];
        const updateAllNotes = copyAllNotes.filter(
          (n) => n._id !== selectedNote._id
        );
        setAllNotes(updateAllNotes);
        setOpenConfirmationWindow(false);
        setSelectedNote(null);
        toast({
          title: "Snippet has been permanently deleted",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Snippet has Not been permanently deleted",
        });
      } finally {
        setIsDeleteing(false);
      }
    }
  };

  const resetNoteFunction = async () => {
    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: false }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Optional: handle the updatedNote if needed
      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === note._id ? { ...note } : n))
      );

      toast({
        title: "Note has been restored",
      });
    } catch (error) {
      console.error("Error updating importance:", error); // Log the error to understand failures
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
                      ? "bg-[#1f1e25] hover:bg-gray-800"
                      : "bg-gray-200 hover:bg-gray-100"
                  } border-none rounded-full p-2`}
                  onClick={resetNoteFunction}
                >
                  <MdOutlineRestore className="w-6 h-6 cursor-pointer text-[#9588e8]" />
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
                    ? "bg-[#1f1e25] hover:bg-gray-800"
                    : "bg-gray-200 hover:bg-gray-100"
                } border-none rounded-full p-2`}
                onClick={deleteNoteFunction}
              >
                <MdDeleteOutline className="w-6 h-6 cursor-pointer text-[#9588e8]" />
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
              {isDeleting ? "Deleting.." : "Delete"}
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
