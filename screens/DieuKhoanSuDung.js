import React from "react";
import { ScrollView, View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

const DieuKhoanSuDung = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:"green"}}>
                <Appbar.Action style={{backgroundColor:"white"}} icon="close" onPress={() => navigation.goBack()} />
                <Text>{`                 `}</Text>
<Text style={{color:"white",fontSize:22,fontWeight:"bold"}}>Điều khoản sử dụng</Text>
            </Appbar.Header>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.header}>I. Điều khoản sử dụng dịch vụ{"\n"}</Text>
                
                <Text style={styles.subHeader}>1.1. Định Nghĩa{"\n"}</Text>
                <Text style={styles.content}>
                    <Text style={styles.bold}>“Dịch vụ”</Text> – Phần mềm quản lý Bếp Mẹ Sam chạy dưới tên miền www.bepmesam.vn và ứng dụng Bếp Mẹ Sam{"\n"}
                    <Text style={styles.bold}>“Ứng dụng Bếp Mẹ Sam”</Text> – Ứng dụng Bếp Mẹ Sam phiên bản chính thức được tải trực tiếp từ các nền tảng phân phối ứng dụng, sau đây gọi tắt là “Cửa hàng ứng dụng”.{"\n"}
                    <Text style={styles.bold}>“Website”</Text> – Trang thông tin điện tử khi truy cập địa chỉ www.bepmesam.vn{"\n"}
                    <Text style={styles.bold}>“Nội dung”</Text> – Hình ảnh, biểu tượng, bài viết, video được đăng trên Website{"\n"}
                    <Text style={styles.bold}>“Chủ tài khoản”</Text> – Người đăng ký ban đầu; hoặc người giữ tài khoản quản trị; hoặc người truy cập tài khoản cửa hàng bằng tài khoản quản trị.{"\n"}
                    <Text style={styles.bold}>“Cửa hàng”</Text> – Tài khoản cửa hàng do khách hàng đặt có dạng abc123.bepmesam.vn, trong đó phần abc123 do Chủ tài khoản tự đặt.{"\n"}
                    <Text style={styles.bold}>“Tài khoản quản trị”</Text> – Tài khoản được tạo ra đầu tiên khi chủ tài khoản đăng ký cửa hàng khách hàng trên www.bepmesam.vn{"\n"}
                    <Text style={styles.bold}>“Bạn”</Text> – Chủ tài khoản hoặc các nhân viên được chủ tài khoản cấp tài khoản truy cập vào cửa hàng; những Bạn viếng thăm, tìm hiểu thông tin trên website www.bepmesam.vn{"\n"}
                    <Text style={styles.bold}>“Bếp Mẹ Sam”</Text> – Công ty Cổ phần Công Nghệ Bếp Mẹ Sam{"\n"}
                    <Text style={styles.bold}>“Bên thứ ba”</Text> – Khách hàng, đối tác, nhà cung cấp của cửa hàng hoặc của Bếp Mẹ Sam{"\n"}
                    <Text style={styles.bold}>“Dữ liệu cửa hàng”</Text> – Dữ liệu dưới dạng điện tử được lưu trữ trên cửa hàng được giới hạn truy cập bằng tài khoản do chủ tài khoản thiết lập.{"\n"}
                    <Text style={styles.bold}>“Khu vực chung”</Text> – Trang chủ www.bepmesam.vn; màn hình đăng nhập; footer các trang, khu vực logo các trang trên giao diện web và ứng dụng Bếp Mẹ Sam trên điện thoại thông minh.{"\n"}
                    <Text style={styles.bold}>“Khu vực riêng”</Text> – Trang màn hình bán hàng, phần nội dung các trang quản lý.{"\n"}
                    <Text style={styles.bold}>“Tính năng”</Text> – Tính năng hiện có và đang được cung cấp trên Bếp Mẹ Sam.{"\n"}
                </Text>

                <Text style={styles.subHeader}>1.2. Phạm vi áp dụng{"\n"}</Text>
                <Text style={styles.content}>
                    Điều khoản sử dụng này áp dụng cho Dịch vụ phần mềm quản lý cửa hàng Bếp Mẹ Sam, phiên bản chính thức chạy trên máy chủ của Bếp Mẹ Sam dưới tên miền chính thức www.bepmesam.vn và ứng dụng Bếp Mẹ Sam. Bếp Mẹ Sam duy trì trang thông tin điện tử www.bepmesam.vn và các tên miền phụ như một dịch vụ cung cấp cho khách hàng nhưng không giới hạn là các cá nhân, tổ chức sử dụng. Khi sử dụng Website này và bất kỳ dịch vụ nào tại đây có nghĩa là Bạn đã chấp nhận và đồng ý tuân theo bản Điều khoản sử dụng này. Ngoài ra khi sử dụng các Dịch vụ cụ thể của Bếp Mẹ Sam, Bạn phải tuân theo các điều khoản và điều kiện riêng áp dụng cho Dịch vụ đó theo từng thời điểm. Bếp Mẹ Sam có thể thay đổi, điều chỉnh Điều khoản sử dụng này, Bạn có thể xem những thông tin mới cập nhật vào bất cứ lúc nào tại www.bepmesam.vn. Nếu Bạn tiếp tục sử dụng Dịch vụ có nghĩa là Bạn chấp nhận và đồng ý tuân theo Điều khoản sử dụng mới được cập nhật. Bất cứ sự vi phạm nào của Bạn đối với các điều khoản và điều kiện này đều có thể dẫn đến việc đình chỉ hoặc kết thúc tài khoản, Dịch vụ hoặc những hoạt động được phép khác theo Thỏa thuận sử dụng Dịch vụ của Bếp Mẹ Sam.{"\n"}
                </Text>

                <Text style={styles.subHeader}>1.3. Sử dụng hợp pháp{"\n"}</Text>
                <Text style={styles.content}>
                    Bạn phải nhận thức và chấp nhận rằng Bạn có trách nhiệm sử dụng Dịch vụ vào công việc kinh doanh dịch vụ phù hợp với pháp luật hiện hành và thuần phong mỹ tục Việt Nam. Bạn không được sử dụng dịch vụ để tuyên truyền nội dung đồi trụy, chống phá nhà nước, phát tán thư rác và/hoặc các thông tin không mong muốn đến những tổ chức và cá nhân khác trong xã hội dưới mọi hình thức.{"\n"}
                </Text>

                <Text style={styles.subHeader}>1.4. Bảo mật tài khoản{"\n"}</Text>
                <Text style={styles.content}>
                    Bạn có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Bất kỳ hoạt động nào xảy ra dưới tài khoản của bạn sẽ do bạn chịu trách nhiệm hoàn toàn. Bạn phải thông báo ngay lập tức cho Bếp Mẹ Sam về bất kỳ vi phạm nào liên quan đến bảo mật hoặc sử dụng trái phép tài khoản của bạn. Bếp Mẹ Sam sẽ không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào phát sinh từ việc bạn không tuân thủ các quy định trên.{"\n"}
                </Text>

                <Text style={styles.subHeader}>1.5. Quyền sở hữu trí tuệ{"\n"}</Text>
                <Text style={styles.content}>
                    Toàn bộ nội dung, thiết kế, văn bản, đồ họa, giao diện người dùng, hình ảnh, thương hiệu, logo và các tài liệu khác liên quan đến Dịch vụ đều thuộc quyền sở hữu trí tuệ của Bếp Mẹ Sam hoặc các bên cấp phép cho Bếp Mẹ Sam. Bạn không được sao chép, tái tạo, phân phối, truyền tải, hiển thị, bán, cấp phép hoặc khai thác bất kỳ phần nào của Dịch vụ mà không có sự đồng ý trước bằng văn bản của Bếp Mẹ Sam.{"\n"}
                </Text>

                <Text style={styles.subHeader}>1.6. Giới hạn trách nhiệm{"\n"}</Text>
                <Text style={styles.content}>
                    Bếp Mẹ Sam không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng Dịch vụ, hoặc từ các hành động hoặc nội dung của bất kỳ bên thứ ba nào sử dụng Dịch vụ. Trong mọi trường hợp, trách nhiệm của Bếp Mẹ Sam đối với bạn sẽ không vượt quá số tiền mà bạn đã thanh toán cho việc sử dụng Dịch vụ trong vòng 12 tháng trước thời điểm phát sinh trách nhiệm.{"\n"}
                </Text>

                <Text style={styles.subHeader}>1.7. Điều khoản chung{"\n"}</Text>
                <Text style={styles.content}>
                    Nếu bất kỳ điều khoản nào của bản Điều khoản sử dụng này bị tuyên bố là vô hiệu hoặc không thể thi hành, các điều khoản còn lại vẫn sẽ tiếp tục có hiệu lực. Điều khoản sử dụng này sẽ được điều chỉnh và hiểu theo pháp luật Việt Nam. Mọi tranh chấp phát sinh từ hoặc liên quan đến Điều khoản sử dụng này sẽ được giải quyết thông qua hòa giải tại Bếp Mẹ Sam trước khi đưa ra tòa án có thẩm quyền.{"\n"}
                </Text>

                <Text style={styles.header}>II. Chính sách bảo mật{"\n"}</Text>

                <Text style={styles.subHeader}>2.1. Thu thập thông tin cá nhân{"\n"}</Text>
                <Text style={styles.content}>
                    Bếp Mẹ Sam cam kết bảo vệ sự riêng tư của bạn. Chúng tôi sẽ thu thập thông tin cá nhân của bạn khi bạn đăng ký sử dụng Dịch vụ, tạo tài khoản hoặc liên hệ với chúng tôi. Các thông tin này có thể bao gồm tên, địa chỉ, số điện thoại, email và các thông tin cần thiết khác để cung cấp Dịch vụ cho bạn.{"\n"}
                </Text>

                <Text style={styles.subHeader}>2.2. Sử dụng thông tin cá nhân{"\n"}</Text>
                <Text style={styles.content}>
                    Chúng tôi sẽ sử dụng thông tin cá nhân của bạn để cung cấp, duy trì và cải thiện Dịch vụ, liên hệ với bạn về tài khoản và Dịch vụ của bạn, gửi thông tin khuyến mãi và tiếp thị, và cho các mục đích nội bộ khác.{"\n"}
                </Text>

                <Text style={styles.subHeader}>2.3. Chia sẻ thông tin cá nhân{"\n"}</Text>
                <Text style={styles.content}>
                    Chúng tôi sẽ không chia sẻ thông tin cá nhân của bạn với bên thứ ba trừ khi có sự đồng ý của bạn, hoặc khi cần thiết để cung cấp Dịch vụ, hoặc theo yêu cầu của pháp luật.{"\n"}
                </Text>

                <Text style={styles.subHeader}>2.4. Bảo mật thông tin{"\n"}</Text>
                <Text style={styles.content}>
                    Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi mất mát, lạm dụng, truy cập trái phép, tiết lộ, thay đổi và phá hủy.{"\n"}
                </Text>

                <Text style={styles.header}>III. Liên hệ{"\n"}</Text>

                <Text style={styles.content}>
                    Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng hoặc Chính sách bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi:
                </Text>

                <TouchableOpacity onPress={() => Linking.openURL('tel:123456789')}>
                    <Text style={styles.contact}>Điện thoại: 123-456-789</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@bepmesam.vn')}>
                    <Text style={styles.contact}>Email: contact@bepmesam.vn</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.bepmesam.vn')}>
                    <Text style={styles.contact}>Website: www.bepmesam.vn{`\n\n\n\n\n\n\n\n\n\n\n\n\n\n`}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    scrollView: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color:"blue"
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold",
    },
    contact: {
        fontSize: 16,
        marginBottom: 10,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default DieuKhoanSuDung;
