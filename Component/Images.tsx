import React from 'react';
import ImageScroll from './ImageScroll';
import { View, ScrollView } from 'react-native';


const imageUrls = [
  'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/shot3.png',
  // 'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png',
  // 'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png',
  // 'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png',
  'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/shot3.png',
];

const Images: React.FC = () => {
  return (
    <View>
      <ImageScroll imageUrls={imageUrls} imagesPerRow={2}/>
    </View>
  );
};

export default Images;
