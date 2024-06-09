import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { Appbar, TextInput, Button, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const KhachHang = () => {
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = firestore().collection('DuLieuKhachHang');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(
      response => {
        const arr = [];
        response.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
        setService(arr);
        setFilteredService(arr);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredService(service);
    } else {
      const filtered = service.filter(item =>
        item.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.SDT1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.MaKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.MaKH.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredService(filtered);
    }
  }, [searchQuery, service]);

  const handleSelectItem = (item) => {
    navigation.navigate("BanHang",{ selectedCustomer: item });
  };

  const renderItem = ({ item }) => {
    const { TenKH, SDT1, MaKH, image, DiaChi } = item;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectItem(item)}>
        {image && image !== "" &&
          <Image source={{ uri: image }} style={styles.image} resizeMode={"contain"} />
        }
        <View style={styles.textContainer}>
          <Text style={{fontSize:22,fontWeight:"bold"}}>{TenKH}</Text>
          <Text>{MaKH}</Text>
          <View style={{flexDirection:"row"}}>
          <IconButton icon="phone"/>
          <Text style={{top:15}}>{SDT1}</Text>
          </View>
          <View style={{flexDirection:"row",width:250}}>
          <IconButton icon="map-marker-outline"/>
          <Text>{DiaChi}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{backgroundColor:"green"}}>
        <IconButton icon="close" style={{ backgroundColor: 'white'}} onPress={()=>navigation.goBack()} />
        <Appbar.Content title={<Text style={{ color: 'white', textAlign:"center",fontWeight:"bold",fontSize:22}}>Chọn khách hàng</Text>} />
        <IconButton icon="plus" style={{ backgroundColor: 'white'}} onPress={()=>navigation.navigate("ThemKhachHang")} />
      </Appbar>
      <View style={{flexDirection:"row"}}>
        <IconButton icon="card-search-outline"/>
        <TextInput
          style={styles.searchInput}
          placeholder="Tên, mã, sđt, e-mail, công ty"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={filteredService}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default KhachHang;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#ccc',
  },
  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.2,
    height: 150,
    borderRadius: 10,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width:1000,
    right:10,
    backgroundColor:"white"
  },
  image: {
    width: 70,
    height: 70,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor:"white",
    width:500
  }
});
