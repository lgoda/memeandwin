import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CanvasComponent extends Component {

  constructor(props){
    super(props);
    this.state={
        topText: '',
        lowText: ''
    };
    this._handleLowInputChange = this._handleLowInputChange.bind(this);
    this._handleTopInputChange = this._handleTopInputChange.bind(this);
  }


 componentDidMount() {
   this.canvas = document.getElementById('canvas');
   this.ctx = this.canvas.getContext('2d');
   var deviceWidth = window.innerWidth;
   var canvasWidth = Math.min(600, deviceWidth-20);
   var canvasHeight = Math.min(480, deviceWidth-20);
   this.canvas.width = canvasWidth;
   this.canvas.height = canvasHeight;
   if (this.props.memeImage != null ) {
     this.ctxImage = this.props.memeImage;
     console.log('i mounted with image ' + this.ctxImage.src);
     this._redrawCanvas();
   }
 }
 componentDidUpdate(){
   this.canvas = document.getElementById('canvas');
   this.ctx = this.canvas.getContext('2d');
   var deviceWidth = window.innerWidth;
   var canvasWidth = Math.min(600, deviceWidth-20);
   var canvasHeight = Math.min(480, deviceWidth-20);
   this.canvas.width = canvasWidth;
   this.canvas.height = canvasHeight;

   if (this.props.memeImage != null ) {
     this.ctxImage = this.props.memeImage;
     console.log('i mounted with image ' + this.ctxImage.src);
     this._redrawCanvas();
   }
  }

 _redrawCanvas(){
    console.log('redraw: i am redrawing '+this.ctxImage.src);
    console.log(this.ctxImage);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var x = this.canvas.width/2 - this.ctxImage.width/2;
    var y = this.canvas.height/2 - this.ctxImage.height/2;
    //this.ctx.drawImage(this.ctxImage,0,0,this.canvas.width,this.canvas.height);
    this.ctx.drawImage(this.ctxImage, x, y);
    /*this.ctx.drawImage(this.ctxImage,
                   0, 0, this.ctxImage.width,    this.ctxImage.height ,
                   0, 0, this.canvas.width, this.canvas.height);*/
                   this.ctx.font = '40px Verdana';
                   this.ctx.fillStyle = 'white';
    this._drawText(this.state.topText,20,20);
    this._drawText(this.state.lowText,20,this.canvas.height-20);
  }

  _drawText(text,x,y){
    this.ctx.fillText(text,x,y);
    this.ctx.strokeText(text,x,y);
  }

  _handleTopInputChange(event) {
    this.setState({
      topText:  event.target.value
    });
  }

  _handleLowInputChange(event) {
    this.setState({
      lowText:  event.target.value
    })
  }

  render() {
    return (
      <div>
        <canvas id="canvas">
          Canvas requires a browser that supports HTML5.
        </canvas>
        <input maxLength='30' value ={this.state.topText} onChange={this._handleTopInputChange} placeholder='top text' type='text'/>
        <input maxLength='30' value ={this.state.lowText} onChange={this._handleLowInputChange} placeholder='top text' type='text'/>
        <input id="fileInput" type="file" onChange={this.props.uploadFile} />
      </div>
    );
  }
}

function mapStateToProps({ memeImage }) {
  return {
    memeImage
  };
};

export default connect(mapStateToProps, actions)(CanvasComponent);
