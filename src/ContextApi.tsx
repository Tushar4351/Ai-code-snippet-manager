"use client";

import { useContext, createContext, useState, useEffect } from "react";
import SnippetIcon from "./assets/icons/snippet.svg";
import ImportantIcon from "./assets/icons/important.svg";
import DeleteIcon from "./assets/icons/delete.svg";
import { v4 as uuidv4 } from "uuid";
import nightIcon from "./assets/icons/night.png";
import sunIcon from "./assets/icons/sun.png";
import { StaticImageData } from "next/image";

interface DarkModeType {
  id: number;
  name: string;
  isSelected: boolean;
  icon: StaticImageData;
}

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  darkModeObject: {
    darkMode: DarkModeType[];
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
  };

  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openContentNoteObject: {
    openContentNote: boolean;
    setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isMobileObject: {
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allNotesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  };
  selectedNoteObject: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<
      React.SetStateAction<SingleNoteType | null>
    >;
  };
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allTagsObject: {
    allTags: SingleTagType[];
    setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
  selectedTagObject: {
    selectedTags: SingleTagType[];
    setSelectedTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
  selectedLanguageObject: {
    selectedLanguage: SingleCodeLanguageType | null;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<SingleCodeLanguageType | null>>;
  }
}
const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
  openContentNoteObject: {
    openContentNote: false,
    setOpenContentNote: () => {},
  },
  isMobileObject: {
    isMobile: false,
    setIsMobile: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },
  selectedNoteObject: {
    selectedNote: null,
    setSelectedNote: () => {},
  },
  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
  },
  allTagsObject: {
    allTags: [],
    setAllTags: () => {},
  },
  selectedTagObject: {
    selectedTags: [],
    setSelectedTags: () => {},
  },
  selectedLanguageObject: {
    selectedLanguage: null,
    setSelectedLanguage: () => {},
  }
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "Snippets",
      isSelected: true,
      icon: <SnippetIcon className="h-6 w-6 cursor-pointer"/>,
    },
    {
      id: 2,
      name: "Important",
      isSelected: false,
      icon:  <ImportantIcon className="h-6 w-6 cursor-pointer"/>,
    },
    {
      id: 3,
      name: "Delete",
      isSelected: false,
      icon: <DeleteIcon className="w-6 h-6 cursor-pointer"/>,
    },
  ]);
  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      name: "Dark Mode",
      isSelected: true,
      icon: sunIcon,
    },
    {
      id: 2,
      name: "Light Mode",
      isSelected: false,
      icon: nightIcon,
    },
  ]);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [openContentNote, setOpenContentNote] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
  const [allTags, setAllTags] = useState<SingleTagType[]>([]);
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SingleTagType[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<SingleCodeLanguageType | null>(null)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function updateAllNotes() {
      const allNotes = [
        {
          id: uuidv4(),
          title: "Introduction to JavaScript",
          isImportant: true,
          tags: [
            { id: uuidv4(), name: "tag1" },
            { id: uuidv4(), name: "tag2" },
            { id: uuidv4(), name: "tag3" },
          ],
          description:
            "A basic introduction to JavaScript programming language.",
          code: `
import React from "react";
            
function HelloWorld() {
return <h1>Hello World</h1>;
}
            
export default HelloWorld;
          `,
          language: "JavaScript",
          createdAt: "2023-07-01T10:00:00Z",
        },
        {
          id: uuidv4(),
          title: "JavaScript for Data Science",
          isImportant: false,
          tags: [
            { id: uuidv4(), name: "tag1" },
            { id: uuidv4(), name: "tag2" },
            { id: uuidv4(), name: "tag3" },
          ],
          description: "Using JavaScript for data science with React.",
          code: `
  import React from "react";
            
  function HelloWorld() {
  return <h1>Hello World</h1>;
  }
            
  export default HelloWorld;
          `,
          language: "JavaScript",
          createdAt: "2023-07-02T14:30:00Z",
        },
        {
          id: uuidv4(),
          title: "JavaScript Flexbox Layout",
          isImportant: true,
          tags: [
            { id: uuidv4(), name: "tag1" },
            { id: uuidv4(), name: "tag2" },
            { id: uuidv4(), name: "tag3" },
          ],

          description:
            "A guide to CSS Flexbox layout using JavaScript and React.",
          code: `
            import React from "react";
            
            function HelloWorld() {
              return <h1>Hello World</h1>;
            }
            
            export default HelloWorld;
          `,
          language: "JavaScript",
          createdAt: "2023-07-03T09:00:00Z",
        },
        {
          id: uuidv4(),
          title: "JavaScript Basics",
          isImportant: false,
          tags: [
            { id: uuidv4(), name: "tag1" },
            { id: uuidv4(), name: "tag2" },
            { id: uuidv4(), name: "tag3" },
          ],
          description: "Basic JavaScript concepts for beginners using React.",
          code: `
            import React from "react";
            
            function HelloWorld() {
              return <h1>Hello World</h1>;
            }
            
            export default HelloWorld;
          `,
          language: "JavaScript",
          createdAt: "2023-07-04T12:15:00Z",
        },
      ];

      setTimeout(() => {
        setAllNotes(allNotes);
      }, 1200);
    }
    function updateAllTags() {
      const allTags = [
        {
          id: uuidv4(),
          name: "tag1",
        },
        {
          id: uuidv4(),
          name: "tag2",
        },
        {
          id: uuidv4(),
          name: "tag3",
        },
        {
          id: uuidv4(),
          name: "tag4",
        },
        {
          id: uuidv4(),
          name: "tag5",
        },
        {
          id: uuidv4(),
          name: "tag6",
        },
        {
          id: uuidv4(),
          name: "tag7",
        },
      ];
      setAllTags(allTags);
    }
    updateAllTags();
    updateAllNotes();
  }, []);

  useEffect(() => {
    setSelectedTags(selectedNote?.tags || []);
  }, [selectedNote]);

  //this useeffect will check the title and the description and the code are empty.if yes it will be removed from the alll noted array to avoid havving empty notes
  useEffect(() => {
    if (openContentNote === false) {
      
    }
    const filteredNotes = allNotes.filter((note) => {
      return (
        note.title.trim() !== "" ||
        note.description.trim() !== "" ||
        note.code.trim() !== ""
      );
    });
    setAllNotes(filteredNotes);
    }, [openContentNote]);

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { openSideBar, setOpenSideBar },
        openContentNoteObject: { openContentNote, setOpenContentNote },
        isMobileObject: { isMobile, setIsMobile },
        allNotesObject: { allNotes, setAllNotes },
        selectedNoteObject: { selectedNote, setSelectedNote },
        isNewNoteObject: { isNewNote, setIsNewNote },
        allTagsObject: { allTags, setAllTags },
        selectedTagObject: { selectedTags, setSelectedTags },
        selectedLanguageObject: {selectedLanguage, setSelectedLanguage}
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
