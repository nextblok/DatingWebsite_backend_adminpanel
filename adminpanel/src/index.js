import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import storePersist from "store/store";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ApiCall from "./shared/globalApiService";
import Actions from "./store/actions/index";
import apiConfig from "./shared/apiConfig";
import shortenWallet from "./shared/utils.js";
import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/css/black-dashboard-pro-react.css";
import "assets/demo/demo.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "./assets/css/custom.css";

const mapStateToProps = (state) => ({
  credential: state.LoginReducer,
});

const PrivateRoute = withRouter(
  connect(mapStateToProps)((props) => {
    if (props.credential.loginToken)
      return (
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      );
    else return <Redirect to="/auth/login" />;
  })
);
global.ApiCall = ApiCall;
global.shortenWallet = shortenWallet;
global.Actions = Actions;
global.apiConfig = apiConfig;
TimeAgo.addDefaultLocale(en);
ReactDOM.render(
  <Provider store={storePersist.store}>
    <PersistGate persistor={storePersist.persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <PrivateRoute path="/admin" />
          <Redirect from="/" to="/admin/appusers" />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
