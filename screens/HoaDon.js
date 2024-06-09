import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, TextInput } from 'react-native';
import { Appbar, Text, IconButton, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const HoaDon = ({ route, navigation }) => {
    const { selectedItems, selectedCustomer, customerName } = route.params || {};
    const [items, setItems] = useState(Object.values(selectedItems || {}));
    const [searchQuery, setSearchQuery] = useState('');
    const [service, setService] = useState([]);
    const [filteredService, setFilteredService] = useState([]);
    const [customer, setCustomer] = useState(selectedCustomer || null);
    const [error, setError] = useState('');

    const handleQuantityChange = (id, delta) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
            )
        );
    };

    const handleQuantityInputChange = (id, value) => {
        const numericValue = parseInt(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity: numericValue } : item
                )
            );
        }
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredService(service);
        } else {
            const filtered = service.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredService(filtered);
        }
    }, [searchQuery, service]);

    useEffect(() => {
        if (route.params?.selectedCustomer) {
            setCustomer(route.params.selectedCustomer);
        }
    }, [route.params?.selectedCustomer]);

    const updateStock = async (items) => {
        const batch = firestore().batch();

        for(const item of items) {
            const itemRef = firestore().collection('DuLieuSanPham').doc(item.id);
            const doc = await itemRef.get();

            if (doc != null) {
                batch.update(itemRef, { slton: item.slton - item.quantity });
                console.log("d");
            } else {
                console.log("s");
            }
        };
        try {
            await batch.commit();
            console.log("Đã commit batch cập nhật kho");
        } catch (error) {
            console.log(error);
        }
    };

    const updateStockAndNavigate = async () => {
        try {
            await updateStock(items);
            navigation.navigate('ThanhToan', { totalPrice, totalQuantity, itemDetails, customerName });
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncreaseQuantity = (item) => {
        if (item.slton - item.quantity - 1 < 0) {
            Alert.alert('Thông báo', 'Số lượng tồn kho không đủ.');
            return;
        }
        handleQuantityChange(item.id, 1);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemNameContainer}>
                <Text style={styles.itemNameText}>{item.name}</Text>
                <Text style={styles.itemPriceText}>{formatNumber(item.price)} x</Text>
                <Text style={styles.itemStockText}>{formatNumber(item.slton - item.quantity)} SUẤT</Text>
            </View>
            <View style={styles.itemDetailsContainer}>
                <View style={styles.quantityControls}>
                    <IconButton icon="minus" onPress={() => handleQuantityChange(item.id, -1)} />
                    <View style={{borderWidth:0.5,backgroundColor:"lightgray"}}>
                        <TextInput
                            style={styles.quantityTextInput}
                            keyboardType='numeric'
                            value={String(item.quantity)}
                            onChangeText={(value) => handleQuantityInputChange(item.id, value)}
                        />
                    </View>
                    <IconButton icon="plus" onPress={() => handleIncreaseQuantity(item)} />
                </View>
            </View>
        </View>
    );

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemDetails = items.map(item => ({ slton: item.slton - item.quantity, name: item.name, price: item.price, quantity: item.quantity }));

    return (
        <View style={{ flex: 1 }}>
            <Appbar style={styles.appbar}>
                <IconButton
                    icon="close"
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title={<Text style={styles.appbarTitle}>Hóa đơn</Text>} />
            </Appbar>
            <View style={styles.customerContainer}>
                <IconButton
                    style={styles.customerIcon}
                    icon="account"
                    onPress={() => navigation.navigate("KhachHang")}
                />
                <Text onPress={() => navigation.navigate("KhachHang")} style={styles.customerName}>{customerName}</Text>
                <IconButton style={styles.arrowIcon} icon="chevron-right" color="white" />
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <View style={styles.totalContainer}>
                <IconButton icon="cart" style={styles.cartIcon} />
                <Text>Bán trực tiếp</Text>
                <View style={styles.totalQuantityContainer}>
                    <Text>{totalQuantity}</Text>
                </View>
                <View style={styles.totalPriceContainer}>
                    <Text style={{fontWeight:"bold",fontSize:16}}>{formatNumber(totalPrice)}</Text>
                </View>
            </View>
            <Button style={styles.payButton} mode="contained" onPress={updateStockAndNavigate}>
                Thanh toán
            </Button>
        </View>
    );
};

export default HoaDon;


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "white"
    },
    itemNameContainer: {
        flex: 2,
    },
    itemNameText: {
        fontSize: 18,
        width:400
    },
    itemDetailsContainer: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    itemPriceContainer: {
        flexDirection: "column"
    },
    itemPriceText: {
        fontWeight: "bold",
        fontSize: 16
    },
    itemStockText: {
        fontSize: 16
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        left:100,
        top:20
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    appbar: {
        backgroundColor: "green"
    },
    closeButton: {
        backgroundColor: 'white'
    },
    appbarTitle: {
        color: 'white',
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    },
    customerContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white"
    },
    customerIcon: {
        height: 20
    },
    customerName: {
        color: "green",
        flex: 1
    },
    arrowIcon: {
        left: 1
    },
    totalContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ddd"
    },
    cartIcon: {
        height: 20
    },
    totalQuantityContainer: {
        alignItems: "center",
        width: 50,
        left: 140,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    totalPriceContainer: {
        left: 150
    },
    payButton: {
        backgroundColor: "green",
        margin: 10
    }
});
