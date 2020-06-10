import React,{Component,useState, useEffect } from 'react';
//import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, Text, View, Image, TextInput, Keyboard,Button} from 'react-native';
import { pays } from './meteo.js';
import * as Location from 'expo-location';



export class Meteo extends Component{

  constructor(props){
    super(props);
    this.state = {"city" : "Lyon"};
    this.pays = pays;
    this.jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    this.mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  }

  componentDidMount(){
     this.bo();
  }

  bo = async() => {
      Location.requestPermissionsAsync();
      this.coord = await Location.getCurrentPositionAsync();
      fetch("https://api.opencagedata.com/geocode/v1/json?q="+this.coord.coords.latitude+"+"+this.coord.coords.longitude+"&key=8c0089d5fb374e85bdfd93be1d78e8f1")
        .then(res => res.json())
        .then((result) => {this.setState({"city" : result.results[0].components.city});this.changeCity();} , (error) => {this.setState({"error" : error})} );


  }

  update(ville){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ville+"&APPID=fa956c3c094574e034c48dc970215933")
      .then(res => res.json())
      .then((result) => {if (result.cod == "200") {this.setState({"tab" : result});}} , (error) => {this.setState({"error" : error})} );


  }

  kelvin(kelvin) {
    return (kelvin-273.15).toFixed(1);
  }

  changeCity(){
    this.update(this.state.city);
  }

  findDate(){
      var d = new Date(this.state.tab.list[0].dt*1000);
      this.jourNum = d.getDate();
      this.moisNum = d.getMonth();
      this.annee = d.getFullYear();
      this.jour = d.getDay();
  }
  render(){
    if (this.state && this.state.tab != undefined) {
        this.findDate();
      return (
        <View style={style.cont}>
          <TextInput onChangeText={(text) => (this.setState({"city" : text}))} style={style.input} placeholder="Changer la ville"/>
          <Button title="Valider" onPress={()=> (this.changeCity())}/>
          <Image source={{uri:"http://openweathermap.org/img/wn/"+this.state.tab.list[0].weather[0].icon+"@2x.png"}} style={{height: 200,width:200}}/>

          <Text h2="true">{this.jours[this.jour]} {this.jourNum} {this.mois[this.moisNum]} {this.annee}</Text>
          <Text h2="true">{this.state.tab.city.name}</Text>
          <Text h2="true">{this.pays[this.state.tab.city.country]}</Text>
          <View><Text>Max : {this.kelvin(this.state.tab.list[0].main.temp_max)} °C</Text></View>
          <View><Text>Actu : {this.kelvin(this.state.tab.list[0].main.temp)} °C</Text></View>
          <View><Text>Min : {this.kelvin(this.state.tab.list[0].main.temp_min)} °C</Text></View>
        </View>
      );
  }else{
      return(
          <View><Text>Chargement ...</Text></View>
      )
    }
  }
}


export class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {"lieux" : this.props.base};

    }

    render(){
        return(
            <View>
                <View style={[style.menu]}>
                    {this.props.children.map((number, i) => <Text onPress={() => (this.setState({"lieux" : i}))} style={style.menuItem} key={i}>Page {i+1} </Text>)}
                </View>
                <View>{this.props.children[this.state.lieux]}</View>
            </View>
        );
    }
}




const style = StyleSheet.create({
  cont:{
    width : "100%",
    alignItems : "center",
    },
  input : {
      width : "100%",
      height: 40,
      backgroundColor: 'azure',
      fontSize: 20,
      padding : 10,
  },
  menuItem : {
      marginBottom : 15,
      width : 50,
  },
  menu : {
    paddingTop : 20,
    padding : 5,
    backgroundColor : "lightgrey",
    }
});
