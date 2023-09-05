function Card(props) {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/add-favorite.svg" alt="Add-favorite"/>
            </div>
            <img width={150} height={130} src={props.imgUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>{props.price} UAH</b>
                </div>
                <button className="button">
                    <img width={45} height={45} src="img/plus.svg" alt="Plus"/>
                </button>
            </div>
        </div>
    );
}

export default Card;