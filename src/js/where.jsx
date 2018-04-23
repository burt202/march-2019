const React = require("react")
const createReactClass = require("create-react-class")
const PropTypes = require("prop-types")

const GoogleMap = require("./map")

const Where = createReactClass({
  displayName: "Where",

  propTypes: {
    api: PropTypes.object,
  },

  render() {
    return (
      <div>
        <h1>Where</h1>
        <p>If you haven&apos;t already guessed, we will be getting married in Bristol! The ceremony will take place at the Bristol Register Office and the reception will take place at the Mshed. See below for details on both venues. There is approx a 10-15 min walk between the two venues.</p>
        <h3>Bristol Register Office</h3>
        <p>Ceremony @ 2.15pm</p>
        <p>Address: The Old Council House, Corn St, Bristol BS1 1JG</p>
        <h3>MShed</h3>
        <p>From 3pm, evening entertainment @ 7.30pm</p>
        <p>Address: Princes Wharf, Wapping Rd, Bristol BS1 4RN</p>
        <p><a target="_blank" rel="noopener noreferrer" href="https://www.bristolmuseums.org.uk/m-shed/">https://www.bristolmuseums.org.uk/m-shed/</a></p>
        <GoogleMap
          api={this.props.api}
          zoom={15}
          lat={51.4509504}
          lng={-2.5958109}
          markers={[{label: "MShed", lat: 51.4474901, lng: -2.5981828}, {label: "Bristol Register Office", lat: 51.4548455, lng: -2.5933012}]}
        />
      </div>
    )
  },
})

module.exports = Where
