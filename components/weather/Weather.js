import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { openweathermap_api_key } from './config.json';
import axios from 'axios';
import { Image, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const Weather = ({ route }) => {
  const { item } = route.params;


  const [value, setValue] = useState('');
  const [temp, setTemp] = useState('');
  const [typeCity, setTypeCity] = useState('');
  const [city, setCity] = useState(item);
  const [img, setImg] = useState('');
  const [disc, setDisc] = useState('');

  const setChange = () => {
    // setCity({city: typeCity});
    getWeathr(city)
  }

  // console.log(typeCity, 'typeCity');
  // console.log(city, 'city');

  const getWeathr = (c) => {
    axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${c}&appid=ac7d264cc7a9a93297c3d4fb634a2780`
    ).then((res) => {
      setValue(res.data);
      setTemp(res.data.main);
      setImg(
        `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
      );
      setDisc(res.data.weather[0].description);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    axios(
     `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac7d264cc7a9a93297c3d4fb634a2780`
    ).then((res) => {
      setValue(res.data);
      setTemp(res.data.main);
      setImg(
        `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
      );
      setDisc(res.data.weather[0].description);
    });
    // getWeathr(city)
    // setTypeCity()
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Type city here"
          placeholderTextColor="white"
          color='white'
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.btn} onPress={() => setChange()}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}> {value.name} </Text>
      <Image style={styles.img} source={{ uri: img }} alt="weater icon" />
      <Text style={styles.text}> {disc} </Text>
      <View>
        <View style={styles.dataView}>
          <Text style={styles.text}>Min   
            {`${Math.floor(temp.temp_min - 273.15 )}° C`}
          </Text>
          {/* <Text style={styles.text}>{`${Math.floor(temp.temp - 273.15)}° C`}</Text> */}
          <Text style={styles.text}>Max
            {`${Math.floor(temp.temp_max - 273.15)}° C`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    justifyContent: 'space-around',
    marginTop: 10,
    justifyContent:'center',
  },
  img: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginTop: 10

  },
  dataView: {
    justifyContent: 'space-around'
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 10
  },
  btn: {
    width: 200,
    height: 30,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15

  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    textAlign: 'center'
  },
  btnText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }
});


export default Weather;