import Card from "../components/Card";
import {useEffect, useState} from "react";

import axios from "axios";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const {data} = await axios.get("https://6513e6498e505cebc2ea52fd.mockapi.io/orders");
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
        })();
    }, [])


    return(
        <div className="content  p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{"My orders"}</h1>
            </div>

            <div className="d-flex flex-wrap ">
                {(isLoading ? [...Array(10)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>

        </div>
    );
}
export default Orders;