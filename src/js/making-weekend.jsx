const React = require("react")
const createReactClass = require("create-react-class")
const PropTypes = require("prop-types")

const GoogleMap = require("./map")

const markers = [
  {label: "MShed", lat: 51.4474901, lng: -2.5981828},
  {label: "Bristol Register Office", lat: 51.4548455, lng: -2.5933012},
  {lat: 51.450075, lng: -2.601374, icon: "http://aaronandlaylah.co.uk/ibis.png"},
  {lat: 51.450728, lng: -2.603866, icon: "http://aaronandlaylah.co.uk/travelodge.png"},
  {lat: 51.451293, lng: -2.599444, icon: "http://aaronandlaylah.co.uk/marriott.png"},
  {lat: 51.452200, lng: -2.596526, icon: "http://aaronandlaylah.co.uk/radisson.png"},
  {lat: 51.455350, lng: -2.593495, icon: "http://aaronandlaylah.co.uk/mercure.png"},
  {lat: 51.447331, lng: -2.590901, icon: "http://aaronandlaylah.co.uk/mercure.png"},
  {lat: 51.450848, lng: -2.588090, icon: "http://aaronandlaylah.co.uk/travelodge.png"},
  {lat: 51.451722, lng: -2.592956, icon: "http://aaronandlaylah.co.uk/premierinn.png"},
  {lat: 51.448708, lng: -2.587672, icon: "http://aaronandlaylah.co.uk/doubletree.png"},
  {lat: 51.453553, lng: -2.588392, icon: "http://aaronandlaylah.co.uk/premierinn.png"},
]

const MakingWeekend = createReactClass({
  displayName: "MakingWeekend",

  propTypes: {
    api: PropTypes.object,
  },

  render() {
    return (
      <div>
        <h1>Making A Weekend Of It?</h1>
        <h3>Hotels</h3>
        <p>If you plan on making a weekend of it, which we fully recommend, then there is plenty of places to stay nearby.</p>
        <p>We plan to stay at the <a target="_blank" rel="noopener noreferrer" href="https://www.hotelduvin.com/locations/bristol-city-centre/">Hotel du Vin</a> (we will confirm this ASAP), but below are a few other places that would be well located.</p>
        <GoogleMap
          api={this.props.api}
          zoom={15}
          lat={51.4509504}
          lng={-2.5958109}
          markers={markers}
        />
        <h3>Places To Eat</h3>
        <p>If you are looking for places to eat the night before, then below is a list of some tried and tested local restaurants, but of course Bristol offers <a target="_blank" rel="noopener noreferrer" href="https://www.bristol247.com/food-and-drink/restaurants/">many more</a>.</p>
        <p><a target="_blank" rel="noopener noreferrer" href="http://wappingwharf.co.uk/cargo">Cargo @ Whapping Wharf</a></p>
        <p>A village of converted shipping containers, home to lots of independant food outlets from Fish and Chips to fresh Asian dishes, and most things in between</p>
        <p><a target="_blank" rel="noopener noreferrer" href="http://threebrothersburgers.co.uk/">Three Brothers</a></p>
        <p>Quite possibly the best burger in Bristol, great choice of beer too</p>
        <p><a target="_blank" rel="noopener noreferrer" href="http://www.spitfirebarbecue.com/">Spitfire</a></p>
        <p>BBQ Grill right on the harbourside that serves very big portions. Enough said</p>
        <p><a target="_blank" rel="noopener noreferrer" href="http://www.sergios.co.uk/">Sergios</a></p>
        <p>Family run restaurant specialising in authentic Italian cuisine, you will need to book!</p>
      </div>
    )
  },
})

module.exports = MakingWeekend
