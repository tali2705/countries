import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { SearchOutlined } from '@ant-design/icons';


const Cards = () => {
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
            console.log(response.data);
            setCountryCard(Object.values(response.data));
            setLoader(false);

        }
        catch (err) {
            console.error("Something went wrong: ", err);
        }
    }

    const handleInput = (e) => {
        setInputValue(e.target.value);
        console.log(inputValue);
    }
    const filterCountries = countryCard.filter((el) => {
        if (inputValue === '' && regionValue === '') {
            return el;
        } else {
            const search = el.name.toLowerCase().includes(inputValue.toLowerCase());
            const filter = el.region.includes(regionValue)
            return (search && filter);//stavila sam proveru u dve promenljive da ih ispisem, i u return i da izbaci oba
        }


    });
    const handleOption = (e) => {
        setRegionValue(e.target.value);
        console.log(regionValue);
    }

    const regionArray = ([...new Set(countryCard.map(country => country.region))]);


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
            </div >
            <div className="countries">
                {
                    filterCountries.map((country, k) => {
                        return (
                            <div className="card" key={k}>
                                <div className="flag">
                                    <img src={country.flag.large} alt={country.official_name} />
                                </div>
                                <h3>{country.name}</h3>
                                <p><span>Population: </span> {country.population}</p>
                                <p><span>Region: </span>{country.region}</p>
                                <p><span>Capital: </span>{country.capital}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div >
    );
}
export default Cards;

//flag
//population
//region
//capital