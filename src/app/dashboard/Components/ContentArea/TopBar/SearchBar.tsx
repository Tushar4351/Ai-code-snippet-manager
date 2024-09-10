import SearchIcon from "../../../../../assets/icons/search.svg";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import { useGlobalContext } from "@/ContextApi";
import { openTheContentNote } from "../../EmptyPlaceHolder";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { getUserById, updateCredits } from "@/app/actions/user.actions";
import React, { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { creditFee } from "@/app/localData/Pricing";

const SearchBar = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`relative pl-3 w-[60%] h-[38px] ${
        darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-gray-100"
      } rounded-3xl flex items-center gap-2`}
    >
      <SearchIcon className="h-6 w-6 mr-1" aria-label="Search Icon" />
      <input
        placeholder="Search a Snippet"
        className={`w-[70%] outline-none text-sm ${
          darkMode[1].isSelected ? "bg-[#1f1e25]" : "bg-gray-100"
        } text-gray-500`}
        aria-label="Search Input"
      />
      <AddSnippetButton />
    </div>
  );
};

export default SearchBar;

const AddSnippetButton = () => {
  const {
    openContentNoteObject: { setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote },
    isNewNoteObject: { setIsNewNote },
    sharedUserIdObject: { sharedUserId },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const { userId } = useAuth();
  const [user, setUser] = React.useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await getUserById(userId);
        setUser(userData);
      }
    };
    fetchUser();
  }, [userId]);

  const snippetCredit = user?.creditBalance || 0;

  const handleAddSnippet = () => {
    if (snippetCredit > 0) {
      try {
        openTheContentNote(
          setIsNewNote,
          setSelectedNote,
          setOpenContentNote,
          setAllNotes,
          allNotes,
          sharedUserId
        );
        if (snippetCredit > 0) {
          startTransition(async () => {
            try {
              await updateCredits(user?._id, creditFee);
              toast({
                title: "1 credit is deducted",
              });
            } catch (error) {
              console.error("Failed to open a new snippet:", error);
              toast({
                title: "Failed to create a new snippet",
                variant: "destructive",
              });
            }
          });
        }
      } catch (error) {
        console.error("Failed to open a new snippet:", error);
        toast({
          title: "Failed to create a new snippet",
          variant: "destructive",
        });
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleAddSnippet}
        className="absolute flex gap-2 px-3 rounded-3xl max-md:px-1 bg-black p-1 text-[13px] text-white right-[6px] items-center cursor-pointer select-none"
      >
        <PlusIcon aria-label="Add Icon" />
        <div className="max-md:hidden">Snippet</div>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent
          className={`${
            darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
          } border-none`}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Oops... Looks like you&#39;ve run out of credits!
            </AlertDialogTitle>
            <AlertDialogDescription>
              No worries, though - you can keep enjoying our services by
              grabbing more credits. Go to the Subscription tab.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={` ${darkMode[1].isSelected ? "text-black" : ""}`}
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
