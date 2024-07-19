import { useGlobalContext } from '@/ContextApi'
import React, { useEffect, useState } from 'react'
import CloseIcon from "../../../assets/icons/close.svg"
const ContentNote = () => {
  const { openContentNoteObject: { openContentNote, setOpenContentNote },
    isMobileObject: { isMobile },
    selectedNoteObject: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject : {allNotes, setAllNotes}
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(undefined);
  useEffect(() => {
    if (openContentNote) {
      if (selectedNote) {
        setSingleNote(selectedNote);

      }
    }
  },[openContentNote,selectedNote])
  console.log(singleNote);
  
  //This useeffect is used to add the singlenote to the allnotes only if the singlenote is not empty
  useEffect(() => {
    //if isnewnote is true
    if (isNewNote) {
      //if the single note is not empty
      if (singleNote && singleNote.title != "") {
        //add the single note to the allnotes
        setAllNotes([...allNotes, singleNote]);
        //set the isnewnote false
        setIsNewNote(false);
      }
      }

  },[singleNote])
  return (
      <div className={`border ${ isMobile ? "w-4/5": "w-1/2"} z-50 bg-white p-3 rounded-lg ${openContentNote ? "block": "hidden"} h-[700px] ${isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}`}>
          
      {singleNote && (
        <div>
               <ContentNoteHeader
          singleNote={singleNote}
          setSingleNote={setSingleNote}
        />
        <NoteTags
        singleNote={singleNote}
          setSingleNote={setSingleNote}
        />
        </div>
   
      )}
    </div>
  )
}

export default ContentNote



const ContentNoteHeader = ({ singleNote, setSingleNote }: {
  singleNote: SingleNoteType,
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>
}) => {
  const { allNotesObject: { allNotes, setAllNotes },
    openContentNoteObject: { setOpenContentNote },
    isNewNoteObject:{isNewNote,setIsNewNote}
  } = useGlobalContext();


  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(singleNote);
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);
    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
    return (
      <div className='flex justify-between gap-8 mb-4'>
        <div className='flex gap-2 w-full'>
        <textarea
        onChange={onUpdateTitle}
        onKeyDown={handleKeyDown}
        placeholder='New Title..'
        value={singleNote.title}
        className='font-bold text-xl outline-none resize-none h-auto overflow-hidden w-full'
      />
        </div>
        <CloseIcon
          onClick={() =>{
            setIsNewNote(false);
            setOpenContentNote(false);
          }}
          className="text-gray-500 cursor-pointer w-6 h-6"
        />
        
      </div>
  
    )
  }


  
  const NoteTags = ({ singleNote, setSingleNote }: {
    singleNote: SingleNoteType,
    setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>
  }) => {
    return (
      <div className='flex text-[13px] items-center gap-2'>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2 items-center flex-wrap'>
            {singleNote.tags.map((tag,index) => (
              <div
                key={index}
                className='bg-gray-200 px-2 p-1 text-xs font-semibold rounded-md text-gray-800 cursor-pointer hover:bg-gray-300'
              >
                {tag}
              </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

