import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  Dimensions,
} from "react-native";

const TRACK_LENGTH = Dimensions.get("window").width * 0.8; // Width of the track
const SLIDER_SIZE = 50; // Size of the slider
const END_THRESHOLD = TRACK_LENGTH - SLIDER_SIZE; // Threshold to complete swipe

export default function SwipeToUnlock() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [completed, setCompleted] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Check if the current movement exceeds the track length
      if (gestureState.dx < END_THRESHOLD) {
        // If it does not, allow the slider to move
        pan.setValue({ x: gestureState.dx, y: 0 });
      } else {
        // If it does, restrict the slider to the end of the track
        pan.setValue({ x: END_THRESHOLD, y: 0 });
        if (!completed) {
          setCompleted(true);
          console.log("Action Triggered!");
          // Additional action can be triggered here
        }
      }
    },
    onPanResponderRelease: () => {
      // If the swipe was not completed, reset the slider position
      if (!completed) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.slider,
            {
              transform: [
                {
                  // Bind the translation to the animated value
                  translateX: pan.x.interpolate({
                    inputRange: [0, END_THRESHOLD],
                    outputRange: [0, END_THRESHOLD],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      {completed && <Text style={styles.unlockText}>Unlocked!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    width: TRACK_LENGTH,
    height: SLIDER_SIZE,
    backgroundColor: "#ddd",
    borderRadius: SLIDER_SIZE / 2,
    justifyContent: "center",
    overflow: "hidden", // Ensure the slider does not visually exceed the track
  },
  slider: {
    width: SLIDER_SIZE,
    height: SLIDER_SIZE,
    borderRadius: SLIDER_SIZE / 2,
    backgroundColor: "#007bff",
  },
  unlockText: {
    marginTop: 20,
    fontSize: 24,
    color: "green",
  },
});
