import './App.css';
import icon from './Exposure-Site-Icon.svg'
import MyComponent from './components/Map'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={icon} />
        <h1>
          {/* {icon} */}
          VIC Covid-19 Exposure Sites
        </h1>
      </header>
      <main>
        <MyComponent />
      </main>
    </div>
  );
}

export default App;
