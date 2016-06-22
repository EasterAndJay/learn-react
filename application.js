var options = {
  thumbnailData: [{
    title: "React Badge",
    number: 32,
    imageUrl: "http://red-badger.com/blog/wp-content/uploads/2015/04/react-logo-1000-transparent.png",
    header: "Learn React",
    description: "React is a fantastic new library"
  },{
    title: "Gulp Badge",
    number: 25,
    imageUrl: "https://uk.acquadiparma.com/skin/frontend/adp/default/node_modules/gulp-notify/assets/gulp-error.png",
    header: "Learn Gulp",
    description: "Gulp will speed up your development workflow. Gulp will speed up your development workflow."
  }]
};

// Ask react to render this class

var element = React.createElement(ThumbnailList, options);

// When we ask react to render this class, we will tell it
// where to place the rendered element in the DOM

ReactDOM.render(element, document.querySelector(".target"));
var Badge = React.createClass({displayName: "Badge",
  render: function() {
    return React.createElement("button", {className: "btn btn-primary", type: "button"}, 
      this.props.title, " ", React.createElement("span", {className: "badge"}, this.props.number)
    )
  }
});
var ThumbnailList = React.createClass({displayName: "ThumbnailList",
  render: function() {
    var list = this.props.thumbnailData.map(function(thumbnailProps){
      return React.createElement(Thumbnail, React.__spread({},  thumbnailProps))
    })

    return React.createElement("div", null, 
      list
    )
  }
});
var Thumbnail = React.createClass({displayName: "Thumbnail",
  render: function() {
    return React.createElement("div", {className: "thumbnail"}, 
      React.createElement("img", {src: this.props.imageUrl}), 
      React.createElement("div", {className: "caption"}, 
        React.createElement("h3", null, this.props.header), 
        React.createElement("p", null, this.props.description), 
        React.createElement("p", null, 
          React.createElement(Badge, {title: this.props.title, number: this.props.number})
        )
      )
    )
  }
});