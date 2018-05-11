import React, { Component } from 'react';
import CommonData  from './CommonData';
import Emoji from './Emoji';

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
    #{id} { display: inline-block; width: 112px; height: 112px; margin: 3px; background-color: #fff; vertical-align: top; } \
    #{id} img { width: 96px; height: 96px; margin: 8px; } \
    #{id}.clickAble { position: relative; background-color: #608094; box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12); border-radius: 2px; transition: background-color 250ms; cursor: pointer; } \
    #{id}.clickAble:hover { background-color: #335466; } \
    #{id}.clickAble:hover:active { background-color: #708794; } \
    #{id}.clickAble > img { position: absolute; top: 4px; left: 8px; margin: 0; padding: 0; } \
    #{id}.renderName { height: 142px; } \
    #{id}.renderName > div > img { position: absolute; top: 4px; left: 8px; margin: 0; padding: 0; } \
    #{id}.renderName > div > label { position: absolute; bottom: 20px; left: 0px; width: 112px; text-align: center; color: #fff; cursor: pointer; } \
    #{id}.clickAble .arrow { position: absolute; bottom: 0px; } \
    #{id}.clickAble .arrow > div { width: 1px; height: 4px; margin-left: 46px; margin-right: 46px; border-top: 10px solid #fff; border-right: 10px solid transparent; border-left: 10px solid transparent; } \
    #{id}.clickAble div.notSelected { width: 112px; height: 112px; position: absolute; top: 0; left: 0; line-height: 112px; font-family: 'gibson', sans-serif; font-size: 0.9375rem; color: white; text-transform: uppercase; text-align: center; } \
    #{id} .preload { position: fixed; z-index: 0; top: -1px; right: -1px; width: 1px; height: 1px; overflow: hidden; } \
    #{id} .overlay { position: fixed; z-index: 1; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, .8); } \
    #{id} .childContainer { display: inline-block; position: fixed; z-index: 2; width:360px; max-height: 90vh; top: 50%; left: 50%; transform: translate(-50%, -50%); overflow-y: scroll; -webkit-overflow-scrolling: touch; background-color: #fff; border: 1px solid silver; display: flex; justify-content: space-evenly; flex-wrap: wrap; } \
    #{id} .childContainer div { display: inline-block; width: 128px; height: 128px; margin: 5px; } \
    #{id} .childContainer img { padding: 0px; margin-bottom: 0px; } \
    @media screen and (max-width: 450px) { #{id} .childContainer { width:222px; } #{id} .childContainer div { display: inline-block; width: 64px; height: 64px; margin: 5px; } #{id} img { width: 64px; height: 64px; } #{id}.clickAble::after { border-right: solid 37px transparent; border-left: solid 37px transparent; } }\
    ".replace(/{id}/mg, this.id)));
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
        index = Math.floor(Math.random() *  this.props.emojis.length);
      }
    }

    this.childSelected(this.props.emojis[index]);
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
    children = this.props.emojis.map((emoji) => {
      return <Emoji key={emoji.name} selected={this.state.selected === emoji} data={emoji} clickHandler={this.childSelectedHandler} renderName={this.props.renderName} />
    });

    if (this.state.open) {
      childContainer = <div className="overlay" onClick={this.close.bind(this)}><div className="childContainer">{children}</div></div>;
    }

    if (this.props.preload) {
      preLoader = <div className="preload">{children}</div>;
    }

    var control;

    if (this.state.selected) {
      control = <Emoji data={this.state.selected} clickHandler={this.open.bind(this)} renderName={this.props.renderName} />;
    }
    else {
      control = <div className="notSelected" onClick={this.open.bind(this)}>{CommonData.getLocalized('choose')}</div>;
    }

    var arrow = (this.props.clickDisabled !== true) ? (<div className="arrow" onClick={this.open.bind(this)}><div></div></div>) : null;
    
    return (
      <div id={this.id} className={(this.props.clickDisabled ? "" : "clickAble ") + (this.props.renderName ? "renderName " : "") + (this.props.hasOwnProperty("className") ? this.props.className : "")}>
        {control}
        {arrow}
        {childContainer}
        {preLoader}
      </div>
    );
  }
}

export default EmojiSelector;
