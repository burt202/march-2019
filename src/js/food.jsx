const React = require("react")
const createReactClass = require("create-react-class")

const Food = createReactClass({
  displayName: "Food",

  render: function() {
    return (
      <div>
        <h1>Food</h1>
        <p>There will a set menu for the wedding breakfast but this and the evening buffet are still to be decided. We will update this once things have been confirmed. If you have any dietary requirements be sure to let us know in good time.</p>
      </div>
    )
  },
})

module.exports = Food
