const Card = (props) => {
    return (
        <div className="card">
            <div className="flag">
                <img src={props.country.flag.large} alt={props.country.official_name} />
            </div>
            <div className="country-info">
                <h3>{props.country.name}</h3>
                <p><span>Population: </span>{props.country.population} </p>
                <p><span>Region: </span>{props.country.region}</p>
                <p><span>Capital: </span>{props.country.capital}</p>
            </div>
        </div>
    );
}
export default Card;