import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { useMyContextController, logout } from "../store";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from "react-native-paper";

const CaiDatAdmin = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    const handleLogout = () => {
        logout(dispatch);
    };

    useEffect(() => {
        if (userLogin == null) {
            navigation.navigate("Login");
        }
    }, [userLogin]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.header}>
                    <View style={{right:140,flexDirection:"row", alignItems: "center"}}>
                        <IconButton style={{backgroundColor:"white"}} icon="account" color="white"/>
                        <Text style={styles.name}>{userLogin ? userLogin.fullName : 'User-Name'}</Text>
                    </View>
                    <View style={{right:100,flexDirection:"row", justifyContent: "space-between"}}>
                        <Text style={styles.branch}>Chi nhánh trung tâm </Text>
                        <IconButton style={{left:200,backgroundColor:"white"}} icon="chevron-right" color="white"/>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Giao dịch</Text>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="receipt" size={24} color="black" />
                    <Text style={styles.menuText}>Hóa đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                <Text>{`                                       `}</Text>
                    <Icon name="reply" size={24} color="black" />
                    <Text style={styles.menuText}>Trả hàng</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="account-balance-wallet" size={24} color="black" />
                    <Text style={styles.menuText}>Sổ quỹ</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hàng hóa</Text>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="category" size={24} color="black" />
                    <Text style={styles.menuText}>Hàng hóa</Text>
                </TouchableOpacity>
                <Text>{`                                       `}</Text>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="check-box" size={24} color="black" />
                    <Text style={styles.menuText}>Kiểm kho</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="file-download" size={24} color="black" />
                    <Text style={styles.menuText}>Nhập hàng</Text>
                </TouchableOpacity>
                <Text>{`                                     `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="file-upload" size={24} color="black" />
                    <Text style={styles.menuText}>Trả hàng nhập</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="local-shipping" size={24} color="black" />
                    <Text style={styles.menuText}>Chuyển hàng</Text>
                </TouchableOpacity>
                <Text>{`                                 `}</Text>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="delete" size={24} color="black" />
                    <Text style={styles.menuText}>Xuất hủy</Text>
                </TouchableOpacity>
                </View>

            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bán online</Text>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="shopping-cart" size={24} color="black" />
                    <Text style={styles.menuText}>Bán Online</Text>
                </TouchableOpacity>
                <Text>{`                                      `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="web" size={24} color="black" />
                    <Text style={styles.menuText}>Web bán hàng</Text>
                </TouchableOpacity>
                </View>

            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đối tác</Text>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="people" size={24} color="black" />
                    <Text style={styles.menuText}>Khách hàng</Text>
                </TouchableOpacity>
                <Text>{`                                   `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="business" size={24} color="black" />
                    <Text style={styles.menuText}>Nhà cung cấp</Text>
                </TouchableOpacity>
                </View>

            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Giao hàng</Text>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="local-shipping" size={24} color="black" />
                    <Text style={styles.menuText}>Vận đơn</Text>
                </TouchableOpacity>
                <Text>{`                                          `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="handshake" size={24} color="black" />
                    <Text style={styles.menuText}>Đối tác GH</Text>
                </TouchableOpacity>
                </View>

            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nhân viên</Text>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="person" size={24} color="black" />
                    <Text style={styles.menuText}>Nhân viên</Text>
                </TouchableOpacity>
                <Text>{`                                       `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="schedule" size={24} color="black" />
                    <Text style={styles.menuText}>Chấm công</Text>
                </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="attach-money" size={24} color="black" />
                    <Text style={styles.menuText}>Bảng lương</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Báo cáo cuối ngày</Text>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="calendar-today" size={24} color="black" />
                    <Text style={styles.menuText}>Cuối ngày</Text>
                </TouchableOpacity>
                <Text>{`                                       `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="trending-up" size={24} color="black" />
                    <Text style={styles.menuText}>Bán hàng</Text>
                </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="inventory" size={24} color="black" />
                    <Text style={styles.menuText}>Hàng hóa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tài chính</Text>
                <View style={{flexDirection:"row"}}>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="payment" size={24} color="black" />
                    <Text style={styles.menuText}>Thanh toán</Text>
                </TouchableOpacity>
                <Text>{`                                       `}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="monetization_on" size={24} color="black" />
                    <Text style={styles.menuText}>Vay vốn</Text>
                </TouchableOpacity>
                </View>

            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cài đặt chung</Text>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="store" size={24} color="black" />
                    <Text style={styles.menuText}>Thiết lập cửa hàng                                               </Text>
                    <IconButton icon="chevron-right" color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("NguoiDung")}>
                    <Icon name="people-alt" size={24} color="black" />
                    <Text style={styles.menuText}>Quản lý người dùng                                               </Text>
                    <IconButton icon="chevron-right" color="white"/>
                </TouchableOpacity>
                </View>
                <View style={styles.section}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="chat" size={24} color="black" />
                    <Text style={styles.menuText}>Hướng dẫn sử dụng                                               </Text>
                    <IconButton icon="chevron-right" color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="chat" size={24} color="black" />
                    <Text style={styles.menuText}>Chat với Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('tel:19006522')}>
                    <Icon name="support-agent" size={24} color="black" />
                    <Text style={styles.menuText}>Gọi tổng đài 19006522</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.section}>
                <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("DieuKhoanSuDung")}>
                    <Icon name="info" size={24} color="black" />
                    <Text style={styles.menuText}>Điều khoản sử dụng                                               </Text>
                    <IconButton icon="chevron-right" color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Icon name="logout" size={24} color="black" />
                    <Text style={styles.menuText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Phiên bản</Text>
                <Text style={styles.versionNumber}>1.0.000</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    profileContainer: {
        backgroundColor: "green",
        padding: 15,
    },
    header: {
        alignItems: "center",
    },
    time: {
        fontSize: 20,
        color: "white",
        alignSelf: "flex-end",
    },
    name: {
        fontSize: 22,
        color: "white",
        marginLeft: 10,
        fontWeight:"bold"
    },
    branch: {
        fontSize: 14,
        color: "white",
    },
    section: {
        backgroundColor: "white",
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    menuText: {
        marginLeft: 20,
        fontSize: 16,
    },
    versionContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    versionText: {
        fontSize: 16,
        color: "grey",
    },
    versionNumber: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CaiDatAdmin;
