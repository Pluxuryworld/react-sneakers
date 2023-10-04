import Card from "../components/Card";
import AppContext from "../context";
import {useContext} from "react";

function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onAddToCart,
                  onAddToFavorite,
                  onChangeSearchInput,
                  isLoading,
              }) {

    const {isItemAdded} = useContext(AppContext);

    const renderItems = () => {
        const filteredItems = items.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(8)] : filteredItems)
            .map((item, index) => (
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    added={isItemAdded(item && item.id)}
                    loading={isLoading}
                    {...item}
                />
            ))
    }


    return (
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
                {renderItems()}
            </div>

        </div>)
}

export default Home;