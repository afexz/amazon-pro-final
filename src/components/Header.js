    import React from 'react'
    import "./header.css";
    import { IoSearchOutline } from "react-icons/io5";
    import { LiaCartPlusSolid } from "react-icons/lia";
    import { BiCart } from "react-icons/bi";
    import { CiLocationOn } from "react-icons/ci";
    import { IoMenuSharp } from "react-icons/io5";
    import { useState, useContext } from 'react';
    import { Link } from 'react-router-dom';
    import { DataContext } from './DataProvider';
    import { auth } from '../Utility/firebase';
  

function Header() {
  const [cartCount, setCartCount] = useState(0);
   const [{user, basket}, dispatch] = useContext(DataContext);
  const [address, setAddress] = useState("Broken Arrow, OK");
  const totalItem = basket?.reduce((amount, item)=>{
    return item.amount + amount
  },0)


  // const addToCart = () => {
  //   setCartCount(cartCount + 1);
  // };

  const updateAddress = () => {
    const newAddress = prompt("Enter your address:");
    if (newAddress) {
      setAddress(newAddress);
    }
  };
 return (
   <div className="header-wrapper">
     <header className="header">
       <div className="header__logo">
         <Link to="/">
           <img
             src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
             alt="Amazon Logo"
           />
         </Link>
       </div>

       <div className="header__deliverTo" onClick={updateAddress}>
         <CiLocationOn className="header__locationIcon" />
         <div className="header__deliverToText">
           <span className="header__deliverToLineOne">Deliver to</span>
           <span className="header__deliverToLineTwo">{address}</span>
         </div>
       </div>
       <div className="header__search">
         <select name="" id="">
           <option value="">All</option>{" "}
         </select>
         <input type="text" className="header__searchInput" />
         <IoSearchOutline className="header__searchIcon" />
       </div>
       <div className="header__nav">
         <div className="header__optionFlag">
           <img
             src="https://image.shutterstock.com/image-vector/american-flag-4th-july-illustration-260nw-1422095750.jpg"
             alt=""
           />
           {/* <span className="header__optionLineOne">Your</span> */}
           <span className="header__optionLineTwo">EN</span>
         </div>
         <Link to={!user && "/auth"}>
           <div className="header__option">
             {user ? (
               <>
                 <span className="header__optionLineOne">
                   Hello,{user?.email?.split("@")[0]}
                 </span>
                 <span onClick={()=>auth.signOut()} className="header__optionLineTwo">Sign Out</span>
               </>
             ) : (
               <>
                 <span className="header__optionLineOne">Hello, Sign in</span>
                 <span className="header__optionLineTwo">Account & Lists</span>
               </>
             )}
           </div>
         </Link>
         <Link to="/orders">
           <div className="header__option">
             <span className="header__optionLineOne">Returns</span>
             <span className="header__optionLineTwo">& Orders</span>
           </div>
         </Link>
         <Link to="/cart">
           <div className="header__optionBasket">
             <BiCart size={35} />
             <span className="header__basketCount">{totalItem}</span>
           </div>
         </Link>
       </div>
     </header>
     <div className="lowerHeader">
       <ul className="lowerHeader__links">
         <li className="lowerHeader__link">
           {" "}
           <IoMenuSharp /> <p className="text__all">All</p>
         </li>
         <li className="lowerHeader__link">Same-Day Delivery</li>
         <li className="lowerHeader__link">Medical Care</li>
         <li className="lowerHeader__link">Amazon Business</li>
         <li className="lowerHeader__link">Amazon Basics</li>
         <li className="lowerHeader__link">Livestreams</li>
         <li className="lowerHeader__link">Pharmacy</li>
         <li className="lowerHeader__link">Buy Again</li>
         <li className="lowerHeader__link">Household,Health &Baby Care</li>
         <li className="lowerHeader__link">Shop By Interest</li>
         <li className="lowerHeader__link">Books</li>
         <li className="lowerHeader__link">Subscribe & Save</li>
       </ul>
     </div>
   </div>
 );
}

export default Header
