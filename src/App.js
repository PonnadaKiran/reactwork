import React,{lazy,Suspense,useContext,useState,useEffect} from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
// import RestaurantCategory from "./components/ResCategory";
// import Grocery from "./components/Grocery";

//first one is tag and the next is attribute, the last is children

// const parent=React.createElement("div",{id:"parent"},
//     [
//         React.createElement("div",{id:"child"},
//         [
//             React.createElement("h1",{},"this is h1 tag"),
//             React.createElement("h2",{},"this is h2 tag")
//         ]
//     ),
//         React.createElement("div",{id:"child2"},
//         [
//             React.createElement("h1",{},"this is h1 tag"),
//             React.createElement("h2",{},"this is h2 tag")
//         ]
//     )
//     ]
// )

// console.log(parent);//object


// const heading=React.createElement("h1",{id:"heading"},"welcome to the world of joy!");

// const root=ReactDOM.createRoot(document.getElementById("root"));


// root.render(heading);//this will create html using that heading object




// const heading=React.createElement("h1",{id:"head1"},"this is generated ai era");


// const heading=<h1 id="head1" tabIndex="2">this is jsx code</h1>

// console.log(heading)

// const Title=()=>{
//     return(
        
//         <div>
//             {heading}
//             <h1>lsdnfdjsjnksnouhal</h1>
//         </div>

//     )
// }

// const Component=()=>(
//     <div>
//         <Title/>
//         <Title></Title>
//         {Title()}
//     </div>
// );
// console.log(Component);

// console.log(Component())
/*
components for food ordering app
1) header
    logo
    nav items

2) Body
    search
    res-container
        res-card
            img
            name of res, star rating, cuisine, delicvery time

3) footer
    copyright
    links
    address
    contact
 */

const Grocery=lazy(()=>import('./components/Grocery'))
const About=lazy(()=>import('./components/About'))

import UserContext from "./utils/UserContext";

import {Provider} from 'react-redux';
import Cart from "./components/Cart";
import appStore from './utils/appStore';



const App=()=>{

    const [userName,setUserName]=useState();

    useEffect(()=>{
        const data={
            name:"Joe Root"
        }

        setUserName(data.userName)
    },[]);

    return(
        <Provider store={appStore}>
            <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
                <div className="app">
                    <Header/>
                    <Outlet/>
                </div>
            </UserContext.Provider>
        </Provider>
    )
}

const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path:"/about",
                element:<Suspense>
                    <About/>
                </Suspense>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"restaurants/:resId",
                element:<RestaurantMenu/>
            },
            {
                path:'/grocery',
                element:(
                    <Suspense fallback={<h1>Loading....</h1>}>
                        <Grocery/>
                    </Suspense>
                )
            },
            {
                path:'/cart',
                element:<Cart/>
            }
        ],
        errorElement:<Error/>
    }
    
])


    
const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);