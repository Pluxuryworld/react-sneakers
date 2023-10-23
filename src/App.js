import {useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const url = "https://65080dbb56db83a34d9ba7fb.mockapi.io/items";

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const cartResponse = await axios.get('https://65080dbb56db83a34d9ba7fb.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://6513e6498e505cebc2ea52fd.mockapi.io/favorites');
            const itemsResponse = await axios.get(url);

            setIsLoading(false);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);

        }

        fetchData();
    }, []);

    useEffect(() => {
        cartOpened ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
    });

    const onAddToCart = async (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                const deletedItem = await axios.delete(`https://65080dbb56db83a34d9ba7fb.mockapi.io/cart/${obj.cartItemId}`);
                setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const addedItem = await axios.post('https://65080dbb56db83a34d9ba7fb.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, addedItem.data]);
            }
        } catch (err) {
            console.log(err)
        }
    };


    const onRemoveItems = (cartItem) => {
        axios.delete(`https://65080dbb56db83a34d9ba7fb.mockapi.io/cart/${cartItem.cartItemId}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(cartItem.id)));
    };

    const onAddToFavorite = async (favItem) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(favItem.id))) {
                const deletedFavItem = axios.delete(`https://6513e6498e505cebc2ea52fd.mockapi.io/favorites/${favItem.favoriteId}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(favItem.id)))
            } else {
                const addedFavItem = await axios.post('https://6513e6498e505cebc2ea52fd.mockapi.io/favorites', favItem);
                setFavorites((prev) => [...prev, addedFavItem.data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
        }
    };

    const getFavoriteIdItem = (id) => {
        const cartItem = favorites.find((obj) => Number(obj.id) === Number(id))
        return cartItem && cartItem.favoriteId
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };


    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    }

    const isItemFavorited = (id) => {
        return favorites.some((obj) => Number(obj.id) === Number(id));
    }

    return (
        <AppContext.Provider value={{
            items, cartItems, favorites, searchValue, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened,
            setCartItems, isItemFavorited, getFavoriteIdItem
        }}>
            <div className="wrapper clear">
                {cartOpened &&
                    <Drawer items={cartItems} removeItem={onRemoveItems} onClose={() => setCartOpened(false)}/>}
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" exac element={<Home
                        items={items}
                        favorites={favorites}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />}></Route>
                    <Route path="/favorites" element={<Favorites/>}></Route>
                    <Route path="/orders" element={<Orders/>}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
