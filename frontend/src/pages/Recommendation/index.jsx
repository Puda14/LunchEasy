import HomeButton from '../../components/HomeButton'
import SearchBar from '../../components/SearchBar'
import MealTable from './components/MealTable'
import data from './data/data'
import Sidebar from '../../components/Sidebar'

const Recommendation = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <HomeButton />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <SearchBar />
      </div>
      <div className='px-96 py-72'>
        <MealTable meals={data} />
      </div>
    </div>
  )
}

export default Recommendation
