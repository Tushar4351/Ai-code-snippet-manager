import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import PlusIcon from "../../../../../assets/icons/plus.svg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { useGlobalContext } from "@/ContextApi";
import AddTagWindow from "../TagsWIndow/AddTagWindow";
import { Tags } from "lucide-react";

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    sideBarMenuObject: { sideBarMenu },
    isLoadingObject: { isLoading, setIsLoading },
  } = useGlobalContext();
  const [tagsSelected, setTagsSelected] = useState<boolean[]>([]);

  useEffect(() => {
    setTagsClicked((prevTagsClicked) => {
      const newTagsClicked = allTags.reduce(
        (acc, tag, index) => {
          if (tagsSelected[index]) {
            if (!prevTagsClicked.includes(tag.name)) {
              acc.push(tag.name);
            }
          } else {
            if (prevTagsClicked.includes(tag.name)) {
              const tagIndex = acc.indexOf(tag.name);
              if (tagIndex !== -1) {
                acc.splice(tagIndex, 1);
              }
            }
          }
          return acc;
        },
        [...prevTagsClicked]
      );
      return newTagsClicked;
    });
  }, [tagsSelected]);

  useEffect(() => {
    if (allTags) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [allTags]);
  useEffect(() => {
    if (sideBarMenu) {
      const newTagsSelected = Array(allTags.length).fill(false);
      const newTagsClicked = ["All"];
      newTagsSelected[0] = true;
      setTagsClicked(newTagsClicked);
      setTagsSelected(newTagsSelected);
    }
  }, [sideBarMenu]);

  const handleTagClick = (index: number) => {
    const newTagsSelected = [...tagsSelected];
    //if I click on All,turn all the other tags to false
    if (index === 0) {
      newTagsSelected[0] = true;
      //turn all the tags except to all to false
      for (let index = 1; index < newTagsSelected.length; index++) {
        newTagsSelected[index] = false;
      }
      setTagsSelected(newTagsSelected);
      return;
    } else {
      //if I click on a tag,turn it to true and the all tag to false
      newTagsSelected[0] = false;
      newTagsSelected[index] = !newTagsSelected[index];
      setTagsSelected(newTagsSelected);
    }

    //if all the tags are false,turn the first one true
    if (newTagsSelected.every((tag) => !tag)) {
      newTagsSelected[0] = true;

      setTagsSelected(newTagsSelected);
    }
  };

  return (
    <>
      <div
        className={`${
          darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"
        } p-3 rounded-lg flex gap-5`}
      >
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="flex gap-3 items-center mt-[2px]">
              <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>{" "}
              <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>{" "}
              <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>{" "}
            </div>
          ) : (
            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode]}
              className="mySwiper"
            >
              {allTags.map((tag, index) => (
                <SwiperSlide
                  key={index}
                  className={`${
                    tagsSelected[index]
                      ? "bg-[#9588e8] text-white"
                      : "bg-white text-gray-400"
                  } p-1 rounded-md w-20`}
                  onClick={() => handleTagClick(index)}
                >
                  {tag.name}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <button
          onClick={() => setOpenNewTagsWindow(true)}
          className="bg-black p-1 rounded-md px-3 flex gap-1 items-center text-white"
        >
          <PlusIcon className="w-6 h-6" />
          <span>Tag</span>
        </button>
        {openNewTagsWindow && <AddTagWindow />}
      </div>
    </>
  );
}
