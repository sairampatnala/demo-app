import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Button, StyleSheet, TextInput, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const { width, height } = Dimensions.get('window');
import Colors from "./Utils/Colors"


const ProfileScreen = ({ navigation }) => {

    const [allValues, setAllValues] = useState({
        name: '',
        mobile: '',
        state: '',
        city: '',
        pincode: '',
        profilepic: {}
    });
    const [mobileValidation, setMobileValidation] = useState("")
    const [pincodeValidation, setPinCodeValidation] = useState("")
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        if (user !== null && Object.keys(user).length !== 0) {
            let newObject = {
                name: user.name,
                mobile: user.mobile,
                state: user.state,
                city: user.city,
                pincode: user.pincode,
                profilepic: user.profilepic
            }
            setAllValues({ ...newObject })
        }
    }, [])



    const changeHandler = (value, name) => {
        if (name === "mobile") {
            let pattern = /^[6-9][0-9]{9}$/;
            if (pattern.test(value)) {
                setMobileValidation("")
            } else {
                setMobileValidation("Please enter a valid mobile number.")
            }
        }
        if (name === "pincode") {
            let pattern = /^[1-9][0-9]{5}$/;
            if (pattern.test(value)) {
                setPinCodeValidation("")
            } else {
                setPinCodeValidation("Please enter a valid pincode.")
            }
        }
        setAllValues({ ...allValues, [name]: value })
    }

    const isFormVaid = () => {
        return allValues.name && allValues.mobile && allValues.state && allValues.city && allValues.pincode
            && mobileValidation === "" && pincodeValidation === "" && Object.keys(allValues.profilepic).length
    }

    const validationText = (message) => {
        return <Text style={validationError}>{message}</Text>
    }
    const submitHandler = () => {
        storeData()
        setUser(allValues)
        navigation.navigate("User")
    }

    const storeData = async () => {
        try {
            const jsonValue = JSON.stringify(allValues)
            await AsyncStorage.setItem('USERDETAILS', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const handleChoosePhoto = () => {
        const options = {};
        launchImageLibrary(options, response => {
            setAllValues({ ...allValues, profilepic: { ...response } })
        })

    }
    const handleCapturePhoto = () => {
        const options = {};
        launchCamera(options, response => {
            setAllValues({ ...allValues, profilepic: { ...response } })
        })
    }

    const { container, buttonContainer, imageButtonContainer, inputView, input, imageSelectText, inputContainer,
        label, errorMessage, validationError, imageContainer, imageStyle } = styles;

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{
                    // flex:1,
                    width: width,
                    height: height,
                }}
                showsVerticalScrollIndicator={false}>
                <View style={container}>



                    <View style={inputView}>
                        <View style={inputContainer} >
                            <Text style={label}>Name*</Text>
                            <TextInput
                                style={input}
                                onChangeText={(text) => changeHandler(text, "name")}
                                autoCapitalize="words"
                                value={allValues.name}
                                placeholder="Name"
                                maxLength={60}
                            />
                        </View>
                        <View style={inputContainer} >
                            <Text style={label}>Mobile Number*</Text>
                            <TextInput
                                name="mobile"
                                style={input}
                                onChangeText={(text) => changeHandler(text, "mobile")}
                                value={allValues.mobile}
                                placeholder="Mobile number"
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                            {mobileValidation !== "" && validationText(mobileValidation)}
                        </View>
                        <View style={inputContainer} >
                            <Text style={label}>State*</Text>
                            <TextInput
                                name="state"
                                autoCapitalize="words"
                                style={input}
                                onChangeText={(text) => changeHandler(text, "state")}
                                value={allValues.state}
                                placeholder="State"
                                maxLength={60}
                            />
                        </View>
                        <View style={inputContainer} >
                            <Text style={label}>City*</Text>
                            <TextInput
                                name="city"
                                autoCapitalize="words"
                                style={input}
                                onChangeText={(text) => changeHandler(text, "city")}
                                value={allValues.city}
                                placeholder="City"
                                maxLength={60}
                            />
                        </View>
                        <View style={inputContainer} >
                            <Text style={label}>Pin Code*</Text>
                            <TextInput
                                name="pincode"
                                style={input}
                                onChangeText={(text) => changeHandler(text, "pincode")}
                                value={allValues.pincode}
                                placeholder="Pincode"
                                keyboardType="phone-pad"
                                maxLength={6}
                            />
                            {pincodeValidation !== "" && validationText(pincodeValidation)}
                        </View>
                    </View>

                    <View style={imageContainer}>
                        {allValues.profilepic.uri ?
                            <Image style={imageStyle} source={{ uri: allValues.profilepic.uri }} />
                            : <Text style={imageSelectText}>Please Select Photo *</Text>}
                        <View style={imageButtonContainer}>
                            <View style={buttonContainer}>
                                <Button
                                    onPress={handleChoosePhoto}
                                    title="Choose Photo"
                                    color="#2c3531"
                                />
                            </View>

                            <View style={buttonContainer}>
                                <Button
                                    onPress={handleCapturePhoto}
                                    title="Capture photo"
                                    color="#2c3531"
                                />
                            </View>

                        </View>
                        {!isFormVaid() &&
                            <Text style={errorMessage}>Please fill all mandatory fields (*)</Text>}

                        <View style={buttonContainer}>
                            <Button
                                onPress={submitHandler}
                                title="Save"
                                color="#116466"
                                disabled={!isFormVaid() ? true : false}
                            />
                        </View>
                    </View>



                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#d1e8e2"
    },
    buttonContainer: {
        margin: 10,
        width: "40%"
    },
    inputView: {
        marginVertical: 5,
        width: "85%",
        marginTop: 25
    },
    input: {
        elevation: 1,
        borderRadius: 10,
        borderColor: "#000",
        fontSize: 16,
        height: 40,
        fontFamily: "roboto",
        backgroundColor: "#fff",
        alignSelf: "stretch",
        marginVertical: 4,
        paddingLeft: 10
    },
    inputContainer: {
        marginTop: 3
    },
    label: {
        color: "grey"
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        marginTop: 20
    },
    validationError: {
        color: "red",
        fontSize: 10
    },
    imageContainer: {

        height: height * 0.4,
        width: "80%",
        alignItems: "center"
    },
    imageStyle: {
        resizeMode: "cover",
        height: "80%",
        width: "80%",
        resizeMode: "contain",
        margin: 10,
        borderRadius: 20
    },
    imageButtonContainer: {

        flexDirection: "row",
    },
    imageSelectText: {
        fontSize: 16,
        marginTop: 30,
        marginBottom: 15
    }
})

export default ProfileScreen;
