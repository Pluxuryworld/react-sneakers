import {useState, useEffect} from "react";
import axios, {post} from "axios";
import Card from './components/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const url = "https://65080dbb56db83a34d9ba7fb.mockapi.io/items";

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setItems(res.data)
            });
        axios.get('https://65080dbb56db83a34d9ba7fb.mockapi.io/cart')
            .then(res => {
                setCartItems(res.data)
            });
    }, []);

    useEffect(() => {
        {
            cartOpened ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
        }
    });

    const onAddToCart = (obj) => {
        axios.post('https://65080dbb56db83a34d9ba7fb.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    };



    const onRemoveItems = (id) => {
        axios.delete(`https://65080dbb56db83a34d9ba7fb.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    const onAddToFavorite = (obj) => {
        axios.post('https://6513e6498e505cebc2ea52fd.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, obj]);
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} removeItem={onRemoveItems} onClose={() => setCartOpened(false)}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="content  p-40">

                <div className="d-flex align-center mb-40 justify-between">
                    <h1>{searchValue ? `Search by request: "${searchValue}"` : "All sneakers"}</h1>
                    <div onClick={() => setSearchValue('')} className="search-block d-flex align-center">
                        <img width={20} height={20} src="img/search.svg" alt="Search"/>
                        {searchValue && <img className="clear cu-p" src="img/cancel.svg" alt="Clear"/>}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-around">
                    {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            imgUrl={item.imgUrl}
                            price={item.price}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default App;
