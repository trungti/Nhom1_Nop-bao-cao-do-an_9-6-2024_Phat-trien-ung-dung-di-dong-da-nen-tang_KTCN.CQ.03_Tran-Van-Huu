import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NguoiDung = () => {
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = firestore().collection('USERS');
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
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredService(filtered);
    }
  }, [searchQuery, service]);

  const handleSelectItem = (item) => {
    navigation.navigate('ChiTietNguoiDung', {  item});
  };

  const renderItem = ({ item }) => {
    const { fullName,email,phone,username,password,id } = item;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectItem(item)}>
        <View style={styles.textContainer}>
          <Text>{fullName}</Text>
          <Text>{email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{backgroundColor:"green"}}>
        <IconButton icon="chevron-left" style={{ backgroundColor: 'white'}} onPress={()=>navigation.goBack()} />
        <Appbar.Content title={<Text style={{ color: 'white', textAlign:"center",fontWeight:"bold",fontSize:22}}>Người dùng</Text>} />
        <IconButton icon="plus" style={{ backgroundColor: 'white'}} onPress={()=>navigation.navigate("ThemNguoiDung")} />

      </Appbar>
      
      <View style={{flexDirection:"row"}}>
        <IconButton icon="card-search-outline"/>
        <TextInput
          style={styles.searchInput}
          placeholder="Tên, email, username"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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

export default NguoiDung;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#ccc',
  },
  itemContainer: {
    flexDirection: "row",
    height: 100,
    borderRadius: 10,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor:"white"
  },
  image: {
    width: 70,
    height: 70,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
    backgroundColor:"white"
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
