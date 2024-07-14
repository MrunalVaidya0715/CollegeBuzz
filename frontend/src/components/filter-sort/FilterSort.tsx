import { BsFilterLeft } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/data/links";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuestionFilterStore from "@/store/useFilterSortStore";

const FilterSort = () => {
  const { category, setCategory, sortBy, setSortBy } = useQuestionFilterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const catQuery = searchParams.get("category") || category;
  const sortQuery = searchParams.get("sortBy") || sortBy;
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [selectedSortBy, setSelectedSortBy] = useState(sortQuery);
  useEffect(() => {
    if (category !== catQuery) {
      setSelectedCategory(catQuery);
      setCategory(catQuery);
    }
  }, [catQuery, category, setCategory]);

  useEffect(() => {
    if (sortBy !== sortQuery) {
      setSelectedSortBy(sortQuery);
      setSortBy(sortQuery);
    }
  }, [sortQuery, sortBy, setSortBy]);
  const handleCatQueryChange = (cat: string) => {
    setCategory(cat);
    setSelectedCategory(cat);
    setSearchParams({
      category: cat,
      sortBy: selectedSortBy
    })
  };
  const handleSortQueryChange = (sort: string) => {
    setSortBy(sort);
    setSelectedSortBy(sort);
    setSearchParams({
      category: selectedCategory,
      sortBy: sort
    })
  };
  const location = useLocation();
  return (
    <section
      className={`z-[50] ${
        location.pathname === "/" || location.pathname === "/contribute"
          ? ""
          : "hidden"
      } sticky py-2 lg:pt-4  lg:-translate-y-4 top-16 lg:top-20  w-full flex items-center bg-gradient-to-b from-[#f1f5f9] via-[#f1f5f9] to-[90%] to-white/20 gap-2`}
    >
      {/* Filter */}
      <div className="w-full flex items-center gap-1">
        <div className="p-2 h-10 flex items-center gap-1 bg-white border-1 border-gray-200 rounded-sm">
          <BsFilterLeft className="w-5 h-5" />
          <p className="hidden lg:block text-sm">Filter</p>
        </div>
        <Select value={catQuery} onValueChange={handleCatQueryChange}>
          <SelectTrigger className="w-full" aria-label="Filter Category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => {
                e.preventDefault();
              };
            }}
          >
            {FilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Sort */}
      <div className="w-full flex items-center gap-1">
        <div className="p-2 h-10 flex items-center gap-1 bg-white border-1 border-gray-200 rounded-sm">
          <BiSort className="w-4 h-4" />
          <p className="hidden lg:block text-sm">Sort</p>
        </div>
        <Select value={selectedSortBy} onValueChange={handleSortQueryChange}>
          <SelectTrigger className="w-full" aria-label="Sort Posts">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => {
                e.preventDefault();
              };
            }}
          >
            <SelectItem value="latest">
              {selectedCategory === "latest" ? "Default" : "Latest"}
            </SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="votesHighToLow">Votes: High - Low</SelectItem>
            <SelectItem value="votesLowToHigh">Votes: Low - High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default FilterSort;
