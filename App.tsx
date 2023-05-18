import React, { useEffect, useState } from 'react';
import ImageScroll from './Component/ImageScroll';
import { View, Image, Text } from 'react-native';

const Images: React.FC = () => {
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
      const response = await fetch('https://api.unsplash.com/search/photos/?client_id=' + clientId + '&query=flower', {
        headers: {
          Authorization: 'IJwtF0tX5-6d3qts4hvmrz0eKiyB2QTaF_m6WrPrZX0',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      const imageResults = data.results;
      const urls = imageResults.map((item: any) => item.urls.regular);
      console.log(urls.length);
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
            <Image source={require('./src/Something.png')} style={{ width: 300, height: 300 }} />
            {/* <Text style={{ color: "red", fontSize: 22, fontWeight: "bold" }}>{error}</Text> */}
          </View>
        )
          :
          noImage ? (
            <View style={{ alignItems: "center", paddingTop: "25%" }}>
              <Image source={require('./src/noImage.png')} style={{ width: 300, height: 300 }} />
              {/* <Text style={{ color: "red", fontSize: 22, fontWeight: "bold" }}>{error}</Text> */}
            </View>
          ) :
            (
              <ImageScroll imageUrls={imageUrls} imagesPerRow={2} />
            )}

    </View>
  );
};
export default Images;
