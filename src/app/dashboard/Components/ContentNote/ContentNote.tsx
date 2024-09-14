import { useGlobalContext } from "@/ContextApi";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "../../../../assets/icons/close.svg";
import EditSectionIcon from "../../../../assets/icons/editsection.svg";
import CopyIcon from "../../../../assets/icons/copy.svg";
import DownArrowIcon from "../../../../assets/icons/downarrow.svg";
import CheckIcon from "../../../../assets/icons/check.svg";
import UpArrowIcon from "../../../../assets/icons/uparrow.svg";
import SearchIcon from "../../../../assets/icons/search.svg";
import { ImSpinner9 } from "react-icons/im";
import { BsLightningChargeFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import { allLanguages } from "@/app/localData/Languages";
import { debounce } from "lodash";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { getUserById } from "@/app/actions/user.actions";

export async function saveNoteInDB(
  note: SingleNoteType,
  isNew: boolean,
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >,
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>
) {
  const url = isNew ? "/api/snippets" : `/api/snippets?snippetId=${note._id}`;
  const method = isNew ? "POST" : "PUT";
  const { _id, ...noteData } = note;
  const body = isNew ? JSON.stringify(noteData) : JSON.stringify(note);
  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const savedNote = isNew ? { ...note, _id: data.notes._id } : note;
    console.log(saveNoteInDB);

    setAllNotes((prevNotes) => {
      const updatedNotes = isNew
        ? [...prevNotes, savedNote]
        : prevNotes.map((n) => (n._id === savedNote._id ? savedNote : n));

      return updatedNotes.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
    if (isNew) {
      setSingleNote(savedNote);
      setIsNewNote(false);
    }
  } catch (error) {
    console.log(error);
  }
}

const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    isMobileObject: { isMobile },
    selectedNoteObject: { selectedNote, setSelectedNote },
    darkModeObject: { darkMode },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedLanguageObject: { selectedLanguage },
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

  useEffect(() => {
    console.log("singleNote", singleNote);
    if (singleNote && singleNote.title !== "") {
      console.log("isNewNote", isNewNote);
      debouncedSaveNote(singleNote, isNewNote);
    }
  }, [singleNote, isNewNote]);
  const debouncedSaveNote = useMemo(
    () =>
      debounce((note: SingleNoteType, isNew: boolean) => {
        saveNoteInDB(note, isNew, setAllNotes, setSingleNote, setIsNewNote);
      }, 500),
    []
  );
  useEffect(() => {
    if (selectedLanguage && singleNote) {
      const newLanguage = selectedLanguage.name;
      const updateSingleNote: SingleNoteType = {
        ...singleNote,
        language: newLanguage,
      };
      const updateAllNotes = allNotes.map((note) => {
        if (note._id === singleNote._id) {
          return updateSingleNote;
        }
        return note;
      });
      setAllNotes(updateAllNotes);
      setSingleNote(updateSingleNote);
    }
  }, [selectedLanguage]);

  return (
    <div
      className={`h-[1130px] ${
        darkMode[1].isSelected ? "bg-[#151419]" : "bg-white border"
      } ${
        isMobile ? "w-4/5 mt-[80%] shadow-lg " : "w-1/2"
      } z-50  p-3 rounded-lg ${openContentNote ? "block " : "hidden"} ${
        isMobile
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          : ""
      }`}
    >
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
              <CloseIcon
                onClick={() => {
                  setIsNewNote(false);
                  setOpenContentNote(false);
                }}
                className="cursor-pointer w-6 h-6 "
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={`${
              darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
            }`}
          >
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {singleNote && (
        <div>
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
          <Description singleNote={singleNote} setSingleNote={setSingleNote} />
          <CodeBlock singleNote={singleNote} setSingleNote={setSingleNote} />
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
    isNewNoteObject: { isNewNote, setIsNewNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [onFocus, setOnFocus] = useState(false);

  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);
    const newAllNotes = allNotes.map((note) => {
      if (note._id === newSingleNote._id) {
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
    <div className="flex justify-between gap-8">
      <div className="flex flex-col gap-2 w-full p-3">
        <Label
          htmlFor="message"
          className={`${darkMode[1].isSelected ? "text-white" : ""} text-lg`}
        >
          Title
        </Label>
        <Textarea
          onChange={onUpdateTitle}
          onKeyDown={handleKeyDown}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onMouseEnter={() => setOnFocus(true)}
          onMouseLeave={() => setOnFocus(false)}
          placeholder="New Title.."
          value={singleNote.title}
          className={`${
            darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : "text-gray-500"
          } ${darkMode[1].isSelected && onFocus ? "border-[#9588e8]" : ""}`}
        />
      </div>
    </div>
  );
};

const NoteTags = ({
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
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  function onClickedTag(tag: SingleTagType) {
    const newTags = singleNote.tags.some((t) => t._id === tag._id)
      ? singleNote.tags.filter((t) => t._id !== tag._id)
      : [...singleNote.tags, tag];

    const newSingleNote = { ...singleNote, tags: newTags };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) =>
      note._id === newSingleNote._id ? newSingleNote : note
    );
    setAllNotes(newAllNotes);
  }

  return (
    <div className="flex text-[13px] items-center gap-2 p-3">
      <div
        className="flex justify-between w-full flex-col gap-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!isOpened) setHovered(false);
        }}
      >
        <Label
          htmlFor="message"
          className={`${darkMode[1].isSelected ? "text-white" : ""} text-lg`}
        >
          Add Tags
        </Label>
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
              key={tag._id}
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
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <DropdownMenu open={isOpened} onOpenChange={setIsOpened}>
      <DropdownMenuTrigger>
        <EditSectionIcon className="cursor-pointer w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`flex flex-col gap-1 ${
          darkMode[1].isSelected ? "bg-[#1f1e25] border-none" : ""
        }`}
      >
        {allTags.map((tag) => (
          <DropdownMenuItem
            onClick={() => onClickedTag(tag)}
            className={`${
              selectedTags.some(
                (t) => t.name.toLowerCase() === tag.name.toLowerCase()
              )
                ? "bg-[#d5d0f8] text-[#9588e8]"
                : darkMode[1].isSelected
                ? "text-white"
                : ""
            }`}
            key={tag._id}
          >
            {tag.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Description = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: (value: SingleNoteType) => void;
}) => {
  const {
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function onUpdateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newSingleNote = { ...singleNote, description: event.target.value };

    setSingleNote(newSingleNote);
    const newAllNotes = allNotes.map((note) => {
      if (note._id === newSingleNote._id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  }

  return (
    <div className="p-3">
      <div className="grid w-full gap-1.5">
        <Label
          htmlFor="message"
          className={`${darkMode[1].isSelected ? "text-white" : ""} text-lg`}
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
            darkMode[1].isSelected && (isHovered || isFocused)
              ? "border-[#9588e8]"
              : ""
          }`}
        />
      </div>
    </div>
  );
};
const CodeBlock: React.FC<{
  singleNote: SingleNoteType;
  setSingleNote: (note: SingleNoteType) => void;
}> = ({ singleNote, setSingleNote }) => {
  const {
    darkModeObject: { darkMode },
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { userId } = useAuth();
  const [user, setUser] = React.useState<any | null>(null);
  const [snippetCredit, setSnippetCredit] = useState(() => {
    const storedCredit = localStorage.getItem("snippetCredit");
    return storedCredit ? parseInt(storedCredit, 10) : 0;
  });
  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await getUserById(userId);
        setUser(userData);
        const storedCredit = localStorage.getItem("snippetCredit");
        if (storedCredit === null) {
          setSnippetCredit(Math.floor(userData?.creditBalance / 2) || 0);
          localStorage.setItem(
            "snippetCredit",
            (Math.floor(userData?.creditBalance / 2) || 0).toString()
          );
        }
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("snippetCredit", snippetCredit.toString());
  }, [snippetCredit]);

  useEffect(() => {
    if (singleNote.language) {
      const findLanguage = allLanguages.find(
        (language) =>
          language.name.toLowerCase() === singleNote.language.toLowerCase()
      );
      if (findLanguage) {
        setSelectedLanguage(findLanguage);
      }
    } else {
      setSelectedLanguage(allLanguages[0]);
    }
  }, [singleNote, setSelectedLanguage]);

  const handleCodeChange = (code: string) => {
    const updatedNote = { ...singleNote, code };
    setSingleNote(updatedNote);
    setAllNotes(
      allNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  const copyCode = () => {
    navigator.clipboard.writeText(singleNote.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1200);
  };

  const generateCode = async () => {
    if (snippetCredit <= 0) {
      toast({
        title: "Error",
        description: "You have no credits left to generate code.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch("/api/code-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: singleNote.title,
          description: singleNote.description,
          language: selectedLanguage?.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const data = await response.json();

      if (data.suggestedMessages) {
        handleCodeChange(data.suggestedMessages);
        setSnippetCredit((prevCredit) => {
          const newCredit = prevCredit - 1;
          localStorage.setItem("snippetCredit", newCredit.toString());
          return newCredit;
        });
        toast({
          title: "Success",
          description: "Code generated successfully!",
        });
      } else {
        throw new Error("No generated code in the response");
      }
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="text-[12px] flex flex-col gap-2 p-3">
      <div className="flex justify-between items-center">
        <Label
          htmlFor="code"
          className={`${darkMode[1].isSelected ? "text-white" : ""} text-lg`}
        >
          Code
        </Label>
        <Button
          onClick={generateCode}
          className="bg-[#9588e8] hover:bg-[#a297ec]"
          disabled={isGenerating || snippetCredit <= 0}
        >
          {isGenerating ? (
            <>
              <ImSpinner9 className="mr-2 h-4 w-4 animate-spin text-white" />
              Generating...
            </>
          ) : snippetCredit <= 0 ? (
            <>
              <BsLightningChargeFill className="mr-2 h-4 w-4 text-black" />
              <span className="text-black mr-2">
                {snippetCredit}/{Math.floor(user?.creditBalance / 2) || 0}
              </span>{" "}
              No credits left
            </>
          ) : (
            <>
              <BsLightningChargeFill className="mr-2 h-4 w-4 text-black" />
              <span className="text-black mr-2">
                {snippetCredit}/{Math.floor(user?.creditBalance / 2) || 0}
              </span>{" "}
              Generate Code
            </>
          )}
        </Button>
      </div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${
          isHovered ? "border-[#9588e8]" : ""
        } border rounded-lg p-3 pt-16 w-full relative`}
      >
        {/* Copy button */}
        <div className="absolute top-4 right-6 z-50 rounded-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={copyCode}
                  className={`${
                    darkMode[1].isSelected
                      ? "bg-[#151419] hover:bg-gray-800"
                      : "bg-white hover:bg-gray-200"
                  } border-none rounded-full p-2`}
                >
                  {isCopied ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <CopyIcon className="w-6 h-6" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className={`${
                  darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
                }`}
              >
                <p>{isCopied ? "Copied!" : "Copy Code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Language selector */}
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          darkMode={darkMode}
        />

        {/* Code editor */}
        <AceEditor
          placeholder="Write your code"
          mode={selectedLanguage?.name.toLowerCase() || "javascript"}
          theme={darkMode[1].isSelected ? "monokai" : "github"}
          name="code-editor"
          width="100%"
          height="580px"
          fontSize={14}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          value={singleNote.code}
          onChange={handleCodeChange}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: false,
            tabSize: 2,
          }}
          className={
            darkMode[1].isSelected ? "bg-[#1f1e25] text-white rounded-lg" : ""
          }
        />
      </div>
    </div>
  );
};
interface LanguageSelectorProps {
  selectedLanguage: SingleCodeLanguageType | null;
  setSelectedLanguage: (language: SingleCodeLanguageType) => void;
  darkMode: { isSelected: boolean }[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  darkMode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
  const textRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDropdownOpen) {
      textRef.current?.focus();
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const filtered = allLanguages.filter((language) =>
      language.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLanguages(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: SingleCodeLanguageType) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex absolute top-1 gap-2 justify-between p-[6px] px-3 left-3 items-center text-gray-500 mt-3 text-[12px] rounded-md cursor-pointer ${
            darkMode[1].isSelected
              ? "bg-[#1f1e25] text-white"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <div className="flex gap-2 items-center">
            {selectedLanguage?.icon}
            <span className="mt-[1px]">
              {selectedLanguage?.name || "Select language"}
            </span>
          </div>
          {isDropdownOpen ? (
            <UpArrowIcon className="w-3 h-3" />
          ) : (
            <DownArrowIcon className="w-3 h-3" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={menuRef}
        className={`${
          darkMode[1].isSelected ? "bg-[#151419] border" : "bg-slate-100"
        } h-[220px] w-[250px] rounded-md p-3 text-slate-400`}
      >
        <div
          className={`${
            darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-slate-200"
          } p-1 rounded-md flex gap-1 mb-1`}
        >
          <SearchIcon className="h-6 w-6 mr-1" />
          <input
            ref={textRef}
            placeholder="Search Language"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className={`outline-none ${
              darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-transparent"
            } text-gray-500 w-full`}
          />
        </div>
        <div className="h-40 overflow-y-auto">
          {filteredLanguages.map((language) => (
            <DropdownMenuItem
              key={language.id}
              onSelect={() => handleLanguageSelect(language)}
              className={`flex mb-2 ${
                selectedLanguage?.name.toLowerCase() ===
                language.name.toLowerCase()
                  ? "bg-slate-200"
                  : ""
              } gap-2
                ${
                  darkMode[1].isSelected
                    ? "hover:bg-[#1f1e25]"
                    : "hover:bg-slate-200"
                } bg-transparent p-[6px] rounded-md items-center cursor-pointer`}
            >
              {language.icon}
              <span className="mt-[1px]">{language.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//   singleNote,
//   setSingleNote,
// }: {
//   singleNote: SingleNoteType;
//   setSingleNote: (value: SingleNoteType) => void;
// }) => {
//   const {
//     darkModeObject: { darkMode },
//     selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
//     selectedNoteObject: { selectedNote, setSelectedNote },
//     allNotesObject: { allNotes, setAllNotes },
//   } = useGlobalContext();

//   const [isHovered, setIsHovered] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isCopied, seIsCopied] = useState(false);
//   const [isSuggesting, setIsSuggesting] = useState(false);
//   const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
//   useEffect(() => {
//     if (selectedNote) {
//       //if selectedNote is not empty when we add new snippet
//       //set the selectedlanguage to the select language text
//       if (selectedNote.language === "") {
//         setSelectedLanguage(allLanguages[0]);
//         return;
//       }
//       const findLanguage = allLanguages.find(
//         (language) =>
//           language.name.toLocaleLowerCase() ===
//           selectedNote.language.toLocaleLowerCase()
//       );

//       if (findLanguage) {
//         setSelectedLanguage(findLanguage);
//       }
//     }
//   }, [selectedNote]);
//   function handledChange(code: string) {
//     const newSingleNote = { ...singleNote, code: code };

//     const updateAllNotes = allNotes.map((note) => {
//       if (note._id === newSingleNote._id) {
//         return newSingleNote;
//       }
//       return note;
//     });
//     setAllNotes(updateAllNotes);
//     setSingleNote(newSingleNote);
//   }
//   function clickedCopyBtn() {
//     navigator.clipboard.writeText(singleNote.code);
//     seIsCopied(true);
//     setTimeout(() => {
//       seIsCopied(false);
//     }, 1200);
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   const fetchSuggestedMessages = async () => {
//     setIsSuggesting(true);
//     try {
//       const response = await fetch("/api/code-generation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
//       // console.log("Suggested Messages Response:", response.data);

//       if (response.data.suggestedMessages) {
//         const message = response.data.suggestedMessages;
//         setSuggestedMessages(message);
//         //  console.log("Parsed Suggested Messages:", messageArray);
//       } else {
//         console.error("No suggested messages in the response");
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch suggested messages. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSuggesting(false);
//     }
//   };
//   const LanguageMenu = () => {
//     const textRef = useRef<HTMLInputElement>(null);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//       textRef.current?.focus();
//     }, [isDropdownOpen]);

//     //Filtering Logic
//     const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
//     const menuRef = useRef<HTMLDivElement>(null);
//     const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setSearchQuery(event.target.value.toLowerCase());
//     };
//     useEffect(() => {
//       //update filterlanguage based on search
//       const filtered = allLanguages.filter((language) =>
//         language.name.toLowerCase().includes(searchQuery)
//       );
//       setFilteredLanguages(filtered);
//     }, [searchQuery]);

//     const handleClickedOutSide = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     useEffect(() => {
//       document.addEventListener("mousedown", handleClickedOutSide);
//       return () =>
//         document.removeEventListener("mousedown", handleClickedOutSide);
//     }, []);

//     function clickedLanguage(language: SingleCodeLanguageType) {
//       setSelectedLanguage(language);
//       setIsDropdownOpen(false);
//     }

//     return (
//       <div
//         ref={menuRef}
//         className={`${
//           darkMode[1].isSelected ? "bg-[#151419] border" : "bg-slate-100"
//         } h-[220px] absolute flex-col z-50 gap-2 p-3 w-[250px] rounded-md left-3 text-slate-400 flex `}
//       >
//         <div
//           className={`${
//             darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-slate-200"
//           } p-1 rounded-md flex gap-1 mb-1`}
//         >
//           <SearchIcon className="h-6 w-6 mr-1" />
//           <input
//             ref={textRef}
//             placeholder="Search Language"
//             onChange={onChangeSearch}
//             value={searchQuery}
//             className={`outline-none ${
//               darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-transparent"
//             } text-gray-500`}
//           />
//         </div>

//         <div className="h-40 overflow-x-auto">
//           {filteredLanguages.map((language) => (
//             <div
//               onClick={() => clickedLanguage(language)}
//               key={language.id}
//               className={`flex mb-2 ${
//                 selectedLanguage?.name.toLocaleLowerCase() ===
//                 language.name.toLocaleLowerCase()
//                   ? "bg-slate-200"
//                   : ""
//               } gap-2
//               ${
//                 darkMode[1].isSelected
//                   ? "hover:bg-[#1f1e25]"
//                   : "hover:bg-slate-200"
//               }  bg-transparent p-[6px] rounded-md items-center cursor-pointer`}
//             >
//               {language.icon}
//               <span className="mt-[1px]">{language.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="text-[12px] flex flex-col gap-2 p-3">
//       <div className="flex justify-between">
//         <Label
//           htmlFor="message"
//           className={`${darkMode[1].isSelected ? "text-white" : ""} text-lg`}
//         >
//           Code
//         </Label>
//         <Button
//           onClick={fetchSuggestedMessages}
//           className="bg-[#9588e8] hover:bg-[#a297ec]"
//           disabled={isSuggesting}
//         >
//           {" "}
//           {isSuggesting ? (
//             <>
//               <ImSpinner9 className="mr-2 h-4 w-4 animate-spin" />
//               Loading...
//             </>
//           ) : (
//             "Generate Code"
//           )}
//         </Button>
//       </div>
//       <div
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className={`${
//           isHovered ? "border-[#9588e8]" : ""
//         } border rounded-lg p-3 pt-16 w-full relative`}
//       >
//         <div className={` absolute top-4 right-4 z-50 rounded-full `}>
//           {isCopied ? (
//             <CheckIcon className="w-6 h-6" />
//           ) : (
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     className={`${
//                       darkMode[1].isSelected
//                         ? "bg-[#151419] hover:bg-gray-800"
//                         : "bg-white hover:bg-gray-200"
//                     }  border-none rounded-full p-2`}
//                   >
//                     <CopyIcon
//                       onClick={() => clickedCopyBtn()}
//                       className="cursor-pointer w-6 h-6 "
//                     />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent
//                   className={`${
//                     darkMode[1].isSelected ? "bg-[#1f1e25] text-white" : ""
//                   }`}
//                 >
//                   <p>Copy Code</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           )}
//         </div>
//         <div
//           onClick={toggleDropdown}
//           className={`flex absolute top-1 gap-2 justify-between p-[6px] px-3 left-3 items-center text-gray-500 mt-3 text-[12px] rounded-md cursor-pointer ${
//             darkMode[1].isSelected
//               ? "bg-[#1f1e25] text-white"
//               : "bg-slate-100 text-slate-400"
//           }`}
//         >
//           <div className="flex gap-2 items-center">
//             {selectedLanguage?.icon}
//             <span className="mt-[1px]">
//               {selectedLanguage?.name
//                 ? selectedLanguage.name
//                 : "Select language"}
//             </span>
//           </div>
//           {isDropdownOpen ? (
//             <UpArrowIcon className="w-3 h-3 " />
//           ) : (
//             <DownArrowIcon className="w-3 h-3" />
//           )}
//         </div>
//         {isDropdownOpen && <LanguageMenu />}

//         <AceEditor
//           placeholder="Placeholder Text"
//           mode="javascript"
//           theme="tomorrow"
//           name="blah2"
//           width="100%"
//           height="580px"
//           fontSize={14}
//           lineHeight={19}
//           showPrintMargin={true}
//           showGutter={false}
//           highlightActiveLine={true}
//           className={`${
//             darkMode[1].isSelected ? "bg-[#1f1e25] text-white rounded-lg" : ""
//           }`}
//           value={singleNote.code}
//           onChange={handledChange}
//           setOptions={{
//             enableBasicAutocompletion: true,
//             enableLiveAutocompletion: false,
//             enableSnippets: false,
//             showLineNumbers: false,
//             tabSize: 2,
//           }}
//         />
//       </div>
//     </div>
//   );
// };
