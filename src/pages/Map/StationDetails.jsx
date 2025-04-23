import PropTypes from "prop-types";
import "./StationDetails.css";
import coffeeImg from "../../assets/map_img/coffe.png";
import moneyImg from "../../assets/map_img/money.png";
import gasImg from "../../assets/map_img/gas.png";

const StationDetails = ({ station, onClose }) => {
  if (!station) return null;

  // Format opening hours for display
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return (
    <div className="station-details-overlay">
      <div className="station-details-container">
        <div className="station-content-gradient">
          <div className="station-header">
            <div className="station-header-left">
              <h2 className="station-name">Z {station.name}</h2>
              <p className="station-address">{station.address}</p>

              <div className="opening-hours">
                {daysOfWeek.map((day) => (
                  <div key={day} className="day-hours">
                    <span className="day">{day}</span>
                    <span className="hours">24 Hours</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="station-header-right">
              <div className="location-pin">📍</div>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
          </div>

          <div className="station-content">
            <div className="info-panel">
              <div className="services-section">
                <h3 className="services-title">Services Offered</h3>
                <div className="services-icons">
                  {station.services && station.services.includes("Toilet") && (
                    <div className="service-icon">🚻</div>
                  )}
                  {station.services && station.services.includes("Fuel") && (
                    <div className="service-icon">⛽</div>
                  )}
                  {station.services && station.services.includes("Coffee") && (
                    <div className="service-icon">☕</div>
                  )}
                  {station.services && station.services.includes("Car Wash") && (
                    <div className="service-icon">🚿</div>
                  )}
                  {station.services && station.services.includes("EV Charging") && (
                    <div className="service-icon">🔌</div>
                  )}
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <div className="info-text">
                    <h3>Worried about Prices?</h3>
                    <a href="#" className="info-link">
                      Click here
                    </a>
                  </div>
                  <div className="info-image">
                    <img src={moneyImg} alt="Money icon" />
                  </div>
                </div>
              </div>

              <div className="contact-store">
                <h3>Contact Store</h3>
                <a href={`tel:${station.phone || "092988185"}`} className="phone-number">
                  📞 {station.phone || "09 2988185"}
                </a>
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <div className="info-text">
                    <h3>Need more energy?</h3>
                    <a href="#" className="info-link">
                      Pre-order Now!
                    </a>
                  </div>
                  <div className="info-image">
                    <img src={coffeeImg} alt="Coffee cup" />
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-content">
                  <div className="info-text">
                    <h3>Out of Fuel?</h3>
                    <a href="#" className="info-link">
                      Top up now, Click here!
                    </a>
                  </div>
                  <div className="info-image">
                    <img src={gasImg} alt="Fuel gauge" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StationDetails.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    services: PropTypes.array.isRequired,
    isOpen: PropTypes.bool,
    phone: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default StationDetails;
