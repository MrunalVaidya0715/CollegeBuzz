import { Button } from "../ui/button"
import { IoMdAdd } from "react-icons/io";
const Section = () => {
  return (
    <aside className="sticky top-[4.5rem] w-[25%] h-fit flex flex-col gap-2">
        <Button className=" bg-blue-600 hover:bg-blue-800 gap-2" aria-label="Ask Question">
            <IoMdAdd className=" w-5 h-5"/>
            Ask Question</Button>
    </aside>
  )
}

export default Section