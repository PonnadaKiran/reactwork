import { CDN_URL } from "../utils/constants";



const RestaurantCard=(props)=>{

    // console.log(props);
    const {resData}=props;

    // const {
    //     cloudinaryImageId,
    //     name,
    //     cuisines,
    //     avgRating,
    //     costForTwo,
    //     deliveryTime,
    //   } = resData?.data;

    return(
        <div className="res-card" style={{backgroundColor:"#f0f0f0"}}>
            <img
                className="res-logo"
                alt="res-logo"
                src={
                   CDN_URL+
                  props.resData.info.cloudinaryImageId
                }

            />
            
            <h3>{props.resData.info.name}</h3>
            <h4>{props.resData.info.cuisines.join(',')}</h4>
            <h4>{resData.info.avgRating}</h4>
            <h4>{resData.info.costForTwo}</h4>
            <h4>{resData.info.sla.deliveryTime} minutes</h4>
        </div>
    )
}


export default RestaurantCard;