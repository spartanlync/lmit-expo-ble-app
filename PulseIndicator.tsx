import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

interface PulseIndicatorProps {
  activityWatcher: string;
}

export function PulseIndicator({ activityWatcher }: PulseIndicatorProps) {
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const OFFSET = 20;
  const TIME = 250;
  const DELAY = 400;

  // Trigger the animation on component mount and each refresh by watching data
  useEffect(() => {
    offset.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, { duration: TIME / 2 }),
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
        withTiming(0, { duration: TIME / 2 })
      )
    );
  }, [activityWatcher]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, style]} />
      {/* <Button title="shake Button" onPress={handlePress} /> */}
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
