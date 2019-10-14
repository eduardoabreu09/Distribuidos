import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch } from 'react-native';
import { Container, Header, Title, Body, Left, Content} from 'native-base'
import { Icon, Button } from 'react-native-elements';
import {NativeModules} from 'react-native';
var tcpClient = NativeModules.TCPClient;

const sensor_pb = require('./src/util/sensor_pb.js');
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      sensor: new sensor_pb.Sensor(),
      disabled: false,
      isConnected:false,
      lightIsOn:false
     };
  };

  _connectToGateway = () => {
    this.setState({disabled:true},() =>{
      if(this.state.isConnected)
      {
        this.setState({
          disabled:false,
          isConnected:false,
          lightIsOn:false
        })
      }
      else
      {
        this.setState({
          disabled:false,
          isConnected:true
        });
      }
    });
  }

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
    this.setState({sensor, disabled:false, isConnected:false, lightIsOn:false})
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity
            disabled = {this.state.disabled} 
            style ={styles.iconTouch}
            onPress= { () => {this._connectToGateway()} }>
              { this.state.isConnected ?
              <Icon name="wifi"
              color = "#00ff62"/>
              :
              <Icon name="signal-wifi-off"
              color = "#ff002b"/>
              } 
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
            title = "Clicar"
            titleStyle ={styles.buttonText}   
            disabled = {this.state.disabled}
            buttonStyle = {styles.button}
            onPress = { () => { this._setState(10) }}>
          </Button>
          <Text style={styles.instructions}>Medição do sensor</Text>
          <Text style ={styles.medText}>{ this.state.sensor.getState() }</Text>
          <View style = {styles.imageView}>
            {
              this.state.lightIsOn ?
              <Image source = {require('./src/images/lightbulb_yellow.png') }/>
              :
              <Image source = {require('./src/images/lightbulb_outline.png') }/>
            }
          <Switch
            onValueChange = {() => {this.setState({lightIsOn:!this.state.lightIsOn})}}
            value = {this.state.lightIsOn}
            disabled = {!this.state.isConnected}/>
          </View>
          <Button
            title = "Reset"
            titleStyle ={styles.buttonText} 
            buttonStyle ={styles.buttonReset} 
            onPress = { () => { this._resetState() }}>
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
  imageView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10
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
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonReset: {
    width:"30%",
    height:40,
    alignSelf:'flex-end',
    justifyContent:'center',
    marginRight:10,
  },
  buttonText:{
    fontSize:20,
    color:'#fff',
    fontFamily:'lato',
    fontWeight:'bold'
  },
  medText: {
    fontSize:50,
    color:'black',
    fontFamily:'lato',
    fontWeight:'bold',
    textAlign:'center'
  }
});
