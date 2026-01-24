"use client";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

interface LoadingContextType {
  triggerLoading: (duration?: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  const triggerLoading = (duration = 1000) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), duration);
  };

  useEffect(() => {
    triggerLoading();
  }, []);

  useEffect(() => {
    if (lastPathRef.current && pathname !== lastPathRef.current) {
      triggerLoading();
    }
    lastPathRef.current = pathname;
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ triggerLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
