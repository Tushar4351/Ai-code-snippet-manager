import Loader from "@/app/dashboard/Loader";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";

const ProfileUser = () => {
  const { user } = useUser();
  //console.log("user:  ", user);

  return (
    <div className="flex gap-3 items-center">
      {!user ? (
        <Loader />
      ) : (
     <UserButton />
          )}
          <div className="max-md:hidden flex flex-col text-sm">
              <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
              <span className="text-gray-500 text-[0.7rem] max-lg:hidden">{user?.emailAddresses[0].emailAddress}</span>

          </div>
    </div>
  );
};

export default ProfileUser;
