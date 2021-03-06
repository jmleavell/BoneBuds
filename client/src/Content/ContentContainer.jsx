import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MapContainer from "./Routes/MapContainer";
import UserProfile from "./Routes/UserProfile";
import EventProfile from "./Routes/EventProfile";
import CreateEvent from "./Routes/CreateEvent";
import EditEvent from "./Routes/EditEvent";
import UserPage from "./Routes/UserPage";
import UserEvents from "./Routes/UserEvents";
import SearchBar from "./Routes/SearchBar";

class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersEvent: ""
    };
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={() => <MapContainer />} />
          <Route
            path="/userpage"
            render={() => (
              <UserPage
                currentUser={this.props.currentUser}
                username={this.props.username}
                isLoggedIn={this.isLoggedIn}
              />
            )}
          />
          <Route
            path="/userprofile"
            render={() => (
              <UserProfile
                currentUser={this.props.currentUser}
                isLoggedIn={this.isLoggedIn}
              />
            )}
          />
          <Route
            path="/eventprofile"
            render={() => (
              <EventProfile
                username={this.props.username}
                eventID={this.props.eventID}
                event={this.props.event}
                posts={this.props.posts}
                currentUser={this.props.currentUser}
                change={this.props.change}
                submit={this.props.submit}
                socket={this.props.socket}
                userData={this.props.userData}
                owner={this.props.currentEventOwnerInfo}
              />
            )}
          />
          <Route
            path="/editEvent"
            render={() => (
              <EditEvent
                currentEvent={this.props.currentEvent}
                events={this.props.events}
              />
            )}
          />
          <Route
            path="/createEvent"
            render={() => (
              <CreateEvent
                owner={this.props.user}
                username={this.props.username}
                userData={this.props.userData}
              />
            )}
          />

          <Route
            path="/userEvents"
            render={() => (
              <UserEvents
                user={this.props.currentUser}
                username={this.props.username}
                events={this.props.events}
                socket={this.props.socket}
                identifyEvent={this.props.identifyEvent}
              />
            )}
          />

          <Route
            path="/searchBar"
            render={() => <SearchBar click={this.props.click} />}
          />
        </Switch>
      </main>
    );
  }
}

export default ContentContainer;
