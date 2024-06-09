import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet, Image, TextInput } from 'react-native';
import { Appbar, Text, IconButton, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HangHoa = ({ route, navigation }) => {
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  const [totalIds, setTotalIds] = useState(0);
  const ref = firestore().collection('DuLieuSanPham');

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(response => {
      const arr = [];
      response.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setService(arr);
      setFilteredService(arr);
      calculateTotalValue(arr);
      calculateTotalIds(arr);
    });
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
      const unsubscribe = ref.onSnapshot(response => {
        const arr = [];
        response.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
        setService(arr);
        setFilteredService(arr);
        calculateTotalValue(arr);
        calculateTotalIds(arr);
      });
      return () => unsubscribe();
    }
  }, [route.params?.updated]);

  useEffect(() => {
    if (route.params?.resetSelection) {
      handleResetSelection();
    }
  }, [route.params?.resetSelection]);

  const handleImagePress = (item) => {
    navigation.navigate('SuaHangHoa', { item });
  };
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const renderItem = ({ item }) => {
    const { name, price, id, slton, image,NH,MaVach,MaH } = item;
    const selectedItem = selectedItems[id];
    const selectedQuantity = selectedItem ? selectedItem.quantity : 0;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleImagePress(item)}>
        <View style={styles.imageContainer}>
          {image && image !== "" &&
            <TouchableOpacity >
              <Image source={{ uri: image }} style={styles.image} resizeMode={"contain"} />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.textContainer}>
          <View style={styles.column}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>{name}</Text>
            <Text>{MaH}</Text>
          </View>
          <View style={styles.column}>
            <Text style={{fontWeight:"bold",fontSize:16}}>{formatNumber(price)}</Text>
            <Text>Tồn : {formatNumber(slton-selectedQuantity)} SUẤT</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const calculateTotalValue = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.slton), 0);
    setTotalValue(total);
  };

  const calculateTotalIds = (items) => {
    const total = items.length;
    setTotalIds(total);
  };

  const handleResetSelection = () => {
    setSelectedItems({});
    setFilteredService(service);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: 'green' }}>
        <Text style={{color:"white",fontSize:22,fontWeight:"bold"}}>Hàng hóa</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <IconButton style={{ backgroundColor: 'white' }} icon="magnify" />
        </View>
      </Appbar.Header>
      <View style={styles.totalContainer}>
        <View style={{flexDirection:"column"}}>
          <Text style={styles.totalText}>Tổng tồn</Text>
          <Text>{totalIds} hàng hóa</Text>
        </View>
        <Text style={styles.totalValue}>{totalValue.toLocaleString()}</Text>
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

export default HangHoa;

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    width:180
  },
  itemContainer: {
    backgroundColor:"white",
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  imageContainer: {
    marginRight: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0'
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray'
  },
  itemStock: {
    fontSize: 12,
    color: 'gray'
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width:320
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor:"white"
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  totalValue: {
    fontSize: 16,
    color: 'black',
    fontWeight:"bold"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  resetButton: {
    backgroundColor: 'grey',
    width: 150
  },
  completeButton: {
    backgroundColor: 'green',
    width: 150
  }
});
