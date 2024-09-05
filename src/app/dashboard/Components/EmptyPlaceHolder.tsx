import { Button } from "@/components/ui/button";
import PlusIcon from "../../../assets/icons/plus.svg";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/ContextApi";
const EmptyPlaceHolder = ({
  Icon,
  Text,
  isNew,
}: {
  Icon: React.ReactNode;
  Text: React.ReactNode;
  isNew?: boolean;
}) => {
  const {
    openContentNoteObject: { setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote },
    isNewNoteObject: { setIsNewNote },
    sharedUserIdObject: { sharedUserId, setSharedUserId },
  } = useGlobalContext();

  return (
    <div className="w-full h-1/2 pt-20 flex gap-3 flex-col items-center">
      {Icon}
      {Text}
      {isNew && (
        <Button
          className="bg-[#9588e8] hover:bg-[#a49ae4]"
          onClick={() =>
            openTheContentNote(
              setIsNewNote,
              setSelectedNote,
              setOpenContentNote,
              setAllNotes,
              allNotes,
              sharedUserId
            )
          }
        >
          {" "}
          <PlusIcon />
          Add a new Snippet
        </Button>
      )}
    </div>
  );
};

export default EmptyPlaceHolder;

export function openTheContentNote(
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>,
  setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>,
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  allNotes: SingleNoteType[],
  sharedUserId: string
) {
  const newSingleNote = {
    _id: uuidv4(),
    clerkUserId: sharedUserId || "",
    title: "",
    createdAt: formatDate(new Date()),
    tags: [],
    description: "",
    code: "",
    isImportant: false,
    language: "",
    isDeleted: false,
  };

  setAllNotes([newSingleNote, ...allNotes]);
  setSelectedNote(newSingleNote);
  setOpenContentNote(true);
  setIsNewNote(true);
}

// ... rest of the component

function formatDate(date: Date) {
  //format the date to dd month yyyy
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
