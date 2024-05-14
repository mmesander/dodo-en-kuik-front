// Functions
import {Link} from 'react-router-dom';

// Styles
import "./Footer.css";

function Footer() {
    return (
        <div className="footer-outer-container">
            <h4>
                Deze applicatie is ontwikkeld door
                <Link
                    to="https://www.linkedin.com/in/mark-mesander/"
                    target="_blank">
                    Dodo
                </Link>
                met assistent
                <Link
                    to="https://www.linkedin.com/in/emeraude-van-deenen-4004795b/"
                    target="_blank">
                    Kuik
                </Link>
            </h4>
        </div>
    );
}

export default Footer;