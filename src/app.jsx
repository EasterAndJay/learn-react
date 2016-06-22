var React = require('react');
var Dropdown = require('./dropdown');

var options = {
  title: 'Choose a dessert',
  items: [
    'Apple Pie',
    'Ice Cream Cake',
    'Coconut Cream Pie'
  ]
};

// Ask react to render this class

var element = React.createElement(Dropdown, options);

// When we ask react to render this class, we will tell it
// where to place the rendered element in the DOM

ReactDOM.render(element, document.querySelector(".target"));