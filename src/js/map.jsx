const React = require("react")
const createReactClass = require("create-react-class")
const PropTypes = require("prop-types")

const markerMap = {
  red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  green: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  blue: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
}

const GoogleMap = createReactClass({
  displayName: "GoogleMap",

  propTypes: {
    api: PropTypes.object,
    zoom: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    markers: PropTypes.array,
  },

  componentDidUpdate: function() {
    if (this.props.api) this.loadMap()
  },

  loadMap: function() {
    const api = this.props.api

    const center = new api.maps.LatLng(this.props.lat, this.props.lng)
    this.map = new api.maps.Map(this.map, {center, zoom: this.props.zoom})

    const markers = this.props.markers || []

    markers.forEach(function(m) {
      const marker = new api.maps.Marker({
        position: new api.maps.LatLng(m.lat, m.lng),
        map: this.map,
        icon: m.icon || (markerMap[m.colour] || markerMap.red),
      })

      if (m.label) {
        const infowindow = new api.maps.InfoWindow({
          content: m.label,
        })

        api.maps.event.addListener(marker, "click", function() {
          infowindow.open(this.map, marker)
        })
      }
    }.bind(this))
  },

  setRef: function(el) {
    this.map = el
  },

  render: function() {
    return (
      <div style={{height: "400px"}} ref={this.setRef}>Loading</div>
    )
  },
})

module.exports = GoogleMap
