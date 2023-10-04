import {useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

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
        {
            cartOpened ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
        }
    });

    const onAddToCart = (obj) => {

        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://65080dbb56db83a34d9ba7fb.mockapi.io/cart/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://65080dbb56db83a34d9ba7fb.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, obj]);


        }
    };


    const onRemoveItems = (id) => {
        axios.delete(`https://65080dbb56db83a34d9ba7fb.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://6513e6498e505cebc2ea52fd.mockapi.io/favorites/${obj.id}`);
                // setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                const {data} = await axios.post('https://6513e6498e505cebc2ea52fd.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
        }
    };


    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };


    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }

    return (
        <AppContext.Provider value={{
            items, cartItems, favorites, searchValue, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened,
            setCartItems
        }}>
            <div className="wrapper clear">
                {cartOpened &&
                    <Drawer items={cartItems} removeItem={onRemoveItems} onClose={() => setCartOpened(false)}/>}
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" exac element={<Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />}></Route>
                    <Route path="/favorites" element={<Favorites/>}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
