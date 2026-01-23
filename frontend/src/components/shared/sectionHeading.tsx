import { SectionHeadingProps } from "@/types/global";

const SectionHeading = ({
  title,
  highlight,
  align = "left",
}: SectionHeadingProps) => {
  if (!highlight) {
    return (
      <div className={`w-full text-${align} mb-4`}>
        <h2 className="text-xl md:text-[28px] font-nunito font-normal text-[#14151A]">
          {title}
        </h2>
      </div>
    );
  }

  const parts = title.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <div className={`w-full text-${align} mb-4`}>
      <h2 className="text-xl md:text-[28px] font-nunito font-normal text-[#14151A]">
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="text-[#ef3340] font-semibold">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </h2>
    </div>
  );
};

export default SectionHeading;
