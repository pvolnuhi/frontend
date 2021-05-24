

import React, { Component } from "react";
import Card from "./Card";
import profiles from "./profiles";
import axios from "axios";

export default class MatchesPage extends Component {
  state = {
    profiles: [],
    response: false
  };

  componentDidMount() {
    const id = localStorage.getItem("id");
    const jsonId = {"id": id};
    axios
      .post("http://localhost:5000/matches", jsonId)
      .then((res) => {
        const profileList = res.data;
        this.setState({ profiles: profileList, response: true });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h1 className="heading"
        style={{ 
          "font-family": "Copperplate"}}>My Matches</h1>
        <dl className="dictionary">
          {this.state.profiles.map(this.createCard)}{" "}
        </dl>
      </div>
    );
  }

  removeCard = (id) => {
    console.log(this.state.profiles);
    this.setState({
      profiles: this.state.profiles.filter(function (p) {
        return p._id !== id;
      })
    });
  };

  createCard = (profile) => {
    return (
      <div key={profile._id}>
        <Card
          //this key must be written like that!
          // it can be  string, number, but it must be unique across
          // all of the repeated components
          key={profile._id}
          //has to be the name inside the contact (contact.NAMEINCONTACT)
          id={profile._id}
          first={profile.first}
          last={profile.last}
          gender={profile.gender}
          major={profile.major}
          personality={profile.personality}
          romance={profile.romance}
          friendship={profile.friendship}
          hobbies={profile.hobbies}
          spirituality={profile.spirituality}
          partying={profile.partying}
          score={profile.score}
        />
        <button>Accept</button>
        <button 
        onClick={() => this.removeCard(profile._id)}>Reject</button>
      </div>
    );
  };
}
