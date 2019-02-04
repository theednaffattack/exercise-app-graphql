import React from "react";
import queryString from "query-string";
import AddUserForm from "./AddUserForm";
import postData from "../dangerousPost";

class UserFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      message: { text: "Sample message" },
      errors: this.props.errors,
      hash: this.props.hash
    };
  }
  handleClick(e) {
    e.preventDefault();
    postData("/api/exercises/add", {
      hash: e.target.value
    })
      .then(data =>
        this.setState({
          hash: data.hash
        })
      )
      .catch(err =>
        this.setState({
          errors: { code: 'Exercise "add" error', msg: err.message }
        })
      );
  }
  render() {
    const { hash } = this.state;
    return (
      <div>
        <div className="content">
          <div className="coroner-message">
            {this.state.hash ? this.state.hash : ""}
          </div>
          <AddUserForm hash={hash} postHash={postData} />
        </div>
      </div>
    );
  }
}

export default UserFormContainer;
