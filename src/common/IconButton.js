import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const IconButton = ({onPress, buttonStyle, imageStyle, imageSource}) => {
  return (
    <View>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Image style={[styles.image, imageStyle]} source={imageSource}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
});

export default IconButton;
