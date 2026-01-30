"use client";
import { PaginationButtonsProps } from "@/types/global";
import React from "react";

const PaginationButtons = ({
  title,
  prevIcon,
  nextIcon,
  pageCount,
}: PaginationButtonsProps) => {
  const [selectedPage, setSelectedPage] = React.useState<string | null>(null);
  const handleClick = (page: string) => {
    setSelectedPage(page);
  };
  return (
    <div>
      {title ? (
        <button className="text-[#767676] border border-[#e1e1e1] rounded-[8px] px-[10px] min-w-[40px] h-[40px] uppercase flex items-center justify-center gap-1 font-nunito">
          {prevIcon} {title} {nextIcon}
        </button>
      ) : (
        <button
          onClick={() => handleClick(pageCount!)}
          className={`text-[#767676] cursor-pointer duration-200 border hover:bg-[#f5f5f5] ${
            selectedPage === pageCount ? "border-red-500" : "border-[#e1e1e1]"
          } rounded-[8px] px-[10px] min-w-[40px] h-[40px] uppercase flex items-center justify-center gap-1 font-nunito`}
        >
          {pageCount}
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
