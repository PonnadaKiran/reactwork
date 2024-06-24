import ItemList from "./ItemList.js"
import {useState} from 'react';

const RestaurantCategory = ({ data,setShowIndex,showItems }) => {
  // console.log(category)
  // const [showItems,setShowItems]=useState(false);

  const handleClick=()=>{
    // setShowItems(!showItems);
    setShowIndex();
  }

  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
      <div 
        className="flex justify-between cursor-pointer"
        onClick={handleClick}>
        <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
        </span>
        <span>🔽</span>
      </div>

      {showItems && <ItemList items={data.itemCards}/>}


      {/* <h2>{category.title}</h2>
      <ul>
        {category.itemCards.map((item, index) => (
          <li key={index}>
            {item.card.info.name} - Rs.{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RestaurantCategory;

