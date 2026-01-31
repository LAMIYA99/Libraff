import { PicksCardProps } from "@/types/global";
import Image from "next/image";

const PicksCard = ({ image }: PicksCardProps) => {
  return (
    <div className="w-full h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden">
      <Image
        src={image}
        alt="Libraff picks"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default PicksCard;
