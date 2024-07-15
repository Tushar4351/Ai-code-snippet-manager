import { SignIn } from "@clerk/nextjs";

const SignInpage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInpage;
