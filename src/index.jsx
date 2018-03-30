const React = require("react")
const ReactDOM = require("react-dom")
const Main = require("./js/main")

ReactDOM.render(
  <Main />,
  document.body.querySelector(".container")
)

if (module.hot) {
  module.hot.accept("./js/main", function() {
    const AppContainer = require("react-hot-loader").AppContainer
    const Main = require("./js/main")

    ReactDOM.render(
      <AppContainer>
        <Main />
      </AppContainer>,
      document.body.querySelector(".container")
    )
  })
}
