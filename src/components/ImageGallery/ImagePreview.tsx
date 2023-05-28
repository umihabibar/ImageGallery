import React from 'react';
import { Modal, Image, StyleSheet, TouchableOpacity, View, Text, Dimensions,Animated } from 'react-native';
import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
}
const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClose }) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const handlePinchGesture = React.useCallback((event: any) => {
    if (event.nativeEvent.scale) {
      scale.setValue(event.nativeEvent.scale);
    }
  }, []);

  return (
    <Modal visible={!!imageUrl} transparent={true} onRequestClose={onClose} animated>
      <GestureHandlerRootView style={styles.container}>
        <PinchGestureHandler
          onGestureEvent={handlePinchGesture}
          onHandlerStateChange={handlePinchGesture}
        >
          <Animated.View style={[styles.imageContainer, { transform: [{ scale }] }]}>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          </Animated.View>
        </PinchGestureHandler>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={require('../../Images/closeIcon.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
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
   imageContainer: {
    flex: 1,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    // backgroundColor: '#e0e0e0',
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"white"
  },
});

export default ImagePreview;
