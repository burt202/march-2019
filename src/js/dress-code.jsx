const React = require("react")
const createReactClass = require("create-react-class")

const DressCode = createReactClass({
  displayName: "DressCode",

  render() {
    return (
      <div>
        <h1>Dress Code</h1>
        <p>The event is semi-formal, but we&apos;re pretty laid back. Hats, ties etc are not essential but if it is your preference, feel free :) We just want everyone to be comfortable!</p>
      </div>
    )
  },
})

module.exports = DressCode
