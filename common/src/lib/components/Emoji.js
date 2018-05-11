import React, { Component } from 'react';

var idSeed = 1;

class Emoji extends Component {
  constructor() {
    super();
    this.id = "emoji" + idSeed++;

    this.clickHandler = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.data);
    }
  }

  componentWillMount() {
    this.background = {
      backgroundImage: "url('" + this.props.data.file + "')"
    };
  }

  createEmoji() {    
    if (this.props.renderName) {
      return (
        <div onClick={this.onClick.bind(this)}>
          <img id={this.id} alt={this.props.data.name} className={this.props.className} src={this.props.data.file} />
          <br />
          <label>{this.props.data.name}</label>
        </div>
      );
    }
    else {
      return <img id={this.id} alt={this.props.data.name} className={this.props.className} src={this.props.data.file} onClick={this.onClick.bind(this)} />
    }
    
  }

  render() {    
    return this.createEmoji();
  }
}

export default Emoji;
