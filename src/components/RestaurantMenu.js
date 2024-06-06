import React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Shimmer from './Shimmer';
import { MENU_API } from '../utils/constants';


const RestaurantMenu = () => {

  const [resInfo,setResInfo]=useState(null);
  const {resId}=useParams();
  console.log(resId);

  useEffect(()=>{
    fetchMenu();
  },[]);


  const fetchMenu=async()=>{
    const data=await fetch(MENU_API + resId);
    const json=await data.json();

    console.log(json);

    setResInfo(json.data);
  }

  if(resInfo===null) return <Shimmer/>;

  const {
    name,
    cuisines,
    costForTwoMessage,
    costForTwo,
    cloudinaryImageId,
    avgRating,
    deliveryTime
  }=resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    console.log(itemCards);

  return (
    <div>
      <h1>{name}</h1>
      <p>{cuisines.join(",")} - {costForTwoMessage}</p>

      <h2>Menu</h2>
      {itemCards.map((item)=>(<li>
        {item.card.info.name} - {'Rs.'}
        {item.card.info.price/100 || item.card.info.defaultPrice/100}</li>))}
    </div>
  )
}

export default RestaurantMenu