import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useSharedValue, withDecay, clamp, withClamp } from 'react-native-reanimated';
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
    const [listHeight, setListHeight] = useState(0);

    const activeCardIndex = useSharedValue(null);

    const { height: screenHeight } = useWindowDimensions();
    const maxScrollY = listHeight - screenHeight + 100;

    const scrollY = useSharedValue(0);
    const pan = Gesture.Pan().
        onBegin(() =>
        {
            cancelAnimation(scrollY);
        }).
        onStart(() => { console.log("pan starting"); }).
        onChange((event) =>
        {
            scrollY.value = clamp(scrollY.value - event.changeY, 0, maxScrollY);

        }).
        onEnd((event) =>
        {
            console.log("pan ending");
            scrollY.value = withClamp({ min: 0, max: maxScrollY }, withDecay({ velocity: -event.velocityY }));
        });

    return (
        <GestureDetector gesture={pan}>

            <View style={{ padding: 10 }}
                onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}>
                {cards.map((card, index) =>
                    <Card activeCardIndex={activeCardIndex}
                        index={index} key={index} card={card} scrollY={scrollY} />
                )}
            </View>
        </GestureDetector>
    );
};

export default CardsList;

const styles = StyleSheet.create({});