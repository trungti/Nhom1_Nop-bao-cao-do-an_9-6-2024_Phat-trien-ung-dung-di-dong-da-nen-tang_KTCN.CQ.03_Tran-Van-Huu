import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, IconButton, Checkbox } from 'react-native-paper';

const ChiTietNguoiDung = ({ route, navigation }) => {
  const { fullName, username, phone, password,id } = route.params.item;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{backgroundColor:"green"}}>
        <Appbar.BackAction style={{backgroundColor:"white"}} onPress={() => navigation.goBack()} />
        <Appbar.Content title={<Text style={{ color: 'white',fontSize:22}}>{fullName}</Text>} />
        <IconButton
          style={{backgroundColor:"white"}}
          icon="account-edit"
          onPress={() => {
            navigation.navigate("SuaNguoiDung", { item: { fullName, username, phone, password,id } });
          }}
        />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THÔNG TIN NGƯỜI DÙNG</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tên người dùng</Text>
            <Text style={styles.value}>{fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <Text style={styles.value}>{username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PHÂN QUYỀN</Text>
          <View style={styles.row}>
            <Text style={styles.value}>Chi nhánh trung tâm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>Nhân viên thu ngân</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUYỀN HẠN</Text>
          <View style={styles.row}>
            <Checkbox status="checked" />
            <Text style={styles.value}>Xem thông tin chung trong các giao dịch</Text>
          </View>
          <View style={styles.row}>
            <Checkbox status="checked" />
            <Text style={styles.value}>Xem giao dịch của nhân viên khác</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChiTietNguoiDung;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});
