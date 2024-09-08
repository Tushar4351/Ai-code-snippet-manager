"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { TbTags,TbLogout2 } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import nightIcon from "./assets/icons/night.png";
import sunIcon from "./assets/icons/sun.png";

import { StaticImageData } from "next/image";
import { useAuth, useUser } from "@clerk/nextjs";

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
    setSelectedLanguage: React.Dispatch<
      React.SetStateAction<SingleCodeLanguageType | null>
    >;
  };
  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  codeLanguageCOunterObject: {
    codeLanguagesCounter: CodeLanguageCounterType[];
    setCodeLanguagesCounter: React.Dispatch<
      React.SetStateAction<CodeLanguageCounterType[]>
    >;
  };
  openTagsWindowObject: {
    openTagsWindow: boolean;
    setOpenTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  tagsAndLogoutMenuObject: {
    tagsAndLogoutMenu: SideBarMenu[];
    setTagsAndLogoutMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  openNewTagsWindowObject: {
    openNewTagsWindow: boolean;
    setOpenNewTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedTagToEditObject: {
    selectedTagToEdit: SingleTagType | null;
    setSelectedTagToEdit: React.Dispatch<
      React.SetStateAction<SingleTagType | null>
    >;
  };
  tagsClickedObject: {
    tagsClicked: string[];
    setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  sharedUserIdObject: {
    sharedUserId: string;
    setSharedUserId: React.Dispatch<React.SetStateAction<string>>;
  };
  sidebarContext: SidebarContextProps;
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
  },
  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },
  codeLanguageCOunterObject: {
    codeLanguagesCounter: [],
    setCodeLanguagesCounter: () => {},
  },
  openTagsWindowObject: {
    openTagsWindow: false,
    setOpenTagsWindow: () => {},
  },
  tagsAndLogoutMenuObject: {
    tagsAndLogoutMenu: [],
    setTagsAndLogoutMenu: () => {},
  },
  openNewTagsWindowObject: {
    openNewTagsWindow: false,
    setOpenNewTagsWindow: () => {},
  },
  selectedTagToEditObject: {
    selectedTagToEdit: null,
    setSelectedTagToEdit: () => {},
  },
  tagsClickedObject: {
    tagsClicked: [],
    setTagsClicked: () => {},
  },
  isLoadingObject: {
    isLoading: true,
    setIsLoading: () => {},
  },
  sharedUserIdObject: {
    sharedUserId: "",
    setSharedUserId: () => {},
  },
  sidebarContext: {
    open: false,
    setOpen: () => {},
    animate: true,
  },
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
      icon: (
        <HiOutlineCodeBracketSquare
          className="h-6 w-6 cursor-pointer"
        />
      ),
    },
    {
      id: 2,
      name: "Important",
      isSelected: false,
      icon: <FaRegStar className="h-6 w-6 cursor-pointer" />,
    },
    {
      id: 3,
      name: "Delete",
      isSelected: false,
      icon: <MdDeleteOutline className="w-6 h-6 cursor-pointer" />,
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
  const [selectedLanguage, setSelectedLanguage] =
    useState<SingleCodeLanguageType | null>(null);
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [codeLanguagesCounter, setCodeLanguagesCounter] = useState<
    CodeLanguageCounterType[]
  >([]);
  const [openTagsWindow, setOpenTagsWindow] = useState(false);
  const [tagsAndLogoutMenu, setTagsAndLogoutMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "Tags",
      isSelected: false,
      icon: <TbTags className="h-6 w-6 cursor-pointer" />,
    },
    {
      id: 2,
      name: "Log Out",
      isSelected: false,
      icon: <TbLogout2 className="h-6 w-6 cursor-pointer" />,
    },
  ]);
  const [openNewTagsWindow, setOpenNewTagsWindow] = useState(false);
  const [selectedTagToEdit, setSelectedTagToEdit] =
    useState<SingleTagType | null>(null);
  const [tagsClicked, setTagsClicked] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, user } = useUser();
  const [sharedUserId, setSharedUserId] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [animateSidebar, setAnimateSidebar] = useState<boolean>(true);
  const { isSignedIn, userId } = useAuth();

  // Sidebar context state management
  const sidebarContextValue: SidebarContextProps = {
    open: openSidebar,
    setOpen: setOpenSidebar,
    animate: animateSidebar,
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };
  useEffect(() => {
    if (user) {
      setSharedUserId(user?.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchAllNotes() {
      try {
        const response = await fetch(`/api/snippets?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: { notes: SingleNoteType[] } = await response.json();
        if (data.notes) {
          console.log(data.notes);
          //sort notes
          const sortedAllNotes: SingleNoteType[] = data.notes.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });

          setAllNotes(sortedAllNotes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    async function fetchAllTags() {
      try {
        const response = await fetch(`/api/tags?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data: { tags: SingleTagType[] } = await response.json();
        if (data.tags) {
          const allTags: SingleTagType = {
            _id: uuidv4(),
            name: "All",
            clerkUserId: user?.id || "",
          };
          const tempAllTags = [allTags, ...data.tags];
          setAllTags(tempAllTags);
        
          
        }
      } catch (error) {
        console.error("Error tags:", error); // Log the error to understand failures
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoaded && isSignedIn) {
      fetchAllTags();
      fetchAllNotes();
    }
  }, [user, isLoaded, isSignedIn]);

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

  useEffect(() => {
    const languageCounts: Record<string, number> = {};
    allNotes.forEach((note) => {
      const language = note.language.toLowerCase();
      if (languageCounts[language]) {
        languageCounts[language]++;
      } else {
        languageCounts[language] = 1;
      }
    });
    const convertedLanguageCounted: CodeLanguageCounterType[] = Object.entries(
      languageCounts
    )
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    setCodeLanguagesCounter(convertedLanguageCounted);
  }, [allNotes]);

  useEffect(() => {
    if (openTagsWindow) {
      setOpenTagsWindow(false);
    }
  }, [sideBarMenu]);

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
        selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        codeLanguageCOunterObject: {
          codeLanguagesCounter,
          setCodeLanguagesCounter,
        },
        openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
        tagsAndLogoutMenuObject: { tagsAndLogoutMenu, setTagsAndLogoutMenu },
        openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
        selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
        tagsClickedObject: { tagsClicked, setTagsClicked },
        isLoadingObject: { isLoading, setIsLoading },
        sharedUserIdObject: { sharedUserId, setSharedUserId },
        sidebarContext: sidebarContextValue
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
