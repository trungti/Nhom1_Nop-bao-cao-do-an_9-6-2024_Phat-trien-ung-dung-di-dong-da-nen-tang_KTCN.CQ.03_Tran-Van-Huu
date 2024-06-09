import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Appbar, Text, IconButton } from 'react-native-paper';

const ChiTietSanPham = ({ route,navigation}) => {
  const { id, image,name,MaH } = route.params.item;

  return (
    <View style={{ flex: 1 }}>
            {/* <IconButton style={{ backgroundColor: 'white',size:1 }} icon="close" onPress={() => navigation.goBack()} /> */}

      <Appbar style={{ backgroundColor: "green" }}>    
      <IconButton style={{ backgroundColor: 'white' }} icon="close" onPress={() => navigation.goBack()} />
  
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: "white", textAlign: "center",fontSize:22,fontWeight:"bold" }}> {MaH}</Text>
        </View>
      </Appbar>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode='contain'/>
      </View>
      <View style={{textAlign:"center",alignItems: 'center',bottom:50,backgroundColor:"white",borderWidth:0.1,height:50,width:420}}>
      <Text style={{fontSize:22,fontWeight:"bold"}}>{name}</Text>


      </View>
    </View>
  );
};

export default ChiTietSanPham;

const styles = StyleSheet.create({
  imageContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    bottom:10,
    backgroundColor:"white"
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
