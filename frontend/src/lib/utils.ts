import { BgColors, CategoriesOptions } from "@/data/categories";
import { type ClassValue, clsx } from "clsx"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ScrollToTopOnPageChange = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return null;
};

export default ScrollToTopOnPageChange;

export const getColor = (value: string) => {
  const index = CategoriesOptions.findIndex(option => option.value === value);
  return BgColors[index % BgColors.length];
};
