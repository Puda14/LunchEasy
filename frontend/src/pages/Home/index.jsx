import NavigatorSquare from './components/Navigators.jsx';
import Sidebar from '../../components/Sidebar.jsx';
const Home = () => {

  return (
      <div className='flex flex-row'>
        <Sidebar/>
        <div className='grid grid-cols-3 gap-12 px-96 py-72'>
          <NavigatorSquare name='おすすめ' route='/recommendation'/>
          <NavigatorSquare name='レストラン' route='#'/>
          <NavigatorSquare name='歴史' route='#'/>
          <NavigatorSquare name='お気に入り' route='#'/>
          <NavigatorSquare name='設定' route='#'/>
          <NavigatorSquare name='健康的なお勧め' route='#'/>
        </div>
      </div>
  )
}

export default Home
