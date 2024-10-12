import Header from "./Header"
import HeroSection from "./HeroSection"
import Footer from "./Footer"
import TaskBoard from "./Task/TaskBoard"
export default function App() {
  return(
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center ">
    <HeroSection/>
    <TaskBoard/>
    </div>
   
    <Footer/>
    </>
  )
}