import React, { Component } from "react";
import qString from "query-string";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const REDIRECT_URI = `http://localhost:${
  process.env.GITHUB_CALLBACK_PORT
}/dashboard`;

let STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading"
};

class SignIn extends Component {
  state = {
    status: STATUS.INITIAL,
    token: null
  };

  componentDidMount() {
    const code = window.location.search
      ? qString.parse(window.location.search)
      : {};

    // if (code) {
    //   this.setState({ status: STATUS.LOADING });
    //   fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
    //     .then(response => response.json())
    //     .then(({ token }) => {
    //       this.setState({
    //         token,
    //         status: STATUS.FINISHED_LOADING
    //       });
    //     });
    // }
  }
  render() {
    return (
      <div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          Login
        </a>
      </div>
    );
  }
}

export default SignIn;
