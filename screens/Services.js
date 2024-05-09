import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import Todo from '../component/Todo';
import { useNavigation } from '@react-navigation/native';
import { useMyContextController } from "../store";

const Services = () => {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false); // State để kiểm soát việc hiển thị chữ "Add New entity"
  const navigation = useNavigation();
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const ref = firestore().collection('todos');

  useEffect(() => {
    if (userLogin == null)
      navigation.navigate("Login")
  }, [userLogin]);

  const addTodo = async () => {
    const snapshot = await ref.get();
    const todoCount = snapshot.size;
    const newId = todoCount.toString();
    await ref.add({
      id: newId,
      title: todo,
      complete: false,
    });
    setTodo('');
  };

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  const logout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1 }}>

      <Appbar style={{ backgroundColor: "blue" }}>
        <Appbar.Content title={
          <Text style={{ color: 'white', fontSize: 30, marginRight: 20 }}>Hi: {userLogin ? userLogin.fullName : 'User-Name'}</Text>
        } />

        <Button style={{ backgroundColor: 'red', marginTop: 10, width: 100, height: 50 }} onPress={logout}>
          LOGOUT
        </Button>
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ backgroundColor: 'white', flex: 1 }}
          label={isTextInputFocused ? null : 'Add New entity'} // Ẩn chữ khi TextInput được focus
          value={todo}
          onChangeText={(text) => setTodo(text)}
          onFocus={() => setIsTextInputFocused(true)} // Khi TextInput được focus, set state là true
          onBlur={() => setIsTextInputFocused(false)} // Khi TextInput bị blur, set state là false
        />
        <Button style={{ backgroundColor: 'blue' }} textColor="black" onPress={addTodo}>
          ADD
        </Button>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Todo {...item} />
          </View>
        )}
      />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
