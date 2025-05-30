import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import axios from "axios";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(""); 
    const [gender, setGender] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [driverLicense, setDriverLicense] = useState(""); 

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = "Vui lòng nhập Email";
        else if (!/\S+@\S+\.\S+/.test(username))
            newErrors.username = "Email không hợp lệ";

        if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (password.length < 6)
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

        if (!fullname) newErrors.fullname = "Vui lòng nhập họ và tên";

        if (!phone) newErrors.phone = "Vui lòng nhập số điện thoại";
        else if (!/^\d{10,11}$/.test(phone))
            newErrors.phone = "Số điện thoại không hợp lệ (10 hoặc 11 chữ số)";

    
        if (!dateOfBirth) newErrors.dateOfBirth = "Vui lòng nhập Ngày sinh";
        if (!gender) newErrors.gender = "Vui lòng chọn Giới tính"; 
        if (!address) newErrors.address = "Vui lòng nhập Địa chỉ";
        if (!driverLicense) newErrors.driverLicense = "Vui lòng nhập GPLX";

        setErrors(newErrors);
        // Kiểm tra tất cả các trường bắt buộc
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            Alert.alert(
                "Lỗi",
                "Vui lòng điền đầy đủ thông tin và đúng định dạng!"
            );
            return;
        }

        setIsLoading(true);
        try {
            
            const response = await axios.post(
                "http://192.168.84.17:3000/register",
                {
                    email: username,
                    password,
                    fullname: fullname.trim(), 
                    phone_number: phone.trim(),
                    date_of_birth: dateOfBirth.trim(),
                    gender: gender,
                    address: address.trim(),
                    driver_license_number: driverLicense.trim(),
                }
            );

            if (response.data.success) {
                Alert.alert(
                    "Thành công",
                    response.data.message || "Đăng ký thành công!"
                );

                
                setUsername("");
                setPassword("");
                setFullname("");
                setPhone("");
                setDateOfBirth(""); 
                setGender(""); 
                setAddress(""); 
                setDriverLicense(""); 
                setErrors({});

                navigation.replace("LoginScreen");
            } else {
                Alert.alert(
                    "Lỗi đăng ký",
                    response.data.message || "Đăng ký thất bại."
                );
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            if (error.response) {
                Alert.alert(
                    "Lỗi đăng ký",
                    error.response.data.message || "Có lỗi xảy ra khi đăng ký."
                );
            } else if (error.request) {
                Alert.alert(
                    "Lỗi mạng",
                    "Không thể kết nối tới server đăng ký. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau."
                );
            } else {
                Alert.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginLink = () => {
        navigation.navigate("LoginScreen");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Đang đăng ký...</Text>
                    </View>
                </View>
            )}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Đăng ký</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.username && styles.inputError,
                        ]}
                        placeholder="Email*"
                        placeholderTextColor="#888"
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            setErrors({ ...errors, username: null });
                        }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    {errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.password && styles.inputError,
                        ]}
                        placeholder="Mật khẩu*"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setErrors({ ...errors, password: null });
                        }}
                        autoCapitalize="none"
                    />
                    {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                </View>

                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.fullname && styles.inputError,
                        ]}
                        placeholder="Họ và tên*"
                        placeholderTextColor="#888"
                        value={fullname}
                        onChangeText={(text) => {
                            setFullname(text);
                            setErrors({ ...errors, fullname: null });
                        }}
                    />
                    {errors.fullname && (
                        <Text style={styles.errorText}>{errors.fullname}</Text>
                    )}
                </View>

                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.phone && styles.inputError,
                        ]}
                        placeholder="Số điện thoại*"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text);
                            setErrors({ ...errors, phone: null });
                        }}
                    />
                    {errors.phone && (
                        <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                </View>

                {/* Ngày sinh */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.dateOfBirth && styles.inputError,
                        ]}
                        placeholder="Ngày sinh (YYYY-MM-DD)*"
                        placeholderTextColor="#888"
                        value={dateOfBirth}
                        onChangeText={(text) => {
                            setDateOfBirth(text);
                            setErrors({ ...errors, dateOfBirth: null });
                        }}
                        keyboardType="numbers-and-punctuation" 
                        autoCapitalize="none"
                        
                    />
                    {errors.dateOfBirth && (
                        <Text style={styles.errorText}>
                            {errors.dateOfBirth}
                        </Text>
                    )}
                </View>

                {/* Giới tính */}
                <View style={styles.inputContainer}>
                    <View
                        style={[
                            styles.pickerContainer,
                            errors.gender && styles.inputError,
                        ]}
                    >
                        <Picker
                            selectedValue={gender}
                            style={styles.picker}
                            onValueChange={(itemValue) => {
                                setGender(itemValue);
                                setErrors({ ...errors, gender: null });
                            }}
                        >
                            <Picker.Item label="Chọn giới tính*" value="" />
                            <Picker.Item label="Nam" value="Male" />
                            <Picker.Item label="Nữ" value="Female" />
                            <Picker.Item label="Khác" value="Other" />
                        </Picker>
                    </View>
                    {errors.gender && (
                        <Text style={styles.errorText}>{errors.gender}</Text>
                    )}
                </View>

                {/* Địa chỉ */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.address && styles.inputError,
                        ]}
                        placeholder="Địa chỉ*"
                        placeholderTextColor="#888"
                        value={address}
                        onChangeText={(text) => {
                            setAddress(text);
                            setErrors({ ...errors, address: null });
                        }}
                    />
                    {errors.address && (
                        <Text style={styles.errorText}>{errors.address}</Text>
                    )}
                </View>

                {/* Số GPLX */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.driverLicense && styles.inputError,
                        ]}
                        placeholder="Số giấy phép lái xe*"
                        placeholderTextColor="#888"
                        value={driverLicense}
                        onChangeText={(text) => {
                            setDriverLicense(text);
                            setErrors({ ...errors, driverLicense: null });
                        }}
                        autoCapitalize="none"
                    />
                    {errors.driverLicense && (
                        <Text style={styles.errorText}>
                            {errors.driverLicense}
                        </Text>
                    )}
                </View>

                <TouchableOpacity
                    style={[
                        styles.btnRegister,
                        isLoading && styles.btnRegisterDisabled,
                    ]}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    <Text style={styles.btnRegisterText}>Đăng ký</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLoginLink}>
                    <Text style={styles.loginLink}>
                        Đã có tài khoản? Đăng nhập
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F3EE",
        paddingHorizontal: 24,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 20,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    loadingBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    loadingText: {
        marginTop: 8,
        color: "#333",
        fontSize: 14,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        alignSelf: "center",
        marginBottom: 32,
        color: "#333",
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        color: "#333",
        fontSize: 16,
    },
    inputError: {
        borderColor: "#ff3b30",
    },
    errorText: {
        color: "#ff3b30",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    pickerContainer: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    picker: {
        height: 48,
        width: "100%",
        color: "#333",
    },
    btnRegister: {
        backgroundColor: "#0275d8",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    btnRegisterDisabled: {
        backgroundColor: "#0275d880",
    },
    btnRegisterText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    loginLink: {
        color: "#E67E22",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
    },
});
