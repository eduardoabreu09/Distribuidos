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

  _errorConnect = (err) => {
    this.setState({disabled:false});
    alert(err);
  }

  _successConnect = (suc) => {
    this.setState({isConnected:true})
    console.log('Deu bom')
  }

  _connectToGateway = () => {
    //this.setState({disabled:true});
    if(this.state.isConnected == false)
    {
      var ip = '192.168.56.1';
      tcpClient.connect(ip, this._errorConnect, this._successConnect);
    }
    else
    {
      tcpClient.disconnect((err) => {console.log(err)}, (suc) => {this.setState({isConnected:false})});
    }
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

  _byteToString = (bytes) => {
    var result = ''
    for(var i = 0; i < bytes.length; i++) {
      result += String.fromCharCode(parseInt(bytes[i], 2));
    }
    return result;
  }

  _convertByte = (uint8Array) => {
    var array = [];

    for (var i = 0; i < uint8Array.byteLength; i++) {
        array[i] = uint8Array[i];
    }

    return array;
}

  _toggled = () => {
    this.setState({lightIsOn:!this.state.lightIsOn});
    message = new sensor_pb.CommandMessage();
    message.setCommand(1);
    sensor = new sensor_pb.Sensor();
    sensor.setState(this.state.lightIsOn);
    sensor.setId(1);
    sensor.setType(1);
    message.setParameter(sensor);
    var array = this._convertByte(message.serializeBinary());
    alert(typeof array[0])
    tcpClient.sendMessage(array, (err) => {alert(err)}, (suc) => {alert("Sucesso!")});
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity
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
            onValueChange = {this._toggled}
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
