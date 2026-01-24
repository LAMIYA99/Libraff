import DetailView from "@/components/sections/detail/DetailView";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function ProductDetails({ params }: Props) {
  return (
    <div className="max-w-375 mx-auto px-5 py-6">
      <Breadcrumb />
      <DetailView />
    </div>
  );
}
