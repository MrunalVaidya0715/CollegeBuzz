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

const FilterSort = () => {
  return (
    <section className="z-[50] sticky py-2 top-16 w-full flex items-center bg-gradient-to-b from-white via-white to-[90%] to-white/20 gap-4 ">
      {/* Filter */}
      <div className="w-full flex items-center gap-1">
        <div className="p-2 h-10 flex items-center gap-1 bg-white border-1 border-gray-200 rounded-sm">
          <BsFilterLeft className="w-5 h-5" />
          <p className="hidden lg:block text-sm">Filter</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
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
        <Select defaultValue="default">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="upvotesHtL">Upvotes: High to Low</SelectItem>
            <SelectItem value="upvotesLtH">Upvotes: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default FilterSort;
