import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Appbar, Text, IconButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LichSuDonHangCuaAdmin = ({ route, navigation }) => {
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = firestore().collection('LichSuDonHang');

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
    navigation.navigate('ChiTietDonHangCuaAdmin', { item });
  };

  const renderItem = ({ item }) => {
    const { totalPrice, customerName, id, date, time, paymentMethod, itemDetails,MaHD } = item;
    console.log('Item details:', itemDetails); // Debugging log
  
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
        <View style={styles.textContainer}>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.orderInfo}>{date} {time} · {MaHD}</Text>
          <View style={styles.orderDetails}>
          {itemDetails.map((item, index) => (
            <View key={index}>
              <Text>{item.name} x {item.quantity}</Text>
            </View>
          ))}
          </View>
         
        </View>
        
        <View>
        <Text style={styles.totalPrice}>{totalPrice.toLocaleString('en-US')}</Text>
        <Text style={styles.paymentMethod}>{paymentMethod}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green" }}>
        <Appbar.Content title={<Text style={{ color: 'white', fontWeight: "bold",fontSize:22}}>Hóa đơn</Text>}/>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Mã, tên KH, công ty"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <IconButton style={{ backgroundColor:"white"}} icon="card-search-outline"/>
        <IconButton style={{ backgroundColor:"white"}} icon="plus" onPress={()=>navigation.navigate("BanHang")}/>
      </View>
      </Appbar>
      <View style={styles.totalContainer}>
        <View style={{flexDirection:"column"}}>
        <Text style={styles.totalText}>Tổng tiền hàng</Text>
        <Text style={styles.totalAmount}>{filteredService.length} hóa đơn</Text>
        </View>
        <Text style={styles.totalAmount}>{filteredService.reduce((total, item) => total + item.totalPrice, 0).toLocaleString('en-US')}đ</Text>
      </View>
      <ScrollView>
      <FlatList
        style={{ flex: 1 }}
        data={filteredService}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      </ScrollView>
    </View>
  );
};

export default LichSuDonHangCuaAdmin;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderInfo: {
    fontSize: 14,
    color: '#888',
    fontWeight:"bold"

  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
  },
  totalPrice: {
    fontSize: 14,
    color: '#000',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#000',
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:300
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor:"white"
  },
});
