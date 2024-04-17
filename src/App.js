import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import Card from "./components/Card";
import { SearchOutlined } from '@ant-design/icons';
import './styles/styles.scss';


const App = () => {
  const [countryCard, setCountryCard] = useState([]);
  const [loader, setLoader] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [regionValue, setRegionValue] = useState('');

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    const url = "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json";
    try {
      const response = await axios.get(url);
      setCountryCard(Object.values(response.data));
      setLoader(false);

    }
    catch (err) {
      console.error("Something went wrong: ", err);
    }
  }
  const countriesArray = countryCard.slice();


  const handleOption = (e) => {
    setRegionValue(e.target.value);
  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const regionArray = ([...new Set(countriesArray.map(country => country.region))]);

  const filterCountries = countriesArray.filter((el) => {
    if (inputValue === '' && regionValue === '') {
      return el;
    } else {
      const search = el.name.toLowerCase().includes(inputValue.toLowerCase());
      const filter = el.region.includes(regionValue)
      return (search && filter);//stavila sam proveru u dve promenljive da ih ispisem, i u return i da izbaci oba
    }
  });

  if (loader) {
    return <Loader />
  }


  return (
    <div className="wrapper">
      <div className="search-and-filter">
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder='Search...'
            value={inputValue}
            onChange={handleInput} />
        </div>
        <select onChange={handleOption} className="filter">
          <option value="">Filter by region...</option>
          {regionArray.map((region, k) => {
            return (
              <option key={k} value={region}>{region}</option>
            );
          })}
        </select>
      </div>


      <div className="countries">
        {filterCountries.map((country, k) => {
          return (
            <Card country={country} key={k} />
          );
        })}
      </div>

    </div>
  );
}
export default App;



