import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base'

const sensor_pb = require('./src/util/sensor_pb.js');
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      sensor: new sensor_pb.Sensor()
     };
  };

  _setState = (num) => {
    this.state.sensor.setState(num);
    let sensor = this.state.sensor;
    this.setState({sensor})
  }

  _resetState = () => {
    this.state.sensor.setState(0);
    let sensor = this.state.sensor;
    this.setState({sensor})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Teste do objeto</Text>
        <Button 
          style = {styles.button}
          onPress = { () => { this._setState(10) }}>
          <Text style = {styles.buttonText}>Clicar</Text>
        </Button>
        <Text style={styles.instructions}>Medição do sensor</Text>
        <Text>{ this.state.sensor.getState() }</Text>
        <Button 
          style = {styles.buttonReset}
          onPress = { () => { this._resetState() }}>
          <Text style = {styles.buttonText}>Reset</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    fontWeight:'bold',
    fontFamily:'lato',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    width:"90%",
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonReset: {
    width:"30%",
    height:40,
    alignSelf:'flex-end',
    justifyContent:'center',
    marginRight:10,
    marginTop:200
  },
  buttonText:{
    fontSize:20,
    color:'#fff',
    fontFamily:'lato',
    fontWeight:'bold'
  }
});
