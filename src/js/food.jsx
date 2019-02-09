const React = require("react")
const createReactClass = require("create-react-class")

const Food = createReactClass({
  displayName: "Food",

  render: function() {
    return (
      <div>
        <h1>Food</h1>
        <h3>Wedding Breakfast</h3>
        <p>Starter: Pea and mint soup, pea shoots with bacon crisp</p>
        <p>Main: Thyme roasted chicken breast, dauphinoise potatoes, sauté peas and leeks and a rich red wine jus</p>
        <p>Dessert: Cheesecake, macerated strawberries, meringue and honeycomb</p>
        <h3>Evening Buffet</h3>
        <p>Still to be decided. We will update this once things have been confirmed.</p>
      </div>
    )
  },
})

module.exports = Food
