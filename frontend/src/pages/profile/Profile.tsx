import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiRequest from "@/lib/apiRequest";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types/User";
import Retry from "@/components/queryStates/Retry";
import { TimeAgo } from "@/lib/utils";
import ProfileQuesCard from "@/cards/ProfileQuesCard";
import ProfileQuesSkeleton from "@/components/skeletons/ProfileQuesSkeleton";
import NoData from "@/components/queryStates/NoData";
import ProfileAnsCard from "@/cards/ProfileAnsCard";
import ProfileAnsSkeleton from "@/components/skeletons/ProfileAnsSkeleton";

export interface ProfileQuestion {
  _id: string;
  title: string;
  branch: string;
  category: string;
  upvote: number;
  downvote: number;
  createdAt: string;
}

export interface ProfileAnswer {
  _id: string;
  questionId: {
    _id: string;
    title: string;
  };
  upvote: number;
  downvote: number;
  createdAt: string;
  content: string;
}

const Profile = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery<User>({
    queryKey: [`user.${userId}`],
    queryFn: () =>
      apiRequest.get(`users/${userId}`).then((res) => {
        return res.data;
      }),
  });
  const {
    data: questions,
    isLoading: isQuesLoading,
    error: quesError,
    refetch: quesRefetch,
  } = useQuery<ProfileQuestion[]>({
    queryKey: [`userQuestions.${userId}`],
    queryFn: () =>
      apiRequest.get(`users/profile-questions/${userId}`).then((res) => {
        return res.data;
      }),
  });
  const {
    data: answers,
    isLoading: isAnsLoading,
    error: ansError,
    refetch: ansRefetch,
  } = useQuery<ProfileAnswer[]>({
    queryKey: [`userAnswers.${userId}`],
    queryFn: () =>
      apiRequest.get(`users/profile-answers/${userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <section className=" pt-2 w-full flex flex-col">
      {/* Profile Img */}
      <div className="p-2 w-full min-h-[250px] flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400">
        {isUserLoading ? (
          <div className=" flex flex-col items-center gap-2">
            <div className=" w-[100px] aspect-square bg-white/80 border-1 border-gray-500 rounded-full overflow-hidden">
              <Skeleton className=" w-full h-full" />
            </div>
            <div className=" flex flex-col items-center gap-2">
              <Skeleton className=" h-6 w-[120px] bg-white/80" />
              <Skeleton className=" h-6 w-[150px] bg-white/80" />
            </div>
          </div>
        ) : userError ? (
          <Retry refetch={userRefetch} className=" min-h-fit" />
        ) : (
          <div className=" flex flex-col items-center gap-2">
            <div className=" w-[100px] aspect-square bg-white/80 border-1 border-gray-500 rounded-full overflow-hidden">
              <img
                className=" w-full h-full object-cover object-center"
                src={user?.profileImg || "/assets/no-profile.png"}
                alt={user?.username}
              />
            </div>
            <div className=" flex flex-col items-center -space-y-1 lg:space-y-0">
              <h1 className=" font-semibold text-lg lg:text-xl">
                {user?.username}
              </h1>
              {user?.createdAt && (
                <p className=" font-medim text-gray-800">
                  Joined {TimeAgo(user.createdAt as string)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <Tabs defaultValue="questions" className="w-full mt-1">
        <TabsList className="h-12 w-full px-0 gap-2">
          <TabsTrigger
            className=" h-full w-full data-[state=active]:bg-gradient-to-b from-blue-400 to-blue-600 data-[state=active]:text-white"
            value="questions"
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            className=" h-full w-full data-[state=active]:bg-gradient-to-b from-blue-400 to-blue-600 data-[state=active]:text-white"
            value="answers"
          >
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="questions"
          className=" w-full flex flex-col gap-2 lg:gap-4"
        >
          {isQuesLoading ? (
            Array(2)
              .fill(null)
              .map((_, index) => <ProfileQuesSkeleton key={index} />)
          ) : ansError ? (
            <Retry refetch={ansRefetch} className=" min-h-[150px]" />
          ) : questions?.length === 0 ? (
            <NoData message="No Question Raised" className=" min-h-[150px]" />
          ) : (
            questions?.map((question) => (
              <ProfileQuesCard key={question._id} question={question} />
            ))
          )}
        </TabsContent>
        <TabsContent
          value="answers"
          className=" w-full flex flex-col gap-2 lg:gap-4"
        >
          {isAnsLoading ? (
            Array(2)
              .fill(null)
              .map((_, index) => <ProfileAnsSkeleton key={index} />)
          ) : quesError ? (
            <Retry refetch={quesRefetch} className=" min-h-[150px]" />
          ) : answers?.length === 0 ? (
            <NoData message="No Answers yet" className=" min-h-[150px]" />
          ) : (
            answers?.map((answer) => (
              <ProfileAnsCard key={answer._id} answer={answer} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Profile;
