import './App.css';
import Loading from './loading';
import Luna from './luna';
import Star from './stars';
const Home = () =>{
  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src="./Assets/logo.png" className="App-logo" alt="logo" />
      </header>
      <Luna show={true}/>
    </div>
    
    <Loading show={false}/>
    <Star show={true}/>
    </>
  );
}

export default Home;
