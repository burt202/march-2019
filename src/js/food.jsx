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
        <ul>
          <li>A selection of Chefs meat and vegetarian wraps</li>
          <li>Garlic & sage chicken skewers (GF)</li>
          <li>Soy and honey glazed sausages</li>
          <li>Lamb, red onion and coriander kofta, mango chutney</li>
          <li>Bruschetta with hummus and roasted vegetables (V)</li>
          <li>Dark chocolate and orange mousse</li>
        </ul>
      </div>
    )
  },
})

module.exports = Food
