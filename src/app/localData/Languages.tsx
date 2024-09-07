import JavascriptIcon from "../../assets/icons/javascript.svg";
import JavaIcon from "../../assets/icons/java.svg";
import CIcon from "../../assets/icons/c.svg";
import CppIcon from "../../assets/icons/cplusplus.svg";
import PythonIcon from "../../assets/icons/python.svg";
import CSharpIcon from "../../assets/icons/cSharp.svg";
import GoIcon from "../../assets/icons/go.svg";
import PhpIcon from "../../assets/icons/php.svg";
import RubyIcon from "../../assets/icons/ruby.svg";
import KotlinIcon from "../../assets/icons/kotlin.svg";
import ReactIcon from "../../assets/icons/react.svg";
import RustIcon from "../../assets/icons/rust.svg";
import SwiftIcon from "../../assets/icons/swift.svg";
import { TbBrandTypescript } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

export const allLanguages = [
  {
    id: uuidv4(),
    name: "JavaScript",
    icon: <JavascriptIcon className="h-6 w-6 " />,
  },
  {
    id: uuidv4(),
    name: "C",
    icon: <CIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Java",
    icon: <JavaIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "C++",
    icon: <CppIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Python",
    icon: <PythonIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "C#",
    icon: <CSharpIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Go",
    icon: <GoIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "PHP",
    icon: <PhpIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Ruby",
    icon: <RubyIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Kotlin",
    icon: <KotlinIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "React",
    icon: <ReactIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Rust",
    icon: <RustIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "Swift",
    icon: <SwiftIcon className="h-6 w-6 mr-1" />,
  },
  {
    id: uuidv4(),
    name: "TypeScript",
    icon: <TbBrandTypescript className="h-6 w-6" />,
  },
];
