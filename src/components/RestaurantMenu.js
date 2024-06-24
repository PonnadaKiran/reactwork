import React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Shimmer from './Shimmer';
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from './RestaurantCategory';


const RestaurantMenu = () => {

  
  const {resId}=useParams();
  console.log(resId);

  const resInfo=useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  const dummy="I am Kiran";

  

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

  // const { itemCards } =
  //   resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  //   console.log(itemCards);

  const categories=resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c)=>
      c.card?.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  ) || [];

  // console.log(categories)

  // debugger;
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
      {categories.map((category, index) => (
        // Controlled Component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category.card?.card}
          showItems={index === showIndex ? true: false}
          setShowIndex={()=>setShowIndex(index  === showIndex ? null : index)}
        />
      ))}

      {/* <h2>Menu</h2>
      {itemCards.map((item)=>(<li>
        {item.card.info.name} - {'Rs.'}
        {item.card.info.price/100 || item.card.info.defaultPrice/100}</li>))} */}
      
    </div>
  )
}

export default RestaurantMenu