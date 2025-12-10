import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, GradientColors } from '@/constants/colors';
import { Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/typography';

interface DropdownOption {
    id: string;
    label: string;
}

interface DropdownProps {
    label: string;
    options: DropdownOption[];
    selectedId?: string;
    onSelect: (id: string) => void;
    placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    label,
    options,
    selectedId,
    onSelect,
    placeholder = 'Select',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(opt => opt.id === selectedId);

    const handleSelect = (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onSelect(id);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            {/* Dropdown Trigger */}
            <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={toggleDropdown}
                activeOpacity={0.7}
            >
                <Text style={styles.dropdownText}>
                    {selectedOption?.label || placeholder}
                </Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={Colors.text.secondary}
                />
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.optionItem,
                                            item.id === selectedId && styles.selectedOption,
                                        ]}
                                        onPress={() => handleSelect(item.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                item.id === selectedId && styles.selectedOptionText,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                        {item.id === selectedId && (
                                            <Ionicons name="checkmark" size={20} color={Colors.primary} />
                                        )}
                                    </TouchableOpacity>
                                )}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.semibold,
        color: Colors.text.primary,
        marginBottom: Spacing.sm,
    },
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background.gradient1,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: Colors.border.medium,
    },
    dropdownText: {
        fontSize: FontSizes.md,
        color: Colors.text.secondary,
        fontWeight: FontWeights.medium,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        maxHeight: '60%',
    },
    dropdownList: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        backgroundColor: Colors.white,
    },
    selectedOption: {
        backgroundColor: `${Colors.primary}10`,
    },
    optionText: {
        fontSize: FontSizes.md,
        color: Colors.text.primary,
        fontWeight: FontWeights.medium,
    },
    selectedOptionText: {
        color: Colors.primary,
        fontWeight: FontWeights.bold,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border.light,
    },
});
