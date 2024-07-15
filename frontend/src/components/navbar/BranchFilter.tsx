import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterBranches } from "@/data/categories";
import useFilterBranchStore from "@/store/useFilterBranchStore";

const BranchFilter = () => {
    const {branch, setBranch} = useFilterBranchStore();
    const handleBranchChange = (branch: string) =>{
        setBranch(branch);
    }
  return (
    <Select value={branch} onValueChange={handleBranchChange}>
      <SelectTrigger className="w-full font-medium text-xs sm:text-sm gap-1" aria-label="Filter Branch">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent
        className="z-[101]"
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {filterBranches.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BranchFilter;
