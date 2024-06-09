import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet, Image, TextInput } from 'react-native';
import { Appbar, Text, IconButton, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BanHang = ({ route, navigation }) => {
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const ref = firestore().collection('DuLieuSanPham');

  const selectedCustomer = route.params?.selectedCustomer;

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
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.MaH.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredService(filtered);
    }
  }, [searchQuery, service]);

  useEffect(() => {
    if (route.params?.updated) {
      const unsubscribe = ref.onSnapshot(
        response => {
          const arr = [];
          response.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
          setService(arr);
          setFilteredService(arr);
        }
      );
      return () => unsubscribe();
    }
  }, [route.params?.updated]);

  useEffect(() => {
    if (route.params?.resetSelection) {
      handleResetSelection();
    }
  }, [route.params?.resetSelection]);

  const handleSelectItem = (item) => {
    const selectedItem = selectedItems[item.id];
    const selectedQuantity = selectedItem ? selectedItem.quantity : 0;
    const remainingQuantity = item.slton - selectedQuantity;

    if (remainingQuantity <= 0) {
      alert('Sản phẩm này đã hết hàng');
      return;
    }

    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = { ...prevSelectedItems };
      if (newSelectedItems[item.id]) {
        newSelectedItems[item.id].quantity += 1;
      } else {
        newSelectedItems[item.id] = { ...item, quantity: 1 };
      }

      setFilteredService(prevService => prevService.map(serviceItem => 
        serviceItem.id === item.id ? { ...serviceItem, quantity: serviceItem.quantity - 1 } : serviceItem
      ));

      return newSelectedItems;
    });
  };

  const handleImagePress = (item) => {
    navigation.navigate('ChiTietSanPham', { item });
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const renderItem = ({ item }) => {
    const { name, price, id, slton, image, MaH } = item;
    const selectedItem = selectedItems[id];
    const selectedQuantity = selectedItem ? selectedItem.quantity : 0;
    const remainingQuantity = slton - selectedQuantity;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectItem(item)}>
        {image && image !== "" &&
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={{ uri: image }} style={styles.image} resizeMode={"contain"} />
          </TouchableOpacity>
        }
        <View style={styles.textContainer}>
          <View style={styles.column}>
            <Text style={{fontSize:18,fontWeight:"bold"}}>{name}</Text>
            <Text style={{color:"green"}}>{MaH}</Text>
          </View>
          <Text>{`     `}</Text>
          <View style={styles.column}>
            <Text style={{fontWeight:"bold",color:"green"}}>{formatNumber(price)}</Text>
            <Text style={{fontWeight:"bold"}}>{formatNumber(remainingQuantity)} SUẤT</Text>
            {selectedQuantity > 0 && <Text>x {selectedQuantity}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const handleResetSelection = () => {
    setSelectedItems({});
    setFilteredService(service);
  };

  const handleCompleteSelection = () => {
    navigation.navigate('HoaDon', { selectedItems, customerName: selectedCustomer?.TenKH || 'Khách lẻ' });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green" }}>
        <Appbar.Content title={<Text style={{ fontSize:22,color: 'white', textAlign: "center",fontWeight:"bold" }}>Lựa chọn hàng hóa</Text>} />
      </Appbar>
      <View style={{flexDirection:"row",backgroundColor:"white"}}>
        <IconButton icon="card-search-outline"/>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <IconButton icon="plus" onPress={() => navigation.navigate("ThemSanPham")} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "lightgray" }}>
        <IconButton 
          style={{ height: 20 }} 
          icon="account" 
          onPress={() => navigation.navigate("KhachHang")} 
        />
        {selectedCustomer ? (
          <View>
            <Text onPress={() => navigation.navigate("KhachHang")} style={{ color: "green" }}>{selectedCustomer.TenKH}</Text>
          </View>
        ) : (
          <Text style={{ color: "green" }} onPress={() => navigation.navigate("KhachHang")}>Khách lẻ</Text>
        )}
      </View>
      <FlatList
        style={{ flex: 1,backgroundColor:"white" }}
        data={filteredService}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {Object.keys(selectedItems).length > 0 && (
        <View style={styles.buttonContainer}>
          <Button style={{backgroundColor:"grey",width:250}} mode="contained" onPress={handleResetSelection}>Chọn lại</Button>
          <Button style={{backgroundColor:"green",width:250}} mode="contained" onPress={handleCompleteSelection}>Xong</Button>
        </View>
      )}
    </View>
  );
};

export default BanHang;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.1,
    height: 100,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    right:15,
    width:420,
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
    justifyContent: "space-between",
    width:190
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
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    width:300,
    fontWeight:"bold"
  }
});
