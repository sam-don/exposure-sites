import './App.css';
import icon from './Exposure-Site-Icon.svg'
import MyComponent from './components/Map'
import instaIcon from './assets/instagram-logo.svg'
import linkedInIcon from './assets/linkedin.svg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="A location marker with a 'Covid-19' icon inside" className="App-logo" src={icon} />
        <h1>
          {/* {icon} */}
          VIC Covid-19 Exposure Sites
        </h1>
      </header>
      <div className="links">
        <a href="https://www.coronavirus.vic.gov.au/exposure-sites" target="_blank" rel="noreferrer">Find more info on the Vic Gov page</a>
        <a href="https://www.covid19data.com.au/" target="_blank" rel="noreferrer">More Covid-19 related data</a>
      </div>
      <main>
        <MyComponent />
      </main>
      <div className ="findMe">
        Find me here: <a href="https://www.instagram.com/sam___don/" target="_blank" rel="noreferrer"><img alt="Instagram icon" className="logo" src={instaIcon} /></a> <a href="https://www.linkedin.com/in/samitha-don-95518318a/" target="_blank" rel="noreferrer"><img alt="LinkedIn Icon" className="logo" src={linkedInIcon} /></a>
      </div>
    </div>
  );
}

export default App;
