const React = require("react")
const createReactClass = require("create-react-class")

const Where = require("./where")
const MakingWeekend = require("./making-weekend")

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
          <Where api={this.state.googleApi} />
          <MakingWeekend api={this.state.googleApi} />
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
