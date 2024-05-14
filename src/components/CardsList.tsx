import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useSharedValue, withDecay } from 'react-native-reanimated';
import Card from './Card';

const cards = [
    require("../../assets/cards/Card 1.png"),
    require("../../assets/cards/Card 2.png"),
    require("../../assets/cards/Card 3.png"),
    require("../../assets/cards/Card 4.png"),
    require("../../assets/cards/Card 5.png"),
    require("../../assets/cards/Card 6.png"),
    require("../../assets/cards/Card 7.png"),
    require("../../assets/cards/Card 8.png"),
    require("../../assets/cards/Card 9.png"),
];

const CardsList = () =>
{
    const scrollY = useSharedValue(0);
    const pan = Gesture.Pan().
        onBegin(() =>
        {
            cancelAnimation(scrollY);
        }).
        onStart(() => { console.log("pan starting"); }).
        onChange((event) =>
        {
            scrollY.value = scrollY.value - event.changeY;

        }).
        onEnd((event) =>
        {
            console.log("pan ending");
            scrollY.value = withDecay({ velocity: -event.velocityY });
        });

    return (
        <GestureDetector gesture={pan}>

            <View style={{ padding: 10 }}>
                {cards.map((card, index) =>
                    <Card card={card} index={index} scrollY={scrollY} />
                )}
            </View>
        </GestureDetector>
    );
};

export default CardsList;

const styles = StyleSheet.create({});