import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, TextInput, AsyncStorage, ScrollView } from 'react-native';
import { Container, Header, Title, Body, Left, Content} from 'native-base'
import { byteStringToByteArray, byteToString, convertByte } from './src/util/decode'
import { Icon, Button } from 'react-native-elements';
import {NativeModules} from 'react-native';
import Modal from 'react-native-modal';
var tcpClient = NativeModules.TCPClient;

const sensor_pb = require('./src/util/sensor_pb.js');
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isConnected:false,
      lightIsOn:false,
      tempValue: 0,
      lumValue: 0,
      modalVis: false,
      ip: "127.0.0.1",
      port: 1234
     };
  };

  _connectToGateway = () => {
    if(this.state.isConnected == false)
    {
      tcpClient.connect(this.state.ip,this.state.port, this._errorConnect, this._successConnect);
    }
  }

  _disconnectGateway = () => {
    tcpClient.disconnect((err) => {console.log(err)}, (suc) => {this.setState({isConnected:false})});
  }

  _onConnectPressed = () => {
    if(this.state.isConnected)
      this._disconnectGateway();
    else
      this.setState({modalVis:true});
  }

  _errorConnect = (err) => {
    this.setState({modalView:false});
    alert(err);
  }

  _successConnect = async(suc) => {
    await AsyncStorage.setItem("@ip",this.state.ip);
    await AsyncStorage.setItem("@port",this.state.port.toString());
    this.setState({isConnected:true, modalVis:false})
    console.log('Deu bom')
  }

  _toggled = () => {
    this.setState({lightIsOn: !this.state.lightIsOn});
    message = new sensor_pb.CommandMessage();
    message.setCommand(1);
    sensor = new sensor_pb.Sensor();
    stateValue = !this.state.lightIsOn == true ? 1.0 : 0.0;
    sensor.setState(stateValue);
    sensor.setId(1);
    sensor.setType(1);
    message.setParameter(sensor);
    var array = convertByte(message.serializeBinary());
    tcpClient.sendMessage(array, (err) => {alert(err)}, this._toggledSuc);
  }

  _toggledSuc = (suc) => {
    msg = byteStringToByteArray(suc)
    msgObj = sensor_pb.CommandMessage.deserializeBinary(msg);
    alert(msgObj.getParameter().getState());
    this.setState({lightIsOn: (msgObj.getParameter().getState() == 0 ? false : true)});
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
        <Text style={styles.modalText}>Ip</Text>
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
          onPress = { () => { this._connectToGateway() }}>
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
          <Left>
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
          </Left>
          <Body style={styles.body} >
            <Title style={{fontFamily:'lato',fontWeight:'bold',fontSize:20}}>
              Sensores.io
            </Title>
          </Body>
        </Header>
        <ScrollView style ={styles.content}>
          <View style = {styles.imageView}>
            {
            this.state.lightIsOn ?
            <Image source = {require('./src/images/lightbulb_white_yellow.png') }/>
            :
            <Image source = {require('./src/images/lightbulb_white.png') }/>
            }
          <Switch
            onValueChange = {this._toggled}
            value = {this.state.lightIsOn}
            disabled = {!this.state.isConnected}/>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <View style ={styles.sensorView}>
              <View style={styles.sensorValues}>
                <Text style = {styles.buttonText}>Temperatura</Text>
                <Text style = {styles.valueText}>0</Text>
              </View>
              <View style={styles.sensorValues}>
                <Text style = {styles.buttonText}>Luminosidade</Text>
                <Text style = {styles.valueText}>0</Text>
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
    backgroundColor:"#014e85"
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
    marginLeft:32
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
    margin:20
  },
  sensorValues:{
    flex:1,
    backgroundColor:"#014e85",
    alignItems:'center',
    justifyContent:'center',
    borderWidth:5,
    height:200,
    borderColor:"#00b874"
  },
  valueText:{
    fontSize:30,
    color:'#fff',
    fontFamily:'lato',
    fontWeight:'bold'
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
