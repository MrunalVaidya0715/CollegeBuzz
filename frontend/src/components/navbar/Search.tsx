import { LucideLoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import apiRequest from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import Retry from "../queryStates/Retry";
import NoData from "../queryStates/NoData";
import useDebounce from "@/hooks/useDebounce"; 
import { useNavigate } from "react-router-dom";

interface SearchResult {
  _id: string;
  title: string;
  category: string;
  branch: string;
}

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 600);
  const navigate = useNavigate();
  const { isLoading, isFetching, isRefetching, error, data, refetch } =
    useQuery<SearchResult[]>({
      queryKey: ["searchedQuestions"],
      queryFn: () =>
        apiRequest.get(`questions/search?keyword=${debouncedSearchText}`).then((res) => {
          return res.data;
        }),
      enabled: false,
    });

  useEffect(() => {
    if (isSearchResult && debouncedSearchText.trim() !== "") {
      refetch();
    }
  }, [isSearchResult, debouncedSearchText, refetch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText.trim() !== "") {
      setIsSearchResult(true);
    }
  };

  const handleSearchClose = () => {
    setSearchText("");
    setIsSearchResult(false);
  };

  const handleQuestionNavigation = (id: string) =>{
    navigate(`/posts/${id}`);
    setSearchText("");
    setIsSearchResult(false);
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="absolute left-1/2 -translate-x-1/2 px-2 py-1 h-9 flex items-center gap-2 text-gray-400 bg-gray-100 border-1 border-gray-200 rounded-lg"
      >
        <BiSearch className="text-[20px] md:text-[22px]" />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-1 text-black text-sm md:text-base w-full bg-transparent outline-none rounded-md"
          type="text"
          placeholder="Search Question"
        />
      </form>

      {isSearchResult && (
        <div className="z-[50] left-1/2 -translate-x-1/2 top-[4.5rem] lg:top-20 absolute w-[95%] max-w-[500px] min-h-[150px] max-h-[300px] flex flex-col gap-4 items-center bg-white border-1 border-gray-300">
          {isLoading || isFetching || isRefetching ? (
            <div className="min-h-[150px] w-full flex flex-col items-center justify-center">
              <LucideLoaderCircle className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <Retry refetch={refetch} className="min-h-[150px]" />
          ) : data?.length === 0 ? (
            <div className="w-full min-h-[150px] flex flex-col items-center justify-center gap-2">
              <NoData message="No Questions found" className="min-h-fit" />
            </div>
          ) : (
            <div className="h-full max-h-[300px] w-full p-4 flex flex-col gap-4 overflow-y-auto">
              {data?.map((search) => (
                <div
                  key={search._id}
                  onClick={()=>handleQuestionNavigation(search._id)}
                  className="w-full flex flex-col p-4 border-1 border-gray-200 hover:border-gray-800 transition-all duration-200 ease-in-out"
                >
                  <h2 className="leading-5 font-medium">{search.title}</h2>
                </div>
              ))}
            </div>
          )}

          <div
            onClick={handleSearchClose}
            className="cursor-pointer absolute -bottom-16 bg-white text-gray-500 hover:text-black border-1 border-gray-300 hover:border-gray-900 p-3 rounded-full transition-all duration-200 ease-in-out"
          >
            <AiOutlineClose className="w-5 h-5" />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
