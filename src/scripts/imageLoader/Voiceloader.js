import React, { Component } from "react";

class VoiceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      lang: props.language || "en-US",
      text:props.text ,
      autoPlay: false,
      isSpeeking: false
    };
  }
  componentWillMount() {
    if ("speechSynthesis" in window) {
      this._speech = new SpeechSynthesisUtterance();
      this._speech.onend = () => this.setState({ isSpeeking: false });
    } else {
      this.setState({ supported: false });
    }
  }

  componentDidMount() {
    if (this.state.supported && this.state.autoPlay) {
      this.speak();
    }
  }

  speak = () => {
    this._speech.text = this.state.text;
    this._speech.lang = this.state.lang;
    this.setState({ isSpeeking: true });
    window.speechSynthesis.speak(this._speech);
  };

  stop = () => {
    window.speechSynthesis.cancel();
  };

//   handleTextChange = e => {
//     this.setState({ text: e.target.value });
//   };

  render() {
    const { text, isSpeeking } = this.state;
    return (
      <div>
        <textarea
          defaultValue={text}
        //   onChange={this.handleTextChange}
          cols="40"
          rows="8"
        />
        <br />
        <button style={{padding:"1%"}} disabled={isSpeeking} onClick={this.speak}>
          Speak
        </button>
        <button style={{padding:"1%"}} disabled={!isSpeeking} onClick={this.stop}>
          Stop
        </button>
      </div>
    );
  }
}

export default VoiceComponent;
