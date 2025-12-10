import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, Tab } from '@/components/ui/TabView';
import { ClientInformation } from '@/components/profile/ClientInformation';
import { BankAccountDetails } from '@/components/profile/BankAccountDetails';
import { NomineeDetails } from '@/components/profile/NomineeDetails';
import { GradientColors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

export default function ProfileDetailsScreen() {
    const router = useRouter();

    const tabs: Tab[] = [
        {
            key: 'ClientInformation',
            label: 'Client Info',
            content: <ClientInformation />,
        },
        {
            key: 'BankAccountDetails',
            label: 'Bank Details',
            content: <BankAccountDetails />,
        },
        {
            key: 'NomineeDetails',
            label: 'Nominee',
            content: <NomineeDetails />,
        },
    ];

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <LinearGradient colors={GradientColors.background} style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#347ab6" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Profile Details</Text>
                        <View style={styles.placeholder} />
                    </View>

                    {/* Tab Content */}
                    <View style={styles.tabWrapper}>
                        <TabView tabs={tabs} defaultTab="ClientInformation" />
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
    },
    placeholder: {
        width: 40,
    },
    tabWrapper: {
        flex: 1,
        paddingTop: Spacing.md,
    },
});

