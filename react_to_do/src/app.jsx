var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');

var config = {
    apiKey: "AIzaSyDFMe89BPA-fECbjkP1W2D5JqoeOb4bbMk",
    authDomain: "react-todo-feda5.firebaseapp.com",
    databaseURL: "https://react-todo-feda5.firebaseio.com",
    storageBucket: "react-todo-feda5.appspot.com"
};

Firebase.initializeApp(config);

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fb = Firebase.database().ref("items");
    this.bindAsObject(this.fb, "items");
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? "loaded" : "")}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
          Clear Complete
        </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items) {
      if (this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});


var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
