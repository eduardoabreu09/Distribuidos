import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, TextInput, AsyncStorage, ScrollView } from 'react-native';
import { Container, Header, Title, Body, Left, Content, Right} from 'native-base'
import { byteStringToByteArray, byteToString, convertByte } from './src/util/decode'
import { Icon, Button } from 'react-native-elements';
import {NativeModules} from 'react-native';
import Modal from 'react-native-modal';
import { Connection, Exchange, Queue } from 'react-native-rabbitmq';
var tcpClient = NativeModules.TCPClient;
var time;
var reset;
const config = {
  host:'ec2-3-89-88-24.compute-1.amazonaws.com',
  port:5672,
  username:'dist',
  password:'dist',
  virtualhost:'/'
}
const sensor_pb = require('./src/util/sensor_pb.js');
export default class App extends Component{
  constructor(props) {
    super(props);
    let connection = new Connection({
      host:'ec2-3-89-88-24.compute-1.amazonaws.com',
      port:5672,
      username:'dist',
      password:'dist',
      virtualhost:'/',
      ttl: 5000
    });
    this.state = {
      isConnected:false,
      lightIsOn:false,
      tempValue: 0,
      lumValue: 0,
      gasValue: 0,
      modalVis: false,
      ip: "127.0.0.1",
      port: 1234,
      connection: connection,
      exchange:null,
      tempQueue:null
     };
  connection.on('error', (event) => {
      alert('error')
    });

  connection.on('connected', (event) => {
      alert('deu bom ');
      this.setState({isConnected:true});
      let exchange = new Exchange(connection, {
        name: 'DIST',
        type: 'direct',
        durable: false,
        autoDelete: false,
        internal: false
      });
      this.setState({connection:connection});
      this.setState({exchange:exchange});
      this._setupQueue();
    });
     
  };

  componentWillUnmount(){
    if(this.state.connection != null){
      this.state.connection.close();
    }
  }

  _setupQueue(){
    let queue = new Queue( this.state.connection, {
      name: '',
      passive: false,
      durable: true,
      exclusive: true,
      consumer_arguments: {'x-priority': 1},
      autoBufferAck: true,
      buffer_delay: 100
    });
    queue.bind(this.state.exchange, 'TEMPERATURE');
    queue.bind(this.state.exchange, 'GAS');
    queue.bind(this.state.exchange, 'LUMINOSITY');
    queue.on('message', (data) => {
      this._readQueueData(data);
    });
  }

  _readQueueData = (data) => {
    this._onFetchSensorSuccess(data.message);
  }

