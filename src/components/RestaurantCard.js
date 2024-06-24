import { CDN_URL } from "../utils/constants";



const RestaurantCard=(props)=>{

    // console.log(props);
    const {resData}=props;

    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        deliveryTime,
        sla
      } = resData?.info;

    return(
        <div className="res-card p-4 m-4 w-[250px] border bg-red-100 shadow-md rounded-lg hover:bg-red-200 transition-all">
            <img
                className="res-logo w-[250px] h-[200px] rounded-lg"
                alt="res-logo"
                src={
                   CDN_URL+
                  props.resData.info.cloudinaryImageId
                }

            />
            
            <h3 className="font-bold text-lg py-2">{name}</h3>
            <h4 className="break-words text-sm text-gray-700 mb-2">{cuisines.join(', ')}</h4>
            <h4 className="text-sm text-yellow-600 mb-1">Rating: {avgRating}</h4>
            <h4 className="text-sm text-gray-600 mb-1">Cost for Two: {costForTwo}</h4>
            <h4 className="text-sm text-gray-600">Delivery Time: {sla.deliveryTime} minutes</h4>
        </div>
    )
}

export const withPromotedLabel=(RestaurantCard)=>{
    return (props)=>{
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
                Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}


export default RestaurantCard;