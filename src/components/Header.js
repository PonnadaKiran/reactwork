import { LOGO_URL } from "../utils/constants";
import {useState} from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Header=()=>{

    const [butt, setButt]=useState("LogIn");
    const onlineStatus=useOnlineStatus();

    return(
        <div className="header">
            <div className="logo-container">
                <img
                    src={LOGO_URL}
                    alt="app logo"
                    className="logo"
                />
            </div>

            <div className="nav-items">
                <ul>
                    <li>
                        Status:{onlineStatus ? "online":"offline"}
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li>Cart</li>
                    <button className="toggle-button" onClick={()=>{
                        butt==="LogIn" ? setButt("LogOut") : setButt("LogIn");
                    }}>{butt}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;