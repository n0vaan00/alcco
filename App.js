import Lightstyles from './Lightstyles';
import Darkstyles from './Darkstyles';
import React, { useState } from 'react';
import NumericInput from "react-native-numeric-input";
import RadioForm from 'react-native-simple-radio-button';
import { Text, TextInput, View, Button, Switch, Alert } from 'react-native';


export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);

  const [weight,setWeight] = useState(0);
  const [bottles,setBottles] = useState(0);
  const [time,setTime] = useState(0);
  const [alco,setAlco] = useState(0);
  const [gender,setGender] = useState(2);
  const theme = isEnabled ? Darkstyles : Lightstyles;

    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burn = weight / 10;
    let left = grams - (burn * time);
  
    var radio_props = [
      {label: 'Female', value: 2},
      {label: 'Male', value: 1 }
    ];

  function calculate() {

    if(weight == '') {
      Alert.alert("Add weight!")
     } 
      if(gender === 2) {
        let result = (left) / (weight * 0.6);
        setAlco(Math.max(0, result));
      }
      if(gender === 1)
      {
        let result = (left) / (weight * 0.7);
        setAlco(Math.max(0, result));
      }
  
  }

  return (
    <View style={theme.container}>

      <View style={theme.theme}>
        <Text style={theme.themetext}>Theme</Text>
        <Switch
          trackColor={{ false: "#B1B2FF", true: "#EEF1FF" }}
          thumbColor={isEnabled ? "#D2DAFF" : "#AAC4FF"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        ></Switch>
      </View>

      <Text style={theme.header}>Alcometer</Text>


      <View style={theme.input}>
        <Text style={theme.wbhginput}>Weight</Text>
        <TextInput
          minValue = {0}
          style={theme.winput}
          value={weight} 
          onChangeText={text => setWeight(text)}
          keyboardType='decimal-pad'
          />
      </View>

      <View style={theme.input}>
        <Text style={theme.wbhginput}>Bottles</Text>
          <NumericInput
                  minValue = {0}
                  textColor={'#B1B2FF'}
                  onChange={value => setBottles(value)}
                  rounded
                  leftButtonBackgroundColor='#AAC4FF'
                  rightButtonBackgroundColor='#AAC4FF'
              />
        <Text style={theme.wbhginput}>Hours</Text>
          <NumericInput
                  minValue = {0}
                  textColor={'#B1B2FF'}
                  onChange={value => setTime(value)}
                  rounded
                  leftButtonBackgroundColor='#AAC4FF'
                  rightButtonBackgroundColor='#AAC4FF'
              />
      </View>
      <View style={theme.input}>
        <Text style={theme.wbhginput}>Gender</Text>
          <RadioForm
            buttonSize= {30}
            radio_props={radio_props}
            initial={0}
            onPress={value => setGender(value)}
            style= {theme.radio}
            buttonColor={'#B1B2FF'}
          />
      </View>
      <View>
        <Text style={theme.result}>{alco.toFixed(2)}</Text>
      </View>
      <View>
        <Button 
          color={'#B1B2FF'}
          onPress={calculate} 
          title="Calculate"
          rounded />
      </View>
    </View>
  );
}