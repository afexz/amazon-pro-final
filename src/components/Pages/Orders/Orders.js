import React,{useContext, useEffect, useState} from 'react'
import Layout from '../../Layout';
import { db } from '../../../Utility/firebase';
import { DataContext } from '../../DataProvider';
import ProductCard from '../../ProductCard';
import "./orders.css"

function Orders() {

  const [{user}, dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])

  useEffect (() =>{
    if(user) {
      db.collection('users').doc(user.uid).collection('orders').orderBy('created', 'desc').onSnapshot((snapshot)=>{
        setOrders(snapshot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data()
        })))
      })

    }else{
      setOrders([])
    }

  },[])

  return (
    <Layout>
      <section className='container__payment'>
         <div className='orders__container'>
           <h2>Your Orders</h2>
              {
                orders?.length == 0 && (<div style={{padding:"15px"}}>You don't have any orders yet.</div>
              )}

            <div className='map__container'>
               {orders?.map((eachOrder, i)=>{
                return (
                  <div key={i}>
                    <hr/>
                    <p>Order ID: {eachOrder?.id}</p>
                    {eachOrder?.data?.basket?.map(order=>{
                      return (<ProductCard
                      flex={true} product={order} key={order.id}/>
                      )
                    })}
                    </div>
                )
               })}
            </div>
         </div>
      </section>
    </Layout>
  );
}

export default Orders
