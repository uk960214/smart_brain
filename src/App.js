import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App ({
  apiKey: '5462c8c2ace242d68d28f95aa92de699'
});

const particleOptions ={
  polygon: {
    enable: true,
    type: 'inside',
    move: {
        radius: 10
    },
    url: 'path/to/svg.svg'
  }
};

class App extends Component {
  constructor() {
    super();
    this.state ={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false
    }
  }

  calculateFaceLocation = (data) => {
      const faceCoordinates = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: faceCoordinates.left_col * width,
        topRow: faceCoordinates.top_row * height,
        rightCol: width - (faceCoordinates.right_col * width),
        bottomRow: height - (faceCoordinates.bottom_row * height)
      }
  }

  drawDetectBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      {name: 'face'}, 
      this.state.input
    )
    .then(response => this.drawDetectBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home')
      this.setState({isSignedIn: true})
      this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return(
      <div className="App">
        <Particles 
          className='particles'
          params={{particleOptions}} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onImageSubmit={this.onImageSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div> 
        : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }  
}

export default App;
