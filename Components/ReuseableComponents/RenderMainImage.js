import {
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import LazyloadImage from 'react-native-image-lazy-loading';
import { globalStyles } from '../../export';
import FastImage from 'react-native-fast-image';
import axios from 'axios';


export default function RenderMainImage({ item }) {

    // console.log("item =>",item.lead.images)

    const [frontMainImage, setFrontMainImage] = useState(item.lead.images.find(
        obj => obj.title === 'Front Main',
    ))
    // const frontMainImage = item.lead.images.find(
    //     obj => obj.title === 'Front Main',
    // );

    const [remainingTime, setRemainingTime] = useState(undefined);
    // const [timeLeftToStart, setTimeLeftToStart] = useState(0);


    // console.log(stamps)

    const calculateTimeLeft = (currentDate, startTime, endTime) => {
        const currentDateObj = new Date();
        // const startTimeObj = new Date(`${currentDate}T${startTime}`);
        const endTimeObj = new Date(`${currentDate}T${endTime}`);
        const currentTimestamp = currentDateObj.getTime();
         setRemainingTime(Math.floor((endTimeObj - currentTimestamp) / 1000));
    };

    useEffect(() => {
        calculateTimeLeft(item.start_date, item.start_time, item.end_time);
    }, [])
    useEffect(() => {
        if(remainingTime <= 0){
            callApi();
        }
        const timer = setInterval(() => {
            if (remainingTime >= 0) {
                setRemainingTime(prevTime => prevTime - 1);
            }
            else {
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [remainingTime]);

    const callApi =async() => {
        try {
             await axios.get('https://crm.unificars.com/api/winnerauction') 
          }
          catch (e) {
            console.log('error =>', e);
          }
    } 

    // console.log(' remaining time on image component =>   ',frontMainImage)
    return (
        <View>
            { remainingTime === undefined || remainingTime > 0?
                <FastImage
                    source={frontMainImage !== undefined || frontMainImage !== "" ? {uri:frontMainImage.image,priority:FastImage.priority.high}:null}
                    style={globalStyles.image}
                />
                :
                <ImageBackground
                    source={frontMainImage !== undefined || frontMainImage !== "" ?{
                        uri:  frontMainImage.image 
                    }:null}
                    style={globalStyles.image}
                    blurRadius={10}>
                    <View
                        style={[
                            {
                                width: '100%',
                                height: '100%',
                            },
                            globalStyles.flexBox,
                        ]}>
                        <View
                            style={[
                                [
                                    {
                                        backgroundColor: 'transparent',
                                        transform: [{ rotate: '0deg' }],
                                    },
                                ],
                            ]}>
                            <Text
                                style={[{ color: '#FFF', fontSize: 30, fontWeight: '800' }]}>
                                Auction
                            </Text>
                            <Text
                                style={[{ color: '#FFF', fontSize: 50, fontWeight: '800' }]}>
                                Over
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

            }
        </View>
    )
}

const styles = StyleSheet.create({})