import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { useDerivedValue } from 'react-native-reanimated';

export default function Card({ index, card, scrollY })
{
    const translateY = useDerivedValue(() => -scrollY.value);
    return (
        <Animated.Image
            key={index}
            source={card}
            style={{
                width: '100%',
                height: undefined,
                aspectRatio: 7 / 4,
                marginVertical: 5,
                transform: [{
                    translateY: translateY
                }]
            }}
        />
    );
}

const styles = StyleSheet.create({});