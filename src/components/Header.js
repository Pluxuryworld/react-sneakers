function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={65} height={65} src="/img/logo.svg"/>
                <div className="headerInfo">
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p>Best sneakers shop</p>
                </div>
            </div>
            <ul className="d-flex ">
                <li onClick={props.onClickCart} className="mr-30 cu-p d-flex align-center">
                    <img width={40} height={40} src="/img/cart.svg"/>
                    <span className="justify-center ml-10">999 UAH</span>
                </li>
                <li className="d-flex align-center">
                    <img width={40} height={40} src="/img/user.svg"/>
                </li>
            </ul>
        </header>
    );
}

export default Header;