"use client";

import { useContext, createContext, useState, useEffect } from "react";
import snippetIcon from "./assets/icons/snippet.png";
import importantIcon from "./assets/icons/important.png";
import deleteIcon from "./assets/icons/delete.png";

import nightIcon from "./assets/icons/night.png";
import sunIcon from "./assets/icons/sun.png";
import cIcon from "./assets/icons/c.png";

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
  }
  allNotesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  },
  selectedNoteObject: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  }
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
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
      icon: snippetIcon,
    },
    {
      id: 2,
      name: "Important",
      isSelected: false,
      icon: importantIcon,
    },
    {
      id: 3,
      name: "Delete",
      isSelected: false,
      icon: deleteIcon,
    },
  ]);
  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      isSelected: true,
      icon: sunIcon,
    },
    {
      id: 2,
      isSelected: false,
      icon: nightIcon,
    },
  ]);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [openContentNote, setOpenContentNote] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([])
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  }
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[])

  useEffect(() => {
    function updateAllNotes() {
      const allNotes= [
        {
          id: '1',
          title: 'Introduction to JavaScript',
          isImportant: true,
          tags: ['javascript', 'beginner', 'basics'],
          description: 'A basic introduction to JavaScript programming language.',
          code: `
          import React from "react";
            
          function HelloWorld() {
          return <h1>Hello World</h1>;
          }
            
          export default HelloWorld;
          `,
          language: 'JavaScript',
          createdAt: '2023-07-01T10:00:00Z'
        },
        {
          id: '2',
          title: 'JavaScript for Data Science',
          isImportant: false,
          tags: ['javascript', 'data science', 'react'],
          description: 'Using JavaScript for data science with React.',
          code: `
            import React from "react";
            
            function HelloWorld() {
              return <h1>Hello World</h1>;
            }
            
            export default HelloWorld;
          `,
          language: 'JavaScript',
          createdAt: '2023-07-02T14:30:00Z'
        },
        {
          id: '3',
          title: 'JavaScript Flexbox Layout',
          isImportant: true,
          tags: ['javascript', 'flexbox', 'layout'],
          description: 'A guide to CSS Flexbox layout using JavaScript and React.',
          code: `
            import React from "react";
            
            function HelloWorld() {
              return <h1>Hello World</h1>;
            }
            
            export default HelloWorld;
          `,
          language: 'JavaScript',
          createdAt: '2023-07-03T09:00:00Z'
        },
        {
          id: '4',
          title: 'JavaScript Basics',
          isImportant: false,
          tags: ['javascript', 'react', 'queries'],
          description: 'Basic JavaScript concepts for beginners using React.',
          code: `
            import React from "react";
            
            function HelloWorld() {
              return <h1>Hello World</h1>;
            }
            
            export default HelloWorld;
          `,
          language: 'JavaScript',
          createdAt: '2023-07-04T12:15:00Z'
        }
      ];
      setTimeout(() => {
        setAllNotes(allNotes)
      },1200)
      
    }
    updateAllNotes();
},[])






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
        isNewNoteObject :{isNewNote, setIsNewNote}

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
