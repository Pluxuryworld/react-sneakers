import Card from './components/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
    return (
        <div className="wrapper clear">
            <Drawer />
            <Header />
            <div className="content p-35">

                <div className="d-flex align-center mb-40 justify-between">
                    <h1>All sneakers</h1>
                    <div className="search-block d-flex align-center">
                        <img width={20} height={20} src="img/search.svg" alt="Search"/>
                        <input placeholder="Search..."/>
                    </div>
                </div>

                <div className="d-flex">
                  <Card
                      title="ADIDAS OZRAH"
                      imgUrl="/img/sneakers/1.jpg"
                      price={12000}
                  />
                  <Card
                      title="NIKE 92"
                      imgUrl="/img/sneakers/2.jpg"
                      price={10000}
                  />
                </div>

            </div>
        </div>
    );
}

export default App;
