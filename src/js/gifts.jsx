const React = require("react")
const createReactClass = require("create-react-class")

const Gifts = createReactClass({
  displayName: "Gifts",

  render() {
    return (
      <div>
        <h1>Gifts</h1>
        <p>We are lucky enough to have everything we need for this next exciting chapter of our lives! So please, no gifts are necessary - your presence is present enough for us on our special day. However, if you do wish to celebrate with a gift, a contribution to our savings pot would be warmly appreciated :)</p>
      </div>
    )
  },
})

module.exports = Gifts
