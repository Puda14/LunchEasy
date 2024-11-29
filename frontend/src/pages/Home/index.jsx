import NavigatorSquare from './components/Navigators.jsx';
import LayoutWrapper from '../../components/wrappers/LayoutWrapper.jsx';
const Home = () => {

  return (
    <LayoutWrapper element={<div className='flex flex-col h-screen w-full justify-center items-center'>
        <div className='grid grid-cols-3 gap-20 w-2/3 h-2/3'>
          <NavigatorSquare name='おすすめ' route='/recommendation'/>
          <NavigatorSquare name='レストラン' route='#'/>
          <NavigatorSquare name='歴史' route='#'/>
          <NavigatorSquare name='お気に入り' route='#'/>
          <NavigatorSquare name='設定' route='#'/>
          <NavigatorSquare name='健康的なお勧め' route='#'/>
        </div>
    </div>}
      />
  )
}

export default Home
