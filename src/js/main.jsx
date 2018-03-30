const React = require("react")
const createReactClass = require("create-react-class")

require("../app.css")

const Main = createReactClass({
  displayName: "Main",

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
          <p>If you haven&apos;t already guessed, we will be getting married in Bristol! We&apos;re still finalising some of the finer details for the day, but we&apos;ll be able to share this with you soon.</p>
          <p className="contact">contact@aaronandlaylah.co.uk</p>
        </div>
      </div>
    )
  },
})

module.exports = Main
