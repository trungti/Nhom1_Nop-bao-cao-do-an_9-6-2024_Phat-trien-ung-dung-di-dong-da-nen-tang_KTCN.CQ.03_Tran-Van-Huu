import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, RadioButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ThanhToan = ({ route, navigation }) => {
  const [showImage, setShowImage] = useState(false);
  const [MaHD, setMaHD] = useState("");
  const { totalPrice, totalQuantity, itemDetails, customerName } = route.params;
  const [payment, setPayment] = useState(totalPrice);
  const [change, setChange] = useState(0);
  const ref = firestore().collection('LichSuDonHang');
  const productRef = firestore().collection('DuLieuSanPham');
  const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  useEffect(() => {
    const generateMaHD = async () => {
      try {
        const snapshot = await ref.orderBy('MaHD', 'desc').limit(1).get();
        let lastMaHD = snapshot.docs[0]?.data().MaHD || "HD0";
        let lastNumber = parseInt(lastMaHD.replace("HD", "")) || 0;
        let newMaHD = "HD" + (lastNumber + 1);
        setMaHD(newMaHD);
      } catch (error) {
        console.error("Error generating MaHD: ", error);
      }
    };
    generateMaHD();
  }, []);

  const handlePaymentChange = (value) => {
    const paymentValue = parseFloat(value) || 0;
    setPayment(paymentValue);
    setChange(paymentValue - totalPrice);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    if (value === 'Chuyển khoản' || value === 'Thẻ') {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  };

  const handledAddStorage = async () => {
    if (change < 0) {
      Alert.alert("Lỗi", "Tiền khách thanh toán không đủ.");
      return;
    }

    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  
    try {
      // Lưu hóa đơn vào Firestore
      const response = await ref.add({
        MaHD,
        totalQuantity,
        totalPrice,
        payment,
        paymentMethod,
        itemDetails,
        customerName,
        date,  // Add current date
        time,  // Add current time
      });
      await ref.doc(response.id).update({ id: response.id });
      // Chuyển hướng về màn hình BanHang và cập nhật dữ liệu, reset selection
      navigation.navigate('BanHang', { resetSelection: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green", bottom: 10, width: 1000, right: 10 }}>
        <Appbar.BackAction backgroundColor="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title={<Text style={{ color: 'white', left: 100, fontSize: 20 }}>Thanh toán</Text>} />
      </Appbar>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, justifyContent: "center" }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Tổng tiền hàng</Text>
            <View style={{ alignItems: "center", width: 50, right: 80, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
              <Text style={{ fontWeight: "bold" }}>{totalQuantity}</Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>{formatNumber(totalPrice)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Giảm giá</Text>
            <TextInput style={styles.input} defaultValue="0" keyboardType="numeric" readOnly />
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Khách cần trả</Text>
            <Text style={styles.totalText}>{formatNumber(totalPrice)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Khách thanh toán</Text>
            <TextInput
              style={styles.input}
              value={payment.toString()}
              keyboardType="numeric"
              onChangeText={handlePaymentChange}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Tiền mặt</Text>
            <RadioButton value="Tiền mặt" status={paymentMethod === 'Tiền mặt' ? 'checked' : 'unchecked'} onPress={() => handlePaymentMethodChange('Tiền mặt')} />
            <Text style={{ fontWeight: "bold" }}>Chuyển khoản</Text>
            <RadioButton value="Chuyển khoản" status={paymentMethod === 'Chuyển khoản' ? 'checked' : 'unchecked'} onPress={() => handlePaymentMethodChange('Chuyển khoản')} />
            <Text style={{ fontWeight: "bold" }}>Thẻ</Text>
            <RadioButton value="Thẻ" status={paymentMethod === 'Thẻ' ? 'checked' : 'unchecked'} onPress={() => handlePaymentMethodChange('Thẻ')} />
          </View>

          {showImage && (
            <Image
              source={require("../asset/z5481877950156_32dde4dbe2a9708d6eba7469bdb1c59a.jpg")}
              style={{
                alignSelf: "center",
                height: 350,
                width: 350
              }}
            />
          )}

          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Tiền thừa trả khách</Text>
            <TextInput style={{ color: "black" }} value={formatNumber(change.toString())} keyboardType="numeric" readOnly />
          </View>

          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Giao hàng</Text>
            <Switch value={true} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handledAddStorage}>
            <Text style={styles.buttonText}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThanhToan;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontWeight: "bold"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 0.2,
    height: 50,
    right: 30,
    width: 412,
    backgroundColor: "white",
    fontWeight: "bold"
  },
  input: {
    color: "black",
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    width: 100,
    textAlign: 'right',
    fontWeight: "bold"
  },
  totalText: {
    color: 'red',
    fontWeight: "bold"
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    right: 30,
    width: 410,
    fontWeight: "bold"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
});
