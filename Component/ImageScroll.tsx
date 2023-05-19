import React, { useState } from 'react';
import { View, Text,StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
  imageUrls: string[];
  imagesPerRow: number;
}

const ImageScroll: React.FC<Props> = ({ imageUrls, imagesPerRow }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openImagePreview = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImagePreview = () => {
    setSelectedImageIndex(null);
  };

  const renderGrid = () => {
    const rows = Math.ceil((imageUrls.length - 1) / imagesPerRow);

    const firstImage = (
      <TouchableOpacity onPress={() => openImagePreview(0)} key={0} style={[styles.imageContainer, styles.firstImageContainer]}>
        <FastImage
          source={{ uri: imageUrls[0] }}
          style={styles.firstImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );

    const restImages: JSX.Element[] = [];

    for (let i = 0; i < rows; i++) {
      const rowImages = imageUrls.slice(i * imagesPerRow + 1, (i + 1) * imagesPerRow + 1);

      const rowViews = rowImages.map((url, index) => (
        <TouchableOpacity key={index + 1} onPress={() => openImagePreview(i * imagesPerRow + index + 1)} style={styles.imageContainer}>
          <FastImage source={{ uri: url }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </TouchableOpacity>
      ));

      restImages.push(
        <View key={i} style={styles.column}>
          {rowViews}
        </View>
      );
    }

    return (
      <FlatList
      initialNumToRender={3}
      horizontal
      showsHorizontalScrollIndicator={true}
      data={[0]}
      
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.column}>
            {firstImage}
          </View>
          {restImages}
        </View>
      )}
    />
  );
};
   

  const renderImagePreview = () => {
    if (selectedImageIndex !== null) {
      return (
        <Modal visible={true} transparent={false}>
          <TouchableOpacity style={styles.modalContainer} onPress={closeImagePreview}>
            <FastImage source={{ uri: imageUrls[selectedImageIndex] }} style={styles.previewImage} resizeMode={FastImage.resizeMode.contain} />
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Comment</Text>
            </TouchableOpacity>
          </View>
          </TouchableOpacity>
        </Modal>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      {renderGrid()}
      {renderImagePreview()}
    </React.Fragment>
  );
};

const windowWidth = Dimensions.get('window').width;
const columnCount = 2;
const columnWidth = windowWidth / columnCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 8,
  },
  firstImageContainer: {
    marginBottom: 8,
    height: 250,
    aspectRatio: 1,
    borderRadius: 8,
  },
  imageContainer: {
    marginBottom: 8,
    height: 250 / 2 - 3,
    aspectRatio: 1,
    borderRadius: 8,
  },
  firstImage: {
    flex: 1,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  previewImage: {
    width: windowWidth - 80,
    height: windowWidth - 80,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default ImageScroll;
