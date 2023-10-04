function Drawer({onClose, removeItem, items = []}) {
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
                                    <img onClick={() => removeItem(obj.id)}
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
                                    <b> 20000 UAH</b>
                                </li>
                                <li>
                                    <span>Shiping</span>
                                    <div></div>
                                    <b>1000 UAH</b>
                                </li>
                            </ul>
                            <button className="greenButton">APPLY ORDER
                                <img width={30} height={30} src="img/arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                ) : (
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.svg" alt="Empty"/>
                        <h2>Cart is empty</h2>
                        <p className="opacity-6">Add at least one pair</p>
                        <button onClick={onClose} className="greenButton">
                            <img width="30px" height="30px" src="/img/arrow.svg" alt="Arrow"/>
                            Back to sneakers
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;