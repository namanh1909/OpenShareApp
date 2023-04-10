import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/reducers/authSlice'
import Svg, { Path, Circle, Rect, Mask, G } from 'react-native-svg';
import { Defs, LinearGradient, Stop } from 'react-native-svg';



const HomeScreen = () => {
    let x = 100
    let y = 100
    let width = 200
    let BarColor = '#4A90E2'


    const dispatch = useDispatch()
    function generateArc(percentage, radius) {
        if (percentage === 100) percentage = 99.999
        const a = percentage * 2 * Math.PI / 100 // angle (in radian) depends on percentage
        const r = radius // radius of the circle
        let rx = r,
            ry = r,
            xAxisRotation = 0,
            largeArcFlag = 1,
            sweepFlag = 1,
            x = r + r * Math.sin(a),
            y = r - r * Math.cos(a)
        if (percentage <= 50) {
            largeArcFlag = 0;
        } else {
            largeArcFlag = 1
        }

        return `A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
    }

    const CircularProgress = ({
        percentage = 40,
        blankColor = "#fff",
        donutColor = "#4A90E2",
        fillColor = "#fff",
        progressWidth = 30,
        size = 200,
        children
    }) => {
        let half = size / 2;
        return <View style={{ width: 210, height: 210 }}>
            <Svg width={size} height={size}>
                <Circle
                    cx={half}
                    cy={half}
                    r={half}
                    fill={blankColor}
                    stroke={'#F1F4F6'}
                    strokeWidth={2}
                />

                {/* <Circle cx={half} cy={half} r={half} fill={blankColor} /> */}
                {/* <Path
                    d={`M${half} ${half} L${half} 0 ${generateArc(percentage, half)} Z`}
                    fill={donutColor}
                /> */}
                {/* {<Circle cx={half} cy={half} r={progressWidth * 2.65} fill={fillColor} />} */}
                <Circle
                    cx={half}
                    cy={half}
                    r={half - 20}
                    fill={donutColor}
                    stroke={'#F1F4F6'}
                    strokeWidth={2}
                // strokeDashoffset={10}
                />
            </Svg>
            <View style={styles.textView}>
                {children}
            </View>
        </View>
    }
    console.log(generateArc(100, 30))
    return (
        <View style={{
            flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"
        }}>
            {/* <Svg height={200} width={200} testID="progress-circle">
                <Circle
                    cx="50%"
                    cy="50%"
                    r="80"
                    stroke="gray"
                    strokeWidth="1"
                    fill="#fff"

                />
                <Circle
                    cx="50%"
                    cy="50%"
                    r="60"
                    stroke="gray"
                    strokeWidth="1"
                    fill="transparent"
                // strokeDashoffset={1}
                // strokeLinecap={1}
                />
                <Circle
                    cx="50%"
                    cy="50%"
                    r="70"
                    stroke="blue"
                    strokeWidth="20"
                    fill="transparent"
                    strokeDasharray={[300]}
                    // strokeDashoffset={2 * Math.PI}
                    // strokeDashoffset={1}
                    // strokeLinecap={1}
                />


            </Svg> */}
            <CircularProgress percentage={50} children={<Text >90</Text>} />
            <TouchableOpacity onPress={() => {
                dispatch(logout())
            }}>
                <Text>log out</Text>
            </TouchableOpacity> 
            {/* <Svg height={200} width={200} testID="progress-circle">
                <Rect x="0" y="0" width="50" height="500" fill="#4A90E2" />
            </Svg> */}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    textView: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})