import { useGlobalContext } from "@/ContextApi";
import deleteIcon from "../../../../../assets/icons/delete.png";
import importantIcon from "../../../../../assets/icons/important.png";
import EditIcon from "../../../../../assets/icons/edit.svg"
import JavaScriptIcon from "../../../../../assets/icons/javascript.png";
import Image from "next/image";
import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
    openContentNoteObject: { openContentNote }
  } = useGlobalContext();
  return (
    <div className={ `mt-5 gap-4 ${openContentNote ? "" : "flex flex-wrap"}`}>
      {allNotes.map((note, index) => (
        <div key={index}>
          <SingleNote note={note} />
        </div>
      ))}
    </div>
  );
};

export default AllNotesSection



const SingleNote = ({note}:{note: SingleNoteType}) => {
    const {
      darkModeObject: { darkMode },
      openContentNoteObject: { openContentNote }
  } = useGlobalContext();
  
  const { title, createdAt, tags, description, code, isImportant, language } = note;

  return (
    <div
      className={`${
        darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"} ${openContentNote ? "w-full" : "w-[366px]"} max-sm:w-full rounded-lg py-4`}
    >
      <NoteHeader title={title} isImportant={isImportant} note={note}/>
      <NoteDate createdAt={createdAt} />
      <NoteTags tags={tags} />
      <NoteDescription description={description} />
      <CodeBlock language={language} code={code} />
      <NotFooter language={language}/>
    </div>
  );
}


const NoteHeader = ({ title, isImportant, note }: { title: string; isImportant: boolean; note: SingleNoteType }) => {
  const { 
    openContentNoteObject: { setOpenContentNote },
    selectedNoteObject: { setSelectedNote }
  } = useGlobalContext();

  const handleEditClick = () => {
    setSelectedNote(note);
    setOpenContentNote(true);
  };

  return (
    <div className="flex justify-between mx-4">
      <span className="font-bold text-lg w-[87%]">{title}</span>
      <div className="flex gap-2">
        <EditIcon
          className="w-7 h-7 cursor-pointer"
          onClick={handleEditClick}
        />
        <Image
          src={importantIcon}
          alt="ImportantLogo"
          className="h-6 w-6 cursor-pointer"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}

const NoteDate = ({createdAt}: { createdAt : string}) => {
    return (
        <div className="text-gray-400 text-[11px] flex gap-1 font-light mx-4 mt-1">
        <span>{createdAt}</span>
      </div>
    )
}
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
const NoteDescription = ({description}: {description: string}) => {
    const {
        darkModeObject: { darkMode },
      } = useGlobalContext();
    return (
        <div className={`${darkMode[1].isSelected ? " text-white" : ""} text-gray-400 text-[13px] mt-4 mx-4`}>
           {description}
      </div>
    )
}
interface CodeBlockProps{
  language: string;
  code: string;
  }
const CodeBlock: React.FC<CodeBlockProps> = ({ language,code}) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  
  return (
    <div className="rounded-md overflow-hidden text-sm">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
const NotFooter = ({language}: {language: string}) => {
    return (
      <div className="flex justify-between items-center text-[13px] text-gray-400 mx-4 mt-3">
        <div className="flex items-center">
          <Image
            src={JavaScriptIcon}
            alt="JavaScriptLogo"
            className="h-6 w-6 mr-1"
            width={20}
            height={20}
          />
          <span>{ language}</span>
        </div>
        <Image
          src={deleteIcon}
          alt="DeleteLogo"
          className="h-6 w-6 cursor-pointer"
          width={20}
          height={20}
        />
      </div>
    )
  }