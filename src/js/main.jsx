const React = require("react")
const createReactClass = require("create-react-class")

const GoogleMap = require("./map")

require("../app.css")

const Main = createReactClass({
  displayName: "Main",

  getInitialState() {
    return {
      googleApi: undefined,
    }
  },

  componentDidMount() {
    window.initApi = this.initApi
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyB7jv8r02kCAeO-3w8IprfdfvVbYO4G_6w&callback=initApi")
  },

  initApi() {
    this.setState({googleApi: window.google})
  },

  render() {
    return (
      <div>
        <div className="hero">
          <div>
            <h1>Aaron &amp; Laylah&apos;s Wedding</h1>
            <h2>Saturday 23rd March 2019</h2>
          </div>
        </div>
        <div className="body">
          <p>Welcome to our little space on the internet where you can find out all about our special day. We aim to keep this page as up to date as we can, so do keep checking back!</p>
          <h1>Where</h1>
          <p>If you haven&apos;t already guessed, we will be getting married in Bristol! The ceremony will take place at the Bristol Register Office and the reception will take place at the Mshed. See below for details on both venues.</p>
          <h3>Bristol Register Office</h3>
          <p>Address: The Old Council House, Corn St, Bristol BS1 1JG</p>
          <h3>MShed</h3>
          <p>Address: Princes Wharf, Wapping Rd, Bristol BS1 4RN</p>
          <p><a target="_blank" rel="noopener noreferrer" href="https://www.bristolmuseums.org.uk/m-shed/">https://www.bristolmuseums.org.uk/m-shed/</a></p>
          <GoogleMap
            api={this.state.googleApi}
            zoom={15}
            lat={51.4509504}
            lng={-2.5958109}
            markers={[{label: "MShed", lat: 51.4474901, lng: -2.5981828}, {label: "Bristol Register Office", lat: 51.4548455, lng: -2.5933012}]}
          />
          <p className="contact">contact@aaronandlaylah.co.uk</p>
        </div>
      </div>
    )
  },
})

function loadJS(src) {
  const script = window.document.createElement("script")
  script.src = src
  script.async = true
  document.body.appendChild(script)
}

module.exports = Main
