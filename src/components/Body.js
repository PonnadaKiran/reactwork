import resList from "../utils/mockData";
import RestaurantCard,{withPromotedLabel} from "./RestaurantCard";
import {useState,useEffect,useContext} from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom';
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Body=()=>{

    // const arr=useState(resList);
    // const listOfRestaurants=arr[0];
    // const setListOfRestaurants=arr[1];

    // const [listOfRestaurants,setListOfRestaurants]=useState(resList);
    const [listOfRestaurants,setListOfRestaurants]=useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    console.log(listOfRestaurants)

    const [searchText, setSearchText]=useState();

    const Promotedcard=withPromotedLabel(RestaurantCard);


    useEffect(()=>{
        fetchData();
        // console.log("something happended")
    },[]);

    const fetchData=async ()=>{
        const data= await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.624480699999999&page_type=DESKTOP_WEB_LISTING');
        const json=await data.json();
        // console.log(json);

        // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);

        // setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setListOfRestaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        // setListOfRestaurants(json?.data?.cards)
        // console.log(listOfRestaurants)
        setFilteredRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    }

    // debugger;
    const onlineStatus=useOnlineStatus();

    const {loggedInUser,setUserName}=useContext(UserContext)

    if(onlineStatus === false) return (<h1>looks like there is no internet</h1>);
    // debugger;
    // if(listOfRestaurants === 0){
    //     return <Shimmer/>;
    // }

    return listOfRestaurants.length === 0 ? (
        <Shimmer />
      ):(
        <div className="body">
            {/* <div className="search">Search</div> */}
            <div className="filter flex">

                <div className="search m-4 p-4">
                    <input
                        type="text"
                        placeholder="Search a restaurant you want..."
                        className="searchBox px-2 py-1 rounded-sm border border-black border-solid"
                        value={searchText}
                        onChange={(e) => {
                        setSearchText(e.target.value);
                        }}
                    />
                    <button
                        className="px-4 py-2 bg-green-200 m-4 rounded-lg"
                        onClick={() => {
                        // * Filter the restaurant cards and update the UI
                        // * searchText
                        // console.log(searchText);

                        const filteredRestaurant = listOfRestaurants.filter((res) =>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurant);
                        }}
                    >
                        Search
                    </button>
                </div>

                <div className="flex items-center m-4 p-4">
                    <button
                    className="filter-btn px-4 py-2 m-4 bg-blue-200 rounded-lg"
                    onClick={() => {
                        // * Filter logic
                        const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.2
                        );

                        setFilteredRestaurant(filteredList);
                        // console.log(filteredList);
                    }}
                    >Top Rated Restaurants
                    </button>
                </div>
                
                <div className="p-4 m-4 flex items-center">
                    <label htmlFor="name" className="text-lg font-medium">Name : </label>
                    <input
                        id="name"
                        className="border border-black m-2 p-1"
                        value={loggedInUser}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* <RestaurantCard resData={resList[2]}/> */}
                {filteredRestaurant.map((restaurant)=>
                (<Link key={restaurant.info?.id}
                    to={'/restaurants/' + restaurant.info?.id}>

                    {restaurant.info.veg ? <Promotedcard resData={restaurant}/>:<RestaurantCard  resData={restaurant}/>}
                </Link>))}
            </div>
        </div>
    )
}

export default Body;