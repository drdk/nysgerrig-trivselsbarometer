import React, { Component } from 'react';

var idSeed = 1;

class Emoji extends Component {
  constructor() {
    super();
    this.id = "emoji" + idSeed++;

    this.clickHandler = this.onClick.bind(this);
  }

  generateSource() {
    return "https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/" + this.props.data.file;
  }

  onClick() {
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.data);
    }
  }

  componentWillMount() {
    this.background = {
      backgroundImage: "url('https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/" + this.props.data.file + "')"
    };
  }

  render() {
    return (
        <img id={this.id} alt={this.props.data.name} className={this.props.className} src={this.generateSource()} onClick={this.onClick.bind(this)} />
    );
  }
}

export default Emoji;
