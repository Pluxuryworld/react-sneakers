import {useContext} from "react";
import ContentLoader from "react-content-loader";
import cardStyles from './Card.module.scss';
import AppContext from "../../context";

function Card(
    {
        id,
        favoriteId,
        title,
        imgUrl,
        price,
        onFavorite,
        onPlus,
        loading = false
    }) {
    const {isItemAdded, isItemFavorited} = useContext(AppContext)
    const obj = {id, favoriteId, title, imgUrl, price};

    const handleFavorite = () => {
        onFavorite(obj);
    };

    const handlePlus = () => {
        onPlus({id, title, imgUrl, price});
    };

    return (
        <div className={cardStyles.card}>
            {loading ? (<ContentLoader
                    speed={2}
                    width={200}
                    height={292}
                    viewBox="0 0 200 292"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="25" ry="25" width="200" height="135"/>
                    <rect x="5" y="145" rx="10" ry="10" width="190" height="25"/>
                    <rect x="150" y="175" rx="20" ry="20" width="35" height="35"/>
                    <rect x="10" y="180" rx="10" ry="10" width="85" height="25"/>
                </ContentLoader>)
                : (
                    <>

                        {onFavorite && <div className={cardStyles.favorite} onClick={handleFavorite}>
                            <img src={isItemFavorited(id) ? "/img/favorite.svg" : "/img/add-favorite.svg"}
                                 alt="Add-favorite"/>
                        </div>}
                        <img width={150} height={130} src={imgUrl} alt="Sneakers"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between">
                            <div className="d-flex flex-column">
                                <span>Price:</span>
                                <b>{price} UAH</b>
                            </div>
                            {onPlus && <input type="image" className={` ${cardStyles.plus} ${isItemAdded(id) && cardStyles.disabledPlus}`}
                                              onClick={handlePlus}
                                              disabled={isItemAdded(id)}
                                              src={isItemAdded(id) ? "img/done.svg" : "img/plus.svg"}
                                              alt="Plus"/>}
                        </div>
                    </>)
            }

        </div>
    );
}

export default Card;