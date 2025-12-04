import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(99, 102, 241, 0.1)',
          elevation: 8,
          shadowColor: '#6366f1',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 12,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 4,
          shadowColor: '#6366f1',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: '#1e293b',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="position"
        options={{
          title: 'Position',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="funds"
        options={{
          title: 'Funds',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="currency-inr" size={size} color={color} />

          ),
        }}
      />

      <Tabs.Screen
        name="ipoorderbook"
        options={{
          title: 'IPO Order Book',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
