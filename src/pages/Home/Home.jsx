import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="home">
        <Gallery />
      </main>
    </div>
  );
};

export default Home;
