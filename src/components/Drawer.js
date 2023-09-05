function Drawer() {
    return (
        <div style={{display: 'none'}} className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">CART
                    <img width={25} height={25} className="cartClose cu-p" src="img/cancel.svg" alt="Close"/>
                </h2>
                <div className="items">

                    <div className="cartItem d-flex align-center mb-20">

                        <div style={{backgroundImage: 'url(img/sneakers/1.jpg)'}} className="cartItemImg"></div>

                        <div className="mr-20">
                            <p className="mb-5 d-flex">ADIDAS OZRAH</p>
                            <b>10000 UAH</b>

                        </div>
                        <img className="cartItemRemove" src="img/cancel.svg" alt="Cancel"/>
                    </div>

                    <div className="cartItem d-flex align-center mb-20">

                        <div style={{backgroundImage: 'url(img/sneakers/1.jpg)'}} className="cartItemImg"></div>

                        <div className="mr-20">
                            <p className="mb-5 d-flex">ADIDAS OZRAH</p>
                            <b>10000 UAH</b>

                        </div>
                        <img className="cartItemRemove" src="img/cancel.svg" alt="Cancel"/>
                    </div>
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
                    <button className="greenButton">APPLY ORDER <img width={30} height={30} src="img/arrow.svg"
                                                                     alt="arrow"/></button>
                </div>
            </div>
        </div>
    );
}

export default Drawer;