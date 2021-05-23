import React, { useEffect, useState, useContext } from 'react'
import { Button, Text, View, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';
import DetailText from "./DetailText"
const { width, height } = Dimensions.get('window');
import Colors from "./Utils/Colors"


const MainScreen = ({ navigation }) => {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('USERDETAILS')
            let a = jsonValue != null ? JSON.parse(jsonValue) : null;
            setUser({ ...a })
        } catch (e) {
            // error reading value
        }
    }


    let { container, ButtonContainer, detailsContainer, imageView, imageStyle } = styles;
    return (

        <SafeAreaView style={{
            flex: 1,
        }}>
            <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{
                    width: width,
                    height: height,
                }}
                showsVerticalScrollIndicator={false}>
                <View style={container}>
                    {(user !== null && Object.keys(user).length !== 0) &&
                        <View style={imageView}>
                            <Image style={imageStyle} source={{ uri: user.profilepic.uri }} />
                        </View>
                    }
                    {(user !== null && Object.keys(user).length !== 0) ?

                        <View style={detailsContainer}>

                            <DetailText value={user.name} />
                            <DetailText value={user.mobile} />
                            <DetailText value={user.state} />
                            <DetailText value={user.city} />
                            <DetailText value={user.pincode} />
                        </View> :
                        <View style={detailsContainer}>
                            <DetailText value="Go to profile to fill the details" />
                        </View>

                    }
                    <View style={ButtonContainer}>
                        <Button
                            onPress={() => navigation.navigate("Profile")}
                            title="go to Profile"
                            color="#116466"
                        />
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
        backgroundColor: Colors.secondaryColor
    },
    ButtonContainer: {
        marginVertical: 10
    },
    detailsContainer: {
        backgroundColor: "#ffffff",
        elevation: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: "90%"
    },
    imageView: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    imageStyle: {
        height: height * 0.3,
        width: width * 0.9,
        resizeMode: "contain",
        margin: 10,
        borderRadius: 20,
    },

})


export default MainScreen
