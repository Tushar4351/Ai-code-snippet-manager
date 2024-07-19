import { useGlobalContext } from "@/ContextApi";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../assets/icons/close.svg";
import EditSectionIcon from "../../../assets/icons/editsection.svg";
import CopyIcon from "../../../assets/icons/copy.svg";
import javascriptIcon from "../../../assets/icons/javascript.png";
import DownArrowIcon from "../../../assets/icons/downarrow.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";




const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    isMobileObject: { isMobile },
    selectedNoteObject: { selectedNote, setSelectedNote },
    darkModeObject: { darkMode },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(
    undefined
  );
  useEffect(() => {
    if (openContentNote) {
      if (selectedNote) {
        setSingleNote(selectedNote);
      }
    }
  }, [openContentNote, selectedNote]);
  console.log(singleNote);

  //This useeffect is used to add the singlenote to the allnotes only if the singlenote is not empty
  useEffect(() => {
    //if isnewnote is true
    if (isNewNote) {
      //if the single note is not empty
      if (singleNote && singleNote.title != "") {
        //add the single note to the allnotes
        setAllNotes([...allNotes, singleNote]);
        //set the isnewnote false
        setIsNewNote(false);
      }
    }
  }, [singleNote]);
  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-[#151419]" :"bg-white border"} ${
        isMobile ? "w-4/5" : "w-1/2"
      } z-50  p-3 rounded-lg ${
        openContentNote ? "block" : "hidden"
      } h-[700px] ${
        isMobile
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          : ""
      }`}
    >
      {singleNote && (
        <div>
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
          <Description singleNote={singleNote} setSingleNote={setSingleNote} />
          <CodeBlock/>
        </div>
      )}
    </div>
  );
};

export default ContentNote;

const ContentNoteHeader = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) => {
  const {
    allNotesObject: { allNotes, setAllNotes },
    openContentNoteObject: { setOpenContentNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
  } = useGlobalContext();

  const [onFocus, setOnFocus] = useState(false);

  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    //  console.log(singleNote);
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);
    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  return (
    <div className="flex justify-between gap-8 mb-4">
      <div className="flex gap-2 w-full">
        <textarea
          onChange={onUpdateTitle}
          onKeyDown={handleKeyDown}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onMouseEnter={() => setOnFocus(true)}
          onMouseLeave={() => setOnFocus(false)}
          placeholder="New Title.."
          value={singleNote.title}
          className="font-bold text-xl outline-none resize-none h-auto overflow-hidden w-full"
        />
      </div>
      <CloseIcon
        onClick={() => {
          setIsNewNote(false);
          setOpenContentNote(false);
        }}
        className="text-gray-500 cursor-pointer w-6 h-6"
      />
    </div>
  );
};

const NoteTags = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>;
}) => {
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  function onClickedTag(tag: SingleTagType) {
    const newTags = singleNote.tags.some((t) => t.id === tag.id)
      ? singleNote.tags.filter((t) => t.id !== tag.id)
      : [...singleNote.tags, tag];

    const newSingleNote = { ...singleNote, tags: newTags };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) =>
      note.id === newSingleNote.id ? newSingleNote : note
    );
    setAllNotes(newAllNotes);
  }

  return (
    <div className="flex text-[13px] items-center gap-2">
      <div
        className="flex justify-between w-full flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!isOpened) setHovered(false);
        }}
      >
        <div className="flex gap-2 items-center select-none flex-wrap">
          {singleNote.tags.length === 0 && (
            <div>
              <span className="bg-[#d5d0f8] px-2 p-1 text-xs rounded-md text-[#9588e8] cursor-pointer">
                No Tags
              </span>
            </div>
          )}

          {singleNote.tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-[#d5d0f8] px-2 p-1 text-xs rounded-md text-[#9588e8] cursor-pointer"
            >
              {tag.name}
            </div>
          ))}
          {hovered && (
            <TagsMenu
              onClickedTag={onClickedTag}
              isOpened={isOpened}
              setIsOpened={setIsOpened}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TagsMenu = ({
  isOpened,
  setIsOpened,
  onClickedTag,
}: {
  isOpened: boolean;
  setIsOpened: any;
  onClickedTag: (tag: SingleTagType) => void;
}) => {
  const {
    allTagsObject: { allTags },
    selectedTagObject: { selectedTags },
  } = useGlobalContext();

  return (
    <DropdownMenu open={isOpened} onOpenChange={setIsOpened}>
      <DropdownMenuTrigger>
        <EditSectionIcon className="cursor-pointer w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1">
        {allTags.map((tag) => (
          <DropdownMenuItem
            onClick={() => onClickedTag(tag)}
            className={`${
              selectedTags.some(
                (t) => t.name.toLowerCase() === tag.name.toLocaleLowerCase()
              )
                ? "bg-[#d5d0f8] text-[#9588e8]"
                : ""
            }` }
            key={tag.id}
          >
            {tag.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};




const Description = ({ singleNote, setSingleNote }: { singleNote: SingleNoteType; setSingleNote: (value:SingleNoteType)=> void}) => {
  const {
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function onUpdateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    //  console.log(singleNote);
    const newSingleNote = { ...singleNote, description: event.target.value };

    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  }

  return (
    <div className="mt-8">
      <div className="grid w-full gap-1.5">
        <Label
          htmlFor="message"
          className={`${darkMode[1].isSelected ? "text-white" : ""}`}
        >
          Description
        </Label>
        <Textarea
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onChange={onUpdateDescription}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={singleNote.description}
          placeholder="Type your Description here."
          className={`${
            darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : "text-gray-500"
          } ${
            darkMode[1].isSelected && (isHovered || isFocused) ? "border-[#9588e8]" : ""
          }`}
        />
      </div>
    </div>
  );
};




const CodeBlock = () => {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Textarea Hover and Focus Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            margin: 20px;
        }

        .dark-mode {
            background-color: #1f1e25;
            color: white;
        }

        .dark-mode textarea {
            background-color: #1f1e25;
            color: white;
            border: 1px solid #ccc;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }

        .dark-mode textarea:hover,
        .dark-mode textarea:focus {
            border-color: #9588e8;
        }
    </style>
</head>
<body>
    <div class="container dark-mode">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Type your Description here."></textarea>
    </div>
</body>
</html>
`);
  const {
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="text-[12px] text-gray-400 mt-8">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${
          isHovered ? "border-[#9588e8]" : ""
        } border rounded-lg p-3 pt-16 w-full relative`}
      >
        <div className="absolute top-4 right-4 z-50">
        <CopyIcon className="w-6 h-6" />
        </div>
        <div className={`flex absolute top-1 gap-2 justify-between p-[6px] px-3 left-3 items-center text-gray-500 mt-3 text-[12px] rounded-md bg-slate-100 cursor-pointer${
            darkMode[1].isSelected? "bg-slate-600 text-white": "bg-slate-100 text-slate-400"
          }`} >
          <div className="flex gap-2 items-center">
            <Image
              src={javascriptIcon}
              alt="JavaScriptLogo"
              className="h-6 w-6 mr-1"
              width={20}
              height={20}
            />
            <span className="mt-[1px]">JavaScript</span>
          </div>
         <DownArrowIcon className="w-5 h-5"/>
        </div>
        <AceEditor
  placeholder="Placeholder Text"
  mode="javascript"
     theme="tomorrow"
          name="blah2"
          width="100%"
          height="300px"
  fontSize={14}
  lineHeight={19}
  showPrintMargin={true}
  showGutter={false}
          highlightActiveLine={true}
          className={`
            ${darkMode[1].isSelected ? "bg-transparent text-white" : "bg-white"}`}
  value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
setOptions={{
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: false,
  enableSnippets: false,
  showLineNumbers: false,
  tabSize: 2,
  }}/>
      </div>
    </div>
  );
}


