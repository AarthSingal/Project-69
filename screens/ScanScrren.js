import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity , Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

export default class ScanScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions : null,
      scanned : false,
      scannedData : "",
      buttonState : 'normal'
    }
  }
  getCameraPermission=async ()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions : status === "granted"
    })
  }
  handleBarcodeScanned= async({type,data})=>{
    this.setState({
      scanned : true,
      scannedData : data,
      buttonState : 'normal'
    })
  }
  render (){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState

    if(buttonState === 'clicked' && hasCameraPermissions){
      return (
        <BarCodeScanner 
        onBarCodeScanned={scanned?
        undefined:
      this.handleBarcodeScanned}
      style = {StyleSheet.absoluteFillObject}/>
      )
    }else if(buttonState === 'normal'){
  return (
    <View style={styles.container}>
        <Image source={require('../assets/BarcodeScanner.jpeg')} style={{width:200,height:200,margin:10}}/>
      <Text style={styles.displayText}>{
        hasCameraPermissions === true ?
        this.state.scannedData:
        "Request Camera Permission"
      }</Text>
      <TouchableOpacity style ={styles.scanButton} onPress = {()=>{
        this.getCameraPermission()
      }}>
        <Text style = {styles.buttonText}>Scan Qr Code</Text>
      </TouchableOpacity>
    </View>
  )}}
}
const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent:"center",
    alignItems : "center"
  },
  displayText:{
    fontSize : 15,
    textDecorationLine : 'underline'
  },
  scanButton:{
    backgroundColor : "yellow",
    padding : 10,
    margin:10
  },
  buttonText:{
    fontSize : 20
  }
})