import AnswerCard from "@/cards/AnswerCard"

const Answers = () => {
  return (
    <section className=" w-full flex flex-col gap-2">
        {
            Array(3).fill(null).map((_, index)=><AnswerCard key={index}/>)
        }
    </section>
  )
}

export default Answers