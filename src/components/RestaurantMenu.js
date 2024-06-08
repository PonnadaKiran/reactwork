import React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Shimmer from './Shimmer';
import useRestaurantMenu from "../utils/useRestaurantMenu"


const RestaurantMenu = () => {

  
  const {resId}=useParams();
  console.log(resId);

  const resInfo=useRestaurantMenu(resId);

  

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