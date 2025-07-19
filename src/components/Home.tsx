import { Separator } from "./Separator"
import FormComponent from "./FormComponent"
import JsonDisplay from "./JsonDisplay"


const Home = () => {
  return (
    <div className='h-[92vh]'>
        <Separator FormComponent={FormComponent} JsonDisplay={JsonDisplay}/>
    </div>
  )
}

export default Home