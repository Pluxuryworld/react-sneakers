import Card from "../components/Card";
import {useContext} from "react";
import AppContext from "../context";

function Favorites() {

    const {favorites, onAddToFavorite, onAddToCart} = useContext(AppContext);

    return(
        <div className="content  p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{"My favorites"}</h1>
            </div>

            <div className="d-flex flex-wrap justify-around">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        onPlus={(obj) => onAddToCart(obj)}
                        {...item}
                    />
                ))}
            </div>

        </div>
    );
}
export default Favorites;