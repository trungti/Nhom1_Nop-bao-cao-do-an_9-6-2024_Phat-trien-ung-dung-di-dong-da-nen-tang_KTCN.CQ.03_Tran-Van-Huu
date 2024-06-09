import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, IconButton } from 'react-native-paper';

const ChiTietDonHangCuaEmployee = ({ route, navigation }) => {
  const { MaHD,totalPrice, customerName, id, date, time, paymentMethod, totalQuantity, itemDetails } = route.params.item;
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green" }}>
        <IconButton style={{ backgroundColor: "white" }} icon="chevron-left" onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ color: "white",fontWeight: "bold",fontSize:22 }}>
            {MaHD}
          </Text>
        </View>
      </Appbar>
      <ScrollView style={{ flexDirection: "column", padding: 10 }}>
        <View style={styles.sectionHeader}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Khách hàng</Text></View>
        <View style={styles.sectionContent}><Text style={{ fontWeight:"bold",
    fontSize:16}}>{customerName}</Text></View>
        <View style={styles.sectionContent}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Hình thức thanh toán:                              {paymentMethod}</Text></View>
        <View style={styles.sectionContent}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Kênh bán:                                                    Bán trực tiếp</Text></View>
        <View style={styles.sectionHeader}><Text  style={{ fontWeight:"bold",
    fontSize:16}}>Chi tiết đơn hàng</Text></View>
        <View style={styles.sectionContent}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Tổng số lượng hàng: {totalQuantity}</Text></View>
        <View style={styles.sectionContent}>
          {itemDetails.map((item, index) => (
            <View key={index} style={styles.itemDetail}>
              <Text style={{ fontWeight:"bold",
    fontSize:16}}>{item.name} ({item.quantity})</Text>
              <Text style={{ fontWeight:"bold",
    fontSize:16}}>                                                                                 {formatNumber(item.price)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionHeader}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Tổng tiền hàng                                                     {formatNumber(totalPrice)}</Text></View>
        <View style={styles.sectionHeader}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Giảm giá hóa đơn                                                          0</Text></View>
        <View style={styles.sectionHeader}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Khách cần trả                                                       {formatNumber(totalPrice)}</Text></View>
        <View style={styles.sectionHeader}><Text style={{ fontWeight:"bold",
    fontSize:16}}>Khách thanh toán                                                {formatNumber(totalPrice)}{`\n\n`}</Text></View>

</ScrollView>
    </View>
  );
};

export default ChiTietDonHangCuaEmployee;

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 10,
    marginTop: 10,
    backgroundColor:"lightgray",
  },
  sectionContent: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10
  },
  itemDetail: {
    paddingVertical: 5
  }
});
