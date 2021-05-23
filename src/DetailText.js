import React from 'react'
import { Text } from "react-native"

const DetailText = (props) => {
    return (
        <Text style={{ fontSize: 16, color: "#000", margin: 3, marginLeft: 10 }}>
            {props.value}
        </Text>
    )
}

export default DetailText
