import React from 'react';


class Gorilla extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var styles = {
      padding: 10,
      backgroundColor: (this.props.highlighted ? 'aqua' : 'transparent'),
      position: 'absolute',
      left: 650,
      top: 150
    };
    return (
      <div style={styles} ref="test_target">
        <img src="https://s28.postimg.org/5c28kbqex/gorilla.png" width="100"/>
      </div>
    );
  }
}

Gorilla.propTypes = {
  highlighted: React.PropTypes.bool
};

class Puppy extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var styles = {
      padding: 10,
      backgroundColor: (this.props.highlighted ? 'aqua' : 'transparent'),
      position: 'absolute',
      left: 650,
      top: 0
    };
    return (
      <div style={styles} ref="test_target">
        <img src="http://icons.iconarchive.com/icons/fixicon/farm/256/dog-icon.png" width="100"/>
      </div>
    );
  }
}

Puppy.propTypes = {
  highlighted: React.PropTypes.bool
};

export  {Gorilla, Puppy};
