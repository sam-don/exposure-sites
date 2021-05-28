import './App.css';
import icon from './Exposure-Site-Icon.svg'
import MyComponent from './components/Map'
import instaIcon from './assets/instagram-logo.svg'
import linkedInIcon from './assets/linkedin.svg'

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
      <div className="links">
        <a href="https://www.coronavirus.vic.gov.au/exposure-sites">Find more info on the Vic Gov page</a>
        <a href="https://www.covid19data.com.au/">More Covid-19 related data</a>
      </div>
      <main>
        <MyComponent />
      </main>
      <div className ="findMe">
        Find me here: <a href="https://www.instagram.com/sam___don/"><img className="logo" src={instaIcon} /></a> <a href="https://www.linkedin.com/in/samitha-don-95518318a/"><img className="logo" src={linkedInIcon} /></a>
      </div>
    </div>
  );
}

export default App;
