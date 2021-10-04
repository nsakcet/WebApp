import React from "react";
import Routes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Landing } from "./components/Common/Landing";
import { Footer } from "./components/Common/Footer";
import configureStore from "./state/store/configureStore";
import "./App.scss";

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
const store = configureStore();

function App() {
  return (
    <div style={{ zoom: "85%" }}>
      <Provider store={store}>
        <Router>
          <Landing />
          <Routes />
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}
export default App;
