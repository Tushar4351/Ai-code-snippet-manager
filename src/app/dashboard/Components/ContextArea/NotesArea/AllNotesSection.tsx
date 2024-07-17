import { useGlobalContext } from "@/ContextApi";
import deleteIcon from "../../../../../assets/icons/delete.png";
import importantIcon from "../../../../../assets/icons/important.png";
import JavaScriptIcon from "../../../../../assets/icons/javascript.png";
import Image from "next/image";
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialLight, oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const AllNotesSection = () => {
  return (
      <div className="mt-5 w-full flex flex-wrap gap-4">
          <SingleNote />
          <SingleNote />
          <SingleNote />
          <SingleNote/>
    </div>
  )
}

export default AllNotesSection



const SingleNote = () => {
    const {
        darkModeObject: { darkMode },
      } = useGlobalContext();
  return (
      <div className={`${darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"} max-sm:w-full w-[341px] rounded-lg py-4`}>
          <NoteHeader />
          <NoteDate />
          <NoteTags />
          <NoteDescription />
          <CodeBlock language="javascript" />
          <NotFooter/>
    </div>
  )
}


const NoteHeader = () => {
  return (
      <div className="flex justify-between mx-4">
          <span className="font-bold text-lg w-[87%]">
              Lorem ipsum dolor sit amet consectetur
          </span>
          <Image
              src={importantIcon}
              alt="DeleteLogo"
              className="h-6 w-6 cursor-pointer"
              width={20}
              height={20}
            />
          
    </div>
  )
}

const NoteDate = () => {
    return (
        <div className="text-gray-400 text-[11px] flex gap-1 font-light mx-4 mt-1">
            <span>23th june 2024</span>
      </div>
    )
}
const NoteTags = () => {
    return (
        <div className="flex flex-wrap mx-4 text-[11px] gap-1 mt-4 text-gray-400">
      <span className="p-1 rounded-md px-2 bg-[#d5d0f8] text-[#9588e8]">functions</span>
      <span className="p-1 rounded-md px-2 bg-[#d5d0f8] text-[#9588e8]">functions</span>
      <span className="p-1 rounded-md px-2 bg-[#d5d0f8] text-[#9588e8]">function</span>
      <span className="p-1 rounded-md px-2 bg-[#d5d0f8] text-[#9588e8]">functions</span>
    </div>
    )
}
const NoteDescription = () => {
    const {
        darkModeObject: { darkMode },
      } = useGlobalContext();
    return (
        <div className={`${darkMode[1].isSelected ? " text-white" : ""} text-gray-400 text-[13px] mt-4 mx-4`}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae facilis nostrum vero voluptatum repellat voluptates est explicabo unde cupiditate aut sint, minima possimus quaerat harum dolor optio a eaque dolorum?
      </div>
    )
}
interface CodeBlockProps{
      language: string;
  }
const CodeBlock: React.FC<CodeBlockProps> = ({ language }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const codeString = `
    import React from "react";
    
    function HelloWorld(){
    return <h1>Hello World</h1>
    }
    export default HelloWorld;
    `;
  return (
    <div className="rounded-md overflow-hidden text-sm">
      <SyntaxHighlighter
        language={language}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
const NotFooter = () => {
    return (
      <div className="flex justify-between items-center text-[13px] text-gray-400 mx-4 mt-3">
        <div className="flex items-center">
          <Image
            src={JavaScriptIcon}
            alt="JavaScriptLogo"
            className="h-6 w-6 mr-1"
            width={20}
            height={20}
          />
          <span>JavaScript</span>
        </div>
        <Image
          src={deleteIcon}
          alt="DeleteLogo"
          className="h-6 w-6 cursor-pointer"
          width={20}
          height={20}
        />
      </div>
    )
  }