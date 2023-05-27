import React, { useState, useEffect } from 'react';
import { FlatList, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ImagePreview from './ImagePreview';

interface MyComponentProps {
  imageUrls: string[];
}

const SkeletonImage: React.FC = () => {
  return <View style={styles.skeleton} />;
};

const ImageGallery: React.FC<MyComponentProps> = ({ imageUrls }) => {
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorImages, setErrorImages] = useState<string[]>([]);
  const [imageurl, setImageUrl] = useState<string[]>([]);
  const [imagepreview, setImagePreview] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (index: number) => {
    setErrorImages((prevImages) => [...prevImages, imageUrls[index]]);
  };

  const openImagePreview = (item: string) => {
    setImageUrl([item]);
    setImagePreview(true);
  };
  const closeImagePreview = () => {
    setImagePreview(false);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    if (skeletonLoading) {
      return <SkeletonImage />;
    }

    if (errorImages.includes(item)) {
      return (
        <View style={styles.imageContainer}>
          <Image
            source={require('../../Images/noImage.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => openImagePreview(item)} activeOpacity={0.1}>
        <Image
          source={{ uri: item }}
          key={index}
          style={styles.image}
          onLoad={handleImageLoad}
          onError={() => handleImageError(index)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        initialNumToRender={3}
        horizontal
        showsHorizontalScrollIndicator={true}
        data={imageUrls}
        renderItem={renderItem}
      />
      {imagepreview && <ImagePreview imageUrl={imageurl[0]} onClose={closeImagePreview}/>}
    </>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: 260,
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 8,
    backgroundColor: '#f2f2f2',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    resizeMode: 'contain',
    margin: 8,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    margin: 8,
  },
});

export default ImageGallery;