  _bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(array[i], 2));
    }
    return result;
  }

  componentDidMount = () => {
    this._getIpPort();
  }
  
  _onFetchSensorSuccess = (suc) => {
    msgObj = sensor_pb.CommandMessage.deserializeBinary(suc);
    switch (msgObj.getParameter().getId()){
      case 1:
        this.setState({lightIsOn: (msgObj.getParameter().getState() == 0 ? false : true)});
        break;
      case 2:
        this.setState({tempValue: msgObj.getParameter().getState()});
        break;
      case 3:
        this.setState({lumValue: msgObj.getParameter().getState()});
        break;
      case 4:
        this.setState({gasValue: msgObj.getParameter().getState()});
    }
  }

  _onConnectPressed = () => {
    if (!this.state.isConnected){
    this.state.connection.connect();
    }else {
      this.state.connection.close();
    }
  }

  _errorConnect = (err) => {
    alert(err);
  }

  _saveConfig = async() => {
    await AsyncStorage.setItem("@ip",this.state.ip);
    await AsyncStorage.setItem("@port",this.state.port.toString());
    this.setState({modalVis:false})
  }

  _getIpPort = async() =>  {
    let ip = await AsyncStorage.getItem("@ip");
    let port = Number(await AsyncStorage.getItem("@port"));
    if(ip)
      this.setState({ip});
    if(port)
      this.setState({port});
  }

  _renderModal = () => (
    <View style ={styles.modalView}>
      <View>
        <Text style={styles.modalText}>IP</Text>
        <TextInput 
        value ={this.state.ip}
        style = {styles.modalText}
        keyboardType = 'numbers-and-punctuation'
        maxLength = {15}
        onChangeText = {(text) => {this.setState({ip:text})}}
        />
      </View>
      <View>
        <Text style={styles.modalText}>Port</Text>
        <TextInput 
        value = {this.state.port.toString()}
        style = {styles.modalText}
        keyboardType = "numeric"
        maxLength = {4}
        onChangeText = {(text) => {this.setState({port:Number(text)})}}
        />
      </View>
      <View style={{flexDirection:'row',justifyContent:"space-between"}}>
        <Button
          title = "Voltar"
          titleStyle ={styles.buttonText} 
          buttonStyle ={styles.buttonCancel} 
          onPress = { () => { this.setState({modalVis:false}) }}>
        </Button>
        <Button
          title = "Ok"
          titleStyle ={styles.buttonText} 
          buttonStyle ={styles.buttonOk} 
          onPress = { () => { this._saveConfig() }}>
        </Button>
      </View>
    </View>
  )

  
  render() {
    return (
      <Container style ={styles.container}>
        <Modal
          onModalWillShow = {this._getIpPort}
          hasBackdrop = {true}
          onBackButtonPress = {() => {this.setState({modalVis:false})}}
          onBackdropPress = {() => {this.setState({modalVis:false})}}
          isVisible = {this.state.modalVis}
          animationIn = "fadeIn"
          animationOut = "fadeOut"
          animationInTiming = {500}
          animationOutTiming = {500}
          onSwipeComplete = {() => {this.setState({modalVis:false})}}
          swipeDirection = {["down","left","right","up"]}
        >
          {this._renderModal()}
        </Modal>
        <Header 
        style={styles.header} 
        androidStatusBarColor = "#014e85"
        noShadow={true}
        >
          <View>
            <TouchableOpacity
            style ={styles.iconTouch}
            onPress= { () => {this._onConnectPressed()} }>
              { this.state.isConnected ?
              <Icon name="wifi"
              color = "#00ff62"/>
              :
              <Icon name="signal-wifi-off"
              color = "#ff002b"/>
              } 
            </TouchableOpacity>
          </View>
          <View style={styles.body} >
            <Title style={{fontFamily:'lato',fontWeight:'bold',fontSize:20}}>
              Sensores.io
            </Title>
          </View>
          <View>
          <TouchableOpacity
            style ={styles.iconTouch}
            onPress= { () => {this.setState({modalVis:true})} }>
              <Icon name="settings"
              color = "#fff"/>
            </TouchableOpacity>
          </View>
        </Header>
        <ScrollView style ={styles.content}>
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <View style ={styles.sensorView}>
              <View style={styles.sensorValues}>
                <Text style = {styles.buttonText}>Temperatura</Text>
                <Text style = {styles.valueText}>{this.state.tempValue.toFixed(2)}ºC</Text>
              </View>
              <View style={styles.sensorValues}>
                <Text style = {styles.buttonText}>Luminosidade</Text>
                <Text style = {styles.valueText}>{Math.floor(this.state.lumValue)}%</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#000000"
  },
  header: {
    alignItems:'center',
    backgroundColor:"#014e85",
    justifyContent:'space-between'
  },
  modalView: {
    backgroundColor:"#00b874",
    borderRadius:20,
    borderColor:'#fff',
    borderWidth:5,
    padding:20

  },
  modalText: {
    fontFamily:'lato',
    fontWeight:'bold',
    fontSize:15,
    color:'#fff'
  },
  body:{
  },
  content:{
    flex:1,
    backgroundColor:"#00b874",
    borderWidth:5,
    borderColor:'#fff'
  },
  sensorView:{
    flex:1,
    flexDirection:'row',
    marginVertical:20
  },
  sensorValues:{
    flex:1,
    backgroundColor:"#014e85",
    alignItems:'center',
    justifyContent:'center',
    borderWidth:5,
    height:175,
    borderColor:"#fff",
    marginHorizontal:10,
    borderRadius:20
  },
  valueText:{
    fontSize:30,
    color:'#fff',
    fontFamily:'lato',
    fontWeight:'bold'
  },
  iconTouch:{
    marginHorizontal:20
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
    color: '#fff',
    marginBottom: 5,
  },
  buttonCancel: {
    width:'70%',
    justifyContent:'center',
    backgroundColor: "#014e85"
  },
  buttonOk: {
    width:"50%",
    marginLeft:60,
    justifyContent:'center',
    backgroundColor: "#014e85"
  },
  buttonText:{
    fontSize:20,
    color:'#fff',
    fontFamily:'lato',
    fontWeight:'bold'
  },
  medText: {
    fontSize:50,
    color:'#fff',
    fontFamily:'lato',
    fontWeight:'bold',
    textAlign:'center'
  }
});
