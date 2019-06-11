import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg:
        "https://images-na.ssl-images-amazon.com/images/I/51CqRMpERqL._SX425_.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(resp => {
        const { memes } = resp.data;
        this.setState({ allMemeImgs: memes });
      });
  }
  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit(event){
    event.preventDefault()
    //get a random meme from the array of meme objects
    const randomIndex=Math.floor(Math.random()*this.state.allMemeImgs.length);
    const randomMeme= this.state.allMemeImgs[randomIndex].url;
    this.setState({randomImg:randomMeme})
  }
  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            name="topText"
            value={this.state.topText}
            placeholder="top text"
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            value={this.state.bottomText}
            placeholder="bottom text"
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img className="randomMeme" src={this.state.randomImg} alt=""/>
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
