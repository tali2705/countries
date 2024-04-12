const Card = (props) => {
    return (
        <div className="countries">
            {
                props.filterCountries.map((country, k) => {
                    return (
                        <div className="card" key={k}>
                            <div className="flag">
                                <img src={country.flag.large} alt={country.official_name} />
                            </div>
                            <div className="country-info">
                                <h3>{country.name}</h3>
                                <p><span>Population: </span>{country.population} </p>
                                <p><span>Region: </span>{country.region}</p>
                                <p><span>Capital: </span>{country.capital}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
export default Card;