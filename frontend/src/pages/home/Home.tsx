import Sidebar from "@/components/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="pt-16 w-full min-h-dvh flex justify-center" >
        <div className="p-2 w-full max-w-[1200px] flex justify-between">
        <Sidebar/>
        <div className=" w-full"></div>
        
        </div>
        
    </div>
  )
}

export default Home