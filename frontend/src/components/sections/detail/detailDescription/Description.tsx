interface DescriptionProps {
  text: string;
}

const Description = ({ text }: DescriptionProps) => {
  if (!text) return <p className="text-gray-500 italic">Təsvir yoxdur.</p>;

  return (
    <div className="">
      <div
        className="text-gray-800 leading-8 text-[15px] md:text-[17px] whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default Description;
