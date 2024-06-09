import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { useMyContextController, logout } from "../store";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from "react-native-paper";

const CaiDatNhanVien = ({ navigation }) => {
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
                <View style={{flexDirection:"row"}}>
                <IconButton icon="account"/>
                <Text style={{ color: 'white', fontSize: 30, marginRight: 20 }}>{userLogin ? userLogin.fullName : 'User-Name'}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                <Text style={styles.branch}>              Chi nhánh trung tâm                                          </Text>
                <IconButton icon="chevron-right"/>
                </View>
            </View>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="reply" size={24} color="black" />
                <Text style={styles.menuText}>Trả hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="receipt" size={24} color="black" />
                <Text style={styles.menuText}>Lập phiếu thu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="print" size={24} color="black" />
                <Text style={styles.menuText}>Cài đặt máy in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="settings" size={24} color="black" />
                <Text style={styles.menuText}>Cài đặt ứng dụng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="folder" size={24} color="black" />
                <Text style={styles.menuText}>Quản lý</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('tel:19006522')}>
                <Icon name="support-agent" size={24} color="black" />
                <Text style={styles.menuText}>Hỗ trợ 19006522</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="chat" size={24} color="black" />
                <Text style={styles.menuText}>Chat với KiotViet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("DieuKhoanSuDung")}>
                <Icon name="info" size={24} color="black" />
                <Text style={styles.menuText}>Điều khoản sử dụng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Icon name="logout" size={24} color="black" />
                <Text style={styles.menuText}>Đăng xuất</Text>
            </TouchableOpacity>
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Phiên bản</Text>
                <Text style={styles.versionNumber}>1.12.1161</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        padding: 20,
        backgroundColor: '#4CAF50',
    },
    time: {
        fontSize: 18,
        color: 'white',
    },
    name: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    branch: {
        fontSize: 16,
        color: 'white',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
    },
    versionContainer: {
        padding: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    versionText: {
        fontSize: 16,
    },
    versionNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CaiDatNhanVien;
