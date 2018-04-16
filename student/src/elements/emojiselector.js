import React, { Component } from 'react';

var idSeed = 1;

class EmojiSelector extends Component {

  constructor() {
    super();
    this.id = "emojiselector" + idSeed++;

    this.childSelectedHandler = this.childSelected.bind(this);
  }

  injectCSS() {
    var head = document.querySelector("head");

    this.css = head.appendChild(document.createElement("style"));
    this.css.setAttribute("type", "text/css");

    this.css.appendChild(document.createTextNode(" \
    #{id} { display: inline-block; margin: 5px; padding: 5px; background-color: #fff; } \
    #{id} .preload { position: fixed; z-index: 0; top: -1px; right: -1px; width: 1px; height: 1px; overflow: hidden; } \
    #{id} .overlay { position: fixed; z-index: 1; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, .8); } \
    #{id} .childContainer { display: inline-block; position: fixed; z-index: 2; max-width: 90vw; max-height: 90vh; top: 50%; left: 50%; transform: translate(-50%, -50%); overflow: auto; background-color: #fff; border: 1px solid silver; display: flex; justify-content: space-evenly; flex-wrap: wrap; } \
    #{id} .childContainer div { display: inline-block; width: 128px; height: 128px; margin: 5px; } \
    ".replace("{id}", this.id)));
  }

  childSelected(data) {    
    this.setState({
      open: false,
      selected: data
    });

    if (this.props.onChange) {
      this.props.onChange(data);
    }
  }

  cleanupCSS(){
    this.css.parentNode.removeChild(this.css);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.timestamp && this.props.timestamp !== nextProps.timestamp) {
      this.select();
    }
  }

  componentWillMount() {
    this.injectCSS();
    this.select();
  }

  select(index) {
    if (typeof(index) !== "number") {
      if (this.props.random) {
        index = Math.floor(Math.random() *  this.props.emojis.collection.length);
      }
      else {
        index = 0;
      }
    }

    this.childSelected(this.props.emojis.collection[index]);
  }

  componentWillUnmount() {
    this.cleanupCSS();
  }

  open() {
    if (this.props.clickDisabled) {
      return;
    }
    
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  render() {
    let childContainer = null,
    preLoader = null,
    children = this.props.emojis.collection.map((emoji) => {
      return <Emoji key={emoji.name} selected={this.state.selected === emoji} data={emoji} clickHandler={this.childSelectedHandler} />
    });

    if (this.state.open) {
      childContainer = <div className="overlay" onClick={this.close.bind(this)}><div className="childContainer">{children}</div></div>;
    }

    if (this.props.preload) {
      preLoader = <div className="preload">{children}</div>;
    }
    
    return (
      <div id={this.id}>
      <Emoji data={this.state.selected} clickHandler={this.open.bind(this)} />
        {childContainer}
        {preLoader}
      </div>
    );
  }
}

class Emoji extends Component {
  constructor() {
    super();

    this.clickHandler = this.onClick.bind(this);
  }

  generateSource() {
    return "https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/" + this.props.data.file;
  }

  onClick() {
    this.props.clickHandler(this.props.data);
  }

  componentWillMount() {
    this.background = {
      backgroundImage: "url('https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/" + this.props.data.file + "')"
    };
  }

  render() {
    return (
      <div onClick={this.onClick.bind(this)}>
        <img alt={this.props.data.name} src={this.generateSource()} />
      </div>
    );
  }
}

export default EmojiSelector;
