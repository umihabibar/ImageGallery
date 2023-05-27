import React from 'react';
import { Modal, Image, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClose }) => {
  return (
    <Modal visible={!!imageUrl} transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: windowHeight,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ImagePreview;
