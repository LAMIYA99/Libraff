import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70 backdrop-blur-md animate-fadeIn">
      <div className="relative flex flex-col items-center">
        <div className="w-32 md:w-48 animate-pulse pb-10">
          <Image
            src="https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
            alt="logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="mt-8 flex gap-1">
          <div className="w-2 h-2 bg-[#F32A41] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-[#F32A41] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-[#F32A41] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
