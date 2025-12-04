import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/typography';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
  filterIcon?: keyof typeof Ionicons.glyphMap;
};

export function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  onFilterPress,
  showFilter = true,
  filterIcon = 'options-outline'
}: Props) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInnerContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.text.secondary}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={placeholder}
          style={styles.searchInput}
          placeholderTextColor={Colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      {/* {showFilter && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <LinearGradient
            colors={GradientColors.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.filterGradient}
          >
            <Ionicons name={filterIcon} size={20} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
   
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: FontWeights.medium,
  },
  filterButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  filterGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});