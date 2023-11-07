import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({title, buttonStyle, textStyle, onPress}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: 20,
    backgroundColor: 'black',
    height: 40,
    width: 100,
    shadowColor: 'black',
    shadowOpacity: 'black',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 6,
  },
  text: {
    color: 'white',
  },
});

export default Button;
