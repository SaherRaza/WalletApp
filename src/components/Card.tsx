import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { clamp, useAnimatedReaction, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function Card({ card, scrollY, index, activeCardIndex })
{
    const [cardHeight, setCardHeight] = useState(0);

    const translateY = useSharedValue(0);
    useAnimatedReaction(
        () => scrollY.value,
        (current, previous) =>
        {
            translateY.value = clamp(- current, -index * cardHeight * 0.97, 0);
        }
    );
    // const translateY = useDerivedValue(() => clamp(-scrollY.value, -index * cardHeight * 0.97, 0));
    // because derived values cannot be updated/changed
    const tap = Gesture.Tap().onEnd(() =>
    {
        activeCardIndex.value = index;
        //  console.warn(index);
    });


    return (
        <GestureDetector gesture={tap}>

            <Animated.Image
                onLayout={(event) => setCardHeight(event.nativeEvent.layout.height + 10)}
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
        </GestureDetector>
    );
}

const styles = StyleSheet.create({});