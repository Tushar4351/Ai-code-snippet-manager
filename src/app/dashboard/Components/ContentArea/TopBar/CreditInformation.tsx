import { MdCreditScore } from "react-icons/md";
import { GiArtificialHive } from "react-icons/gi";
import { useAuth } from "@clerk/nextjs";
import { getUserById } from "@/app/actions/user.actions";
import React from "react";

const CreditInformation = ({ darkmode }: { darkmode: boolean }) => {
  const { userId } = useAuth();
  const [user, setUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await getUserById(userId);
        setUser(userData);
      }
    };
    fetchUser();
  }, [userId]);
  let newSnippetCredit = user && user.creditBalance;

  let SnippetCredit = 10;

  // Initialize AiCredit as half of SnippetCredit rounded down
  let AiCredit = SnippetCredit - Math.floor(SnippetCredit / 2);

  // Function to update credits dynamically
  function updateCredits(newSnippetCredit: number) {
    // Calculate the difference in SnippetCredit
    const difference = SnippetCredit - newSnippetCredit;

    // Update SnippetCredit to the new value
    SnippetCredit = newSnippetCredit;

    // Adjust AiCredit by the same difference
    AiCredit -= difference;
  }
  updateCredits(newSnippetCredit);
  return (
    <div className="flex gap-4 font-semibold">
      <div className="flex gap-2 items-center">
        <MdCreditScore className="w-7 h-7 text-[#9588e8]" />
        <span className={`${darkmode ? "text-white" : ""}`}>
          Snippets Credit
        </span>
        <span
          className={`
        bg-gray-200 p-1 px-3 rounded-lg text-[#6e5beb]`}
        >
          {SnippetCredit}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <GiArtificialHive className="w-7 h-7 text-[#9588e8]" />
        <span className={`${darkmode ? "text-white " : ""}`}>
          AI Generation
        </span>
        <span
          className={`
        bg-gray-200 p-1 px-3 rounded-lg text-[#6e5beb]`}
        >
          {AiCredit}
        </span>
      </div>
    </div>
  );
};

export default CreditInformation;
