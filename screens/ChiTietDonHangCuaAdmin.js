import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, IconButton, Portal, Dialog, Paragraph, Button, Provider } from 'react-native-paper';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import firestore from "@react-native-firebase/firestore";

const ChiTietDonHangCuaAdmin = ({ route, navigation }) => {
  const { MaHD,totalPrice, customerName, id, date, time, paymentMethod, totalQuantity, itemDetails } = route.params.item;
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [visible, setVisible] = useState(false);
  const SERVICES = firestore().collection("LichSuDonHang");
  const deleteService = () => {
      SERVICES.doc(id)
          .delete()
          .then(() => {
              setVisible(false);
              navigation.navigate("LichSuDonHangCuaAdmin");
          });
  };
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <Provider>
      <MenuProvider>
        <View style={{ flex: 1 }}>
          <Appbar style={{ backgroundColor: "green" }}>
            <IconButton style={{ backgroundColor: "white" }} icon="chevron-left" onPress={() => navigation.goBack()} />
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={{ color: "white",fontWeight:"bold",fontSize:22 }}>
                {MaHD}
              </Text>
            </View>
          
            <Menu>
              <MenuTrigger>
                <IconButton style={{ backgroundColor: "white" }} icon="dots-vertical" />
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                <View style={{flexDirection:"row"}}>
              <IconButton style={{ backgroundColor: "white" }} icon="reply" />
                <MenuOption onSelect={null} text="Trả hàng" customStyles={optionStyles} />
                </View>
                <View style={{flexDirection:"row"}}>
              <IconButton style={{ backgroundColor: "white" }} icon="printer" />
                <MenuOption onSelect={null} text="In" customStyles={optionStyles} />
                </View>
                <View style={{flexDirection:"row"}}>
              <IconButton style={{ backgroundColor: "white" }} icon="share-variant-outline" />
                <MenuOption onSelect={null} text="Chia sẻ" customStyles={optionStyles} />
              </View>
              <View style={{flexDirection:"row"}}>
              <IconButton style={{ backgroundColor: "white" }} icon="delete-outline" />
                <MenuOption onSelect={showDialog} text="Hủy hóa đơn" customStyles={optionStyles} />
</View>
              </MenuOptions>
            </Menu>
          </Appbar>
          <ScrollView style={{ flexDirection: "column", padding: 10 }}>
            <View style={styles.sectionHeader}><Text>Khách hàng</Text></View>
            <View style={styles.sectionContent}><Text>{customerName}</Text></View>
            <View style={styles.sectionContent}><Text>Hình thức thanh toán:                                                 {paymentMethod}</Text></View>
            <View style={styles.sectionContent}><Text>Kênh bán:                                                                   Bán trực tiếp</Text></View>
            <View style={styles.sectionHeader}><Text>Chi tiết đơn hàng</Text></View>
            <View style={styles.sectionContent}><Text>Tổng số lượng hàng 
              ({totalQuantity})</Text></View>
            <View style={styles.sectionContent}>
              {itemDetails.map((item, index) => (
                <View key={index} style={styles.itemDetail}>
                  <Text>{item.name} ({item.quantity})</Text>
                  <Text>                                                                                               {formatNumber(item.price)}</Text>
                </View>
              ))}
            </View>
            <View style={{ backgroundColor: "white",
    padding: 10,
    marginTop: 10}}><Text>Tổng tiền hàng                                                                 {formatNumber(totalPrice)}</Text></View>
            <View style={{ backgroundColor: "white",
    padding: 10,
    marginTop: 10}}><Text>Giảm giá hóa đơn                                                                       0</Text></View>
            <View style={{ backgroundColor: "white",
    padding: 10,
    marginTop: 10}}><Text>Khách cần trả                                                                  {formatNumber(totalPrice)}</Text></View>
            <View style={{ backgroundColor: "white",
    padding: 10,
    marginTop: 10,height:50}}><Text>Khách thanh toán                                                            {formatNumber(totalPrice)}</Text></View>

          </ScrollView>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Cảnh báo</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Bạn chắc chắn muốn xóa dịch vụ này chứ !</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Hủy</Button>
                <Button onPress={deleteService}>Xóa</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </MenuProvider>
    </Provider>
  );
};

export default ChiTietDonHangCuaAdmin;

const optionsStyles = {
  optionsContainer: {
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  optionsWrapper: {
    backgroundColor: 'white',
  },
  optionWrapper: {
    padding: 10,
  },
  optionTouchable: {
    underlayColor: 'lightgray',
    activeOpacity: 70,
  },
};

const optionStyles = {
  optionText: {
    fontSize: 18,
    color: 'black',
  },
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "lightgray",
    padding: 10,
    marginTop: 10
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
