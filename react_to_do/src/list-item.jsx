var React = require('react');
var Firebase = require('firebase');
var ReactFire = require('reactfire');

module.exports = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMoint: function() {
  
  },
  render: function() {
    this.fb = Firebase.database().ref("/items/" + this.props.item.key);
    return <div className="input-group">
      <span className="input-group-addon">
        <input 
          type="checkbox"
          onChange={this.handleDoneChange}
          checked={this.state.done}
          />
      </span>
      <input type="text"
        className="form-control"
        disabled={this.state.done}
        value={this.state.text}
        onChange={this.handleTextChange}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDeleteClick}>
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null
    } else {
      return [
        <button
          onClick={this.handleSaveClick}
          className="btn btn-default">
          Save
        </button>,
        <button 
          onClick={this.handleUndoClick}
          className="btn btn-default">
          Undo
        </button>
      ]
    }
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function(event) {
    this.fb.remove();
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleUndoClick: function(event) {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleSaveClick: function(event) {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  }
});