import { CircleLoader } from "react-spinners";
import "../styles/styles.scss";
const Loader = () => {
    return (

        <div className="loader-container">
            <CircleLoader color="red" size={100} />
        </div>

    );
}
export default Loader;