import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Container, Header, Title, Body, Left, Content} from 'native-base'
import { Icon } from 'react-native-elements';

const sensor_pb = require('./src/util/sensor_pb.js');
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      sensor: new sensor_pb.Sensor(),
      disabled: false
     };
  };

  _setState = (num) => {
    this.state.sensor.setState(num);
    let sensor = this.state.sensor;
    console.log(sensor.serializeBinary())
    this.setState({sensor})
  }

  _resetState = () => {
    this.state.sensor.setState(0);
    let sensor = this.state.sensor;
    console.log(sensor.serializeBinary())
    this.setState({sensor})
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity 
            style ={styles.iconTouch}
            onPress= { () => alert("Conectar") }>
              <Icon name="device-hub"
              color = "#fff"/>
            </TouchableOpacity>
          </Left>
          <Body style={styles.body} >
            <Title>
              Sensores.io
            </Title>
          </Body>
        </Header>
        <Content style ={styles.content}>
          <Button 
            style = {styles.button}
            disabled = {this.state.disabled}
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
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems:'center'
  },
  body:{
    marginLeft:35
  },
  content:{
    marginTop:10
  },
  iconTouch:{
    padding:20
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
