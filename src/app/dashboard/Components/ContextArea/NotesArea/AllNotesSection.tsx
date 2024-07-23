import { useGlobalContext } from "@/ContextApi";
import DeleteIcon from "../../../../../assets/icons/delete.svg";
import ImportantIcon from "../../../../../assets/icons/important.svg";
import EditIcon from "../../../../../assets/icons/edit.svg";
import React, { useEffect } from "react";
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

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
    openContentNoteObject: { openContentNote },
  } = useGlobalContext();
  useEffect(() => {
    // Any actions you want to perform when allNotes changes
  }, [allNotes]);
  return (
    <div className={`mt-5 gap-4 ${openContentNote ? "" : "flex flex-wrap gap-4"}`}>
      {allNotes.map((note, index) => (
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
      <NotFooter language={language} />
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
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const handleEditClick = () => {
    setSelectedNote(note);
    setOpenContentNote(true);
  };

  return (
    <div className="flex justify-between items-center mx-4">
      <span className="font-bold text-lg w-[87%]">{title}</span>
      <div className="flex gap-1">

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className={`${
        darkMode[1].isSelected ? "bg-[#151419] hover:bg-gray-800" : "bg-white hover:bg-gray-200"}  border-none rounded-full p-2`}>
                <EditIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleEditClick}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${
        darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""}`}>
              <p>Edit Note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className={`${
        darkMode[1].isSelected ? "bg-[#151419] hover:bg-gray-800" : "bg-white hover:bg-gray-200"}  border-none rounded-full p-2`}>
                <ImportantIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleEditClick}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${
        darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""}`}>
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
      <span>{createdAt}</span>
    </div>
  );
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
      {description}
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
    <div className="rounded-md overflow-hidden text-sm px-4">
      <SyntaxHighlighter
        language={"javascript"}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
const NotFooter = ({ language }: { language: string }) => {
  const {
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center text-[13px] text-gray-400 mx-4 mt-3">
      <div className="flex items-center">
        {getLanguageIcon(language)}
        <span>{language}</span>
      </div>
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className={`${
        darkMode[1].isSelected ? "bg-[#151419] hover:bg-gray-800" : "bg-white hover:bg-gray-200"}  border-none rounded-full p-2`}>
             <DeleteIcon className="w-6 h-6 cursor-pointer" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${
        darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""}`}>
              <p>Delete Note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      
    </div>
  );
};
