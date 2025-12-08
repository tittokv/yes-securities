import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Animated, { FadeInLeft, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#347ab6',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: 'rgba(52, 122, 182, 0.1)',
            elevation: 8,
            shadowColor: '#347ab6',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: -4 },
            shadowRadius: 12,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#347ab6',
            elevation: 4,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '700',
            color: '#ffffff',
          },
          headerTintColor: '#ffffff',
          headerLeft: () => (
            <Pressable onPress={toggleDrawer} style={styles.menuButton}>
              <Ionicons name="menu" size={28} color="#ffffff" />
            </Pressable>
          ),
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
              <MaterialCommunityIcons name="currency-inr" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ipoorderbook"
          options={{
            title: 'Order Book',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>


      {drawerVisible && (
        <>

          <Animated.View
            entering={FadeIn.duration(200)}
            style={styles.backdrop}
          >
            <Pressable
              style={styles.backdropPress}
              onPress={toggleDrawer}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInLeft.duration(300).springify()}
            style={styles.drawer}
          >
            {/* Header */}
            <LinearGradient
              colors={['#347ab6', '#466cebff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.drawerHeader}
            >
              <View style={styles.headerContent}>
                <View style={styles.headerTop}>
                  <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                      <LinearGradient
                        colors={['#ffffff', '#e0f2fe']}
                        style={styles.avatar}
                      >
                        <Ionicons name="person" size={32} color="#347ab6" />
                      </LinearGradient>
                    </View>
                    <View>
                      <Text style={styles.userName}>Mashhood</Text>
                      <Text style={styles.userEmail}>mashhoodu@gmail.com</Text>
                    </View>
                  </View>
                  <Pressable onPress={toggleDrawer} style={styles.closeButton}>
                    <Ionicons name="close-circle" size={32} color="rgba(255, 255, 255, 0.9)" />
                  </Pressable>
                </View>
              </View>
            </LinearGradient>

            {/* Menu Items andn Icons */}
            <View style={styles.drawerItems}>
              <Text style={styles.sectionLabel}>MENU</Text>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  router.push('/nav_drawer_screens/watch_list_screen');
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="bookmark" size={22} color="#347ab6" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.drawerItemText}>Watchlist</Text>
                  <Text style={styles.drawerItemSubtext}>Track your favorites</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  router.push('/nav_drawer_screens/profile_details_screen');
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="person" size={22} color="#347ab6" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.drawerItemText}>Profile Details</Text>
                  <Text style={styles.drawerItemSubtext}>Manage your account</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  router.push('/nav_drawer_screens/reports_screen');
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="bar-chart" size={22} color="#347ab6" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.drawerItemText}>Reports</Text>
                  <Text style={styles.drawerItemSubtext}>View analytics</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>SETTINGS</Text>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  router.push('/nav_drawer_screens/preferences_screen');
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="settings" size={22} color="#347ab6" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.drawerItemText}>Preferences</Text>
                  <Text style={styles.drawerItemSubtext}>App settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  router.push('/nav_drawer_screens/logout_screen');
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="log-out" size={22} color="#347ab6" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.drawerItemText}>Logout</Text>
                  <Text style={styles.drawerItemSubtext}>Sign out of account</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Version 1.0.0</Text>
              <Text style={styles.footerSubtext}>© 2025 Nidhi Admin SDK</Text>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 998,
  },
  backdropPress: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 320,
    backgroundColor: '#ffffff',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 24,
  },
  drawerHeader: {
    paddingVertical: 100,
    paddingHorizontal: 20,

  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 8,
    marginTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 14,
    borderRadius: 16,
    marginBottom: 6,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  drawerItemSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
    marginHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },
});