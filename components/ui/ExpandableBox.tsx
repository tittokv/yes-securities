import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation on Android (not used now but ok to keep)
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface RowItem {
  label: string;
  value: string | number;
}

interface ExpandableBoxProps {
  title: string;
  value: string | number;
  rows: RowItem[];
}

export function ExpandableBox({ title, value, rows }: ExpandableBoxProps) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  // 0 = collapsed, 1 = expanded
  const anim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(anim, {
      toValue,
      duration: 260,
      useNativeDriver: false, // height cannot use native driver
    }).start();
  };

  const chevronRotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const headerColor = expanded ? '#2563EB' : '#111827'; // blue when expanded

  // Animated styles for body wrapper
  const bodyAnimatedStyle = {
    // Before we know contentHeight:
    // - if collapsed -> height: 0 (hidden)
    // - if expanded  -> height: undefined (natural, so it can measure)
    height:
      contentHeight === 0
        ? expanded
          ? undefined
          : 0
        : anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight],
          }),
    opacity: contentHeight === 0 ? (expanded ? 1 : 0) : anim,
    overflow: 'hidden' as const,
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: headerColor }]}>
          {title}
        </Text>

        <View style={styles.headerRight}>
          <Text style={[styles.headerValue, { color: headerColor }]}>
            ₹{value}
          </Text>
          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <Ionicons
              name="chevron-down-outline"
              size={18}
              style={styles.chevron}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* BODY (animated wrapper) */}
      <Animated.View style={bodyAnimatedStyle}>
        {/* Inner content measured once to know its full height */}
        <View
          style={styles.body}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h > 0 && h !== contentHeight) {
              setContentHeight(h);
            }
          }}
        >
          {rows.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowValue}>₹{item.value}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerValue: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  chevron: {
    marginLeft: 6,
    color: '#6B7280',
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
