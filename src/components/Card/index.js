import React from "react";
import cardStyles from './Card.module.scss';


function Card({title, imgUrl, price, onFavorite, onPlus,}) {
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [isAdded, setIsAdded] = React.useState(false);

    const handleFavorite = () => {
        onFavorite({title, imgUrl, price});
        setIsFavorite(!isFavorite);
    };

    const handlePlus = () => {
        onPlus({title, imgUrl, price});
        setIsAdded(!isAdded);

    };

    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.favorite} >
                <img onClick={handleFavorite} src={ isFavorite ? "/img/favorite.svg" :"/img/add-favorite.svg"} alt="Add-favorite"/>
            </div>
            <img width={150} height={130} src={imgUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>{price} UAH</b>
                </div>
                    <img className={cardStyles.plus}
                         onClick={handlePlus}
                         src={isAdded ? "img/done.svg" : "img/plus.svg"}
                         alt="Plus"/>
            </div>
        </div>
    );
}

export default Card;