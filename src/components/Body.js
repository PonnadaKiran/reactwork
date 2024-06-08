import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import {useState,useEffect} from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom';
import useOnlineStatus from "../utils/useOnlineStatus";


const Body=()=>{

    // const arr=useState(resList);
    // const listOfRestaurants=arr[0];
    // const setListOfRestaurants=arr[1];

    // const [listOfRestaurants,setListOfRestaurants]=useState(resList);
    const [listOfRestaurants,setListOfRestaurants]=useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    // console.log(listOfRestaurants)

    const [searchText, setSearchText]=useState();


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
            <div className="filter">

                <div className="search">
                <input
                        type="text"
                        placeholder="Search a restaurant you want..."
                        className="searchBox"
                        value={searchText}
                        onChange={(e) => {
                        setSearchText(e.target.value);
                        }}
                    />
                    <button
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

                <button
                className="filter-btn"
                onClick={() => {
                    // * Filter logic
                    const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4.2
                    );

                    setFilteredRestaurant(filteredList);
                    // console.log(filteredList);
                }}
                >
                Top Rated Restaurants
                </button>
            </div>

            <div className="res-container">
                {/* <RestaurantCard resData={resList[2]}/> */}
                {filteredRestaurant.map((restaurant)=>
                (<Link key={restaurant.info?.id}
                    to={'/restaurants/' + restaurant.info?.id}>

                    <RestaurantCard  resData={restaurant}/>
                </Link>))}
            </div>
        </div>
    )
}

export default Body;