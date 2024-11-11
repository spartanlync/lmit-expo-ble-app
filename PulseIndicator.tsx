import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { View, Button, StyleSheet } from 'react-native';
import React from 'react';


export function PulseIndicator() {
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const OFFSET = 20;
  const TIME = 250;
  const DELAY = 400;

  const handlePress = () => {
    // highlight-next-line
    offset.value = withDelay(
      // highlight-next-line
      DELAY,
      withSequence(
        // start from -OFFSET
        withTiming(-OFFSET, { duration: TIME / 2 }),
        // shake between -OFFSET and OFFSET 5 times
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
        // go back to 0 at the end
        withTiming(0, { duration: TIME / 2 })
      )
      // highlight-next-line
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, style]} />
      <Button title="shake Button" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    margin: 50,
    borderRadius: 90,
    marginTop: 200,
    backgroundColor: '#b58df1',
  },
});
