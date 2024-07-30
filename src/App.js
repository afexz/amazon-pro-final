
import CarouselImage from './components/Carousel';
import './App.css';
import Header from './components/Header';
import Catagory from './components/Catagory';
import Product from './components/Product';
import Routing from './Router.js';
import Landingpage from './components/Pages/Landing/Landing';
import { useContext, useEffect } from 'react';
import { DataContext } from './components/DataProvider.js';
import { Type } from './Utility/actiontype.js';
import { auth } from './Utility/firebase.js';

function App() {
  const [{user}, dispatch] = useContext(DataContext)
  useEffect (()=>{
      auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          dispatch({
            type:Type.SET_USER,
            user:authUser
          })
        }else {
            dispatch({
              type: Type.SET_USER,
              user: null,
            });
        }
      })
  },[])
  return <Routing/>
}

export default App;
