import React, { Component } from "react";

import ProfileContainer from "../layouts/admin/ProfileContainer.component";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      created_on: ""
    };

    this.componentDidMount.bind(this);
    this.getUserInfo.bind(this);
  }

  async getUserInfo() {
    console.log("props:", this.props);
    const { name, email, created_on } = this.props;
    const userInfo = {
      name: name,
      email: email,
      created_on: created_on
    };
    console.log("userInfo:", userInfo);

    let response = await fetch("http://localhost:5001/users/user", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    });
    let data = await response.json();
    return data;
  }

  componentDidMount() {
    this.getUserInfo()
      .then(res => {
        console.log("RESPONSE DIDMOUNT:", res);
        this.setState({
          name: res.name,
          email: res.email,
          created_on: res.created_on
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container-fluid m-2">
        <div className="row">
          <div className="col-2">
            <ProfileContainer
              name={this.state.name}
              email={this.state.email}
              created_on={this.state.created_on}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
