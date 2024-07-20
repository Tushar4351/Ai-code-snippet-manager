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
import TypeScriptIcon from "../../assets/icons/typescript.svg";

export const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'JavaScript':
        return <JavascriptIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'C':
        return <CIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Java':
        return <JavaIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'C++':
        return <CppIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Python':
        return <PythonIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'C#':
        return <CSharpIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Go':
        return <GoIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'PHP':
        return <PhpIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Ruby':
        return <RubyIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Kotlin':
        return <KotlinIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'React':
        return <ReactIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Rust':
        return <RustIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'Swift':
        return <SwiftIcon className="h-6 w-6 mb-[2px] mr-1" />;
      case 'TypeScript':
        return <TypeScriptIcon className="h-6 w-6 mb-[2px] mr-1" />;
      default:
        return null;
    }
  };