import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet, Image, TextInput } from 'react-native';
import { Appbar, Text, IconButton, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LichSuDonHangCuaEmployee = ({ route, navigation }) => {
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = firestore().collection('LichSuDonHang');
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(
      response => {
        const arr = [];
        response.forEach(doc => {
          const data = doc.data();
          console.log('Document data:', data); // Debugging log
          arr.push({ id: doc.id, ...data });
        });
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
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.MaHD.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredService(filtered);
    }
  }, [searchQuery, service]);

  const handlePress = (item) => {
    navigation.navigate('ChiTietDonHangCuaEmployee', { item });
  };

  const renderItem = ({ item }) => {
    const {MaHD, totalPrice, customerName, id, date, time, paymentMethod, totalQuantity, itemDetails } = item;
    console.log('Item details:', itemDetails); // Debugging log

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
        <IconButton icon="cash"/>
        <View style={styles.textContainer}>
          <View style={styles.column}>
            <Text style={{color:"green",fontWeight:"bold",
    fontSize:16}}>{formatNumber(totalPrice)}</Text>
            <Text style={{ fontWeight:"bold",
    fontSize:16}}>{customerName}</Text>
            <Text style={{ fontWeight:"bold",
    fontSize:16}}>{MaHD}. {date} {time}</Text>
          </View>
          <View style={styles.column}>
            <Text style={{ fontWeight:"bold",
    fontSize:16}}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green" }}>
        <Appbar.Content title={<Text style={{ color: 'white', textAlign: "center",fontWeight: "bold",fontSize:22 }}>Lịch sử đơn hàng</Text>} />
      </Appbar>
      <View style={{flexDirection:"row"}}>
        <IconButton icon="card-search-outline"/>
        <TextInput
          style={styles.searchInput}
          placeholder="Mã, tên KH, công ty"
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

export default LichSuDonHangCuaEmployee;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.1,
    height: 100,
    borderRadius: 10,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    right:25,
    width:435,
    backgroundColor:"white"
  },
  image: {
    width: 70,
    height: 70,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
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
    width:350
  }
});
