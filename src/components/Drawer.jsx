import Info from "./Info";
import {useState} from "react";
import axios from "axios";
import {useCart} from "../hooks/useCart";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, removeItem, items = []}) {
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const {cartItems ,setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = useState(null);

    const onClickOrder = async () => {
        try {
            const { data } = await axios.post('https://6513e6498e505cebc2ea52fd.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://65080dbb56db83a34d9ba7fb.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
    };


    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">CART
                    <img width={25} height={25} onClick={onClose} className="cartClose cu-p" src="img/cancel.svg"
                         alt="Close"/>
                </h2>


                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">

                                    <div style={{backgroundImage: `url(${obj.imgUrl})`}} className="cartItemImg"></div>

                                    <div className="mr-20">
                                        <p className="mb-5 d-flex">{obj.title}</p>
                                        <b>{obj.price} UAH</b>

                                    </div>
                                    <img onClick={() => removeItem(obj)}
                                         className="cartItemRemove"
                                         src="img/cancel.svg"
                                         alt="Cancel"/>
                                </div>
                            ))}
                        </div>
                        <div className="cartTotal">
                            <ul>
                                <li>
                                    <span>Total</span>
                                    <div></div>
                                    <b> {totalPrice} UAH</b>
                                </li>
                                <li>
                                    <span>Shiping</span>
                                    <div></div>
                                    <b>300 UAH</b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">APPLY ORDER
                                <img width={30} height={30} src="img/arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                ) : (
                    <Info title={isOrderComplete ? "Order apply" : "Cart is empty"} description={isOrderComplete ? `Number of order${orderId}, w8 for your order` :"Add at least one pair"} image={isOrderComplete ? "./img/complite-order.png" :"./img/empty-cart.svg"}/>
                )}
            </div>
        </div>
    );
}

export default Drawer;