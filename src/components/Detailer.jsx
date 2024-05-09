import PropTypes from "prop-types";

function Detailer(props) {
  return (
    <div className="detailer">
      <div className="detailer__line"></div>
      <div className="detailer__blob center">
        <div className="detailer__num">{props.num}</div>
      </div>
      <h2 className="detailer__name">{props.name}</h2>
    </div>
  );
}

Detailer.propTypes = {
  num: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Detailer;
