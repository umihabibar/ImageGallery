import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery';
import { View, Image, Text } from 'react-native';

const ImageGalleryContainer: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noImage, setNonImage] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const clientId = "IJwtF0tX5-6d3qts4hvmrz0eKiyB2QTaF_m6WrPrZX0"
      const response = await fetch('https://api.unsplash.com/search/photos/?client_id=' + clientId + '&query=flo', {
        headers: {
          Authorization: 'IJwtF0tX5-6d3qts4hvmrz0eKiyB2QTaF_m6WrPrZX0',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      const imageResults = data.results;
      let urls = imageResults.map((item: any) => item.urls.regular);
      console.log(urls);
      // urls=["https://images.unsplash.com/photo--ec70e46c76e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTAyODJ8MHwxfHNlYXJjaHwxfHxmbG98ZW58MHx8fHwxNjg1MTc2NDA5fDA&ixlib=rb-4.0.3&q=80&w=1080",
      //       "https://images.unsplash.com/photo-1621581314625-ec70e46c76e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTAyODJ8MHwxfHNlYXJjaHwxfHxmbG98ZW58MHx8fHwxNjg1MTc2NDA5fDA&ixlib=rb-4.0.3&q=80&w=1080",
      //       "https://images.unsplash.com/photo-1621581314625-ec70e46c76e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTAyODJ8MHwxfHNlYXJjaHwxfHxmbG98ZW58MHx8fHwxNjg1MTc2NDA5fDA&ixlib=rb-4.0.3&q=80&w=1080",
      //       "https://images.unsplash.com/photo--ec70e46c76e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTAyODJ8MHwxfHNlYXJjaHwxfHxmbG98ZW58MHx8fHwxNjg1MTc2NDA5fDA&ixlib=rb-4.0.3&q=80&w=1080",

      //     ]
      if (urls.length == 0) {
        setNonImage(true)
      }
        setImageUrls(urls);
      

      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Something was wrong');
      setLoading(false);
    }
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      )
        : error ? (

          <View style={{ alignItems: "center", paddingTop: "25%" }}>
            <Image source={require('../../Images/Something.png')} style={{ width: 300, height: 300 }} />
          </View>
        )
          :
          noImage ? (
            <View style={{ alignItems: "center", paddingTop: "25%" }}>
              <Image source={require('../../Images/noImage.png')} style={{ width: 300, height: 300 }} />
            </View>
          ) :
            (
              // <ImageGallery imageUrls={imageUrls} imagesPerRow={2} />
              <ImageGallery imageUrls={imageUrls}/>

            )}

    </View>
  );
};
export default ImageGalleryContainer;
