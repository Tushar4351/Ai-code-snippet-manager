import { SignUp } from "@clerk/nextjs";

const SignUppage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export default SignUppage;
