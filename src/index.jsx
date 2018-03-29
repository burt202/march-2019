const React = require("react")
const ReactDOM = require("react-dom")
const Main = require("./main")

ReactDOM.render(
  <Main />,
  document.body.querySelector(".container")
)

if (module.hot) {
  module.hot.accept("./main", function() {
    const AppContainer = require("react-hot-loader").AppContainer
    const Main = require("./main")

    ReactDOM.render(
      <AppContainer>
        <Main />
      </AppContainer>,
      document.body.querySelector(".container")
    )
  })
}
