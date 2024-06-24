import { LOGO_URL } from "../utils/constants";
import {useState,useContext} from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header=()=>{

    const [butt, setButt]=useState("LogIn");
    const onlineStatus=useOnlineStatus();

    const {loggedInUser}=useContext(UserContext);
    // console.log(loggedInUser)

    const cartItems=useSelector((store)=>store.cart.items);
    console.log(cartItems);

    return(
        <div className="flex justify-between bg-pink-200 shadow-xl sm:bg-yellow-200 lg:bg-green-300 font-[500]">
            <div className="logo-container">
                <img
                    src={LOGO_URL}
                    alt="app logo"
                    className="w-40 mx-6 my-2"
                />
            </div>

            <div className="flex items-center">
                <ul className="flex p-4 m-4 text-lg">
                    <li className="px-4">
                        Online Status: {onlineStatus ? '✅' : '⛔'}
                    </li>
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/cart'>🛒{cartItems.length}</Link>
                    </li>
                    <li className="px-4">{loggedInUser}</li>
                    <button className="toggle-button" onClick={()=>{
                        butt==="LogIn" ? setButt("LogOut") : setButt("LogIn");
                    }}>{butt}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;