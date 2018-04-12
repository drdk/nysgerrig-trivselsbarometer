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
    #{id} { border: solid 1px silver; display: inline-block; margin: 5px; padding: 5px; background-color: #fff; } \
    #{id} .overlay { position: fixed; z-index: 1; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, .8); } \
    #{id} .childContainer { position: fixed; z-index: 2; top: 10%; right: 10%; bottom: 10%; left: 10%; overflow: auto; background-color: #fff; border: 1px solid silver; } \
    #{id} .childContainer div { display: inline-block; width: 128px; height: 128px; } \
    ".replace("{id}", this.id)));
  }

  childSelected(data) {
    this.setState({
      open: false,
      selected: data
    });    
  }

  cleanupCSS(){
    this.css.parentNode.removeChild(this.css);
  }

  componentWillMount() {
    this.injectCSS();
    this.setState({
      open: false,
      selected: this.props.selected || this.props.emojis.collection[0]
    });
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.cleanupCSS();
  }

  componentWillReceiveProps() {
    this.setStateFromProps();
  }

  open() {
    this.setState({
      open: true
    })
  }

  render() {
    let childContainer = null,
    children = null;
    if (this.state.open) {
      children = this.props.emojis.collection.map((emoji) => {
        return <Emoji key={emoji.name} selected={this.state.selected === emoji} data={emoji} clickHandler={this.childSelectedHandler} />
      });
      childContainer = <div class="overlay"><div class="childContainer">{children}</div></div>;
    }
    
    return (
      <div id={this.id}>
      <Emoji data={this.state.selected} clickHandler={this.open.bind(this)} />
        {childContainer}
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
