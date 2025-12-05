import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from '@/components/ui/SearchBar';

export default function SplashScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState('');

  const [stockData, setStockData] = useState({
    nifty50: { current: 26070.70, prev: 26070.70 },
    sensex: { current: 85387.97, prev: 85387.97 },
    niftyBank: { current: 59537.10, prev: 59537.10 },
  });

  const isButtonEnabled = userId.trim().length > 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData((prev) => ({
        nifty50: {
          prev: prev.nifty50.current,
          current: prev.nifty50.current + (Math.random() * 20 - 10),
        },
        sensex: {
          prev: prev.sensex.current,
          current: prev.sensex.current + (Math.random() * 50 - 25),
        },
        niftyBank: {
          prev: prev.niftyBank.current,
          current: prev.niftyBank.current + (Math.random() * 100 - 50),
        },
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (userId.trim()) router.push('/(tabs)');
  };

  const format = (n: number) => n.toFixed(2);

  const getColor = (current: number, prev: number) => {
    return current >= prev ? '#10b981' : '#ef4444';
  };

  const getArrow = (current: number, prev: number) => {
    return current >= prev ? '▲' : '▼';
  };


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Responsive Market Banner */}
        <Animated.View entering={FadeInUp.delay(100).springify()}>
          <Image
            source={require('@/assets/images/market_banner.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />


          {/* Stock Tickers */}
          <Animated.View style={styles.stockCard} entering={FadeInDown.delay(200).springify()}>
            <Text style={styles.stockTitle}>NIFTY 50</Text>
            <Text
              style={[
                styles.stockValue,
                { color: getColor(stockData.nifty50.current, stockData.nifty50.prev) }
              ]}
            >
              {getArrow(stockData.nifty50.current, stockData.nifty50.prev)} ₹
              {format(stockData.nifty50.current)}
            </Text>

          </Animated.View>

          <Animated.View style={[styles.stockCard, styles.middleCard]} entering={FadeInDown.delay(300).springify()}>
            <Text style={styles.stockTitle}>BSE SENSEX</Text>
            <Text
              style={[
                styles.stockValue,
                { color: getColor(stockData.sensex.current, stockData.sensex.prev) }
              ]}
            >
              {getArrow(stockData.sensex.current, stockData.sensex.prev)} ₹
              {format(stockData.sensex.current)}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.stockCard, styles.bottomCard]} entering={FadeInDown.delay(400).springify()}>
            <Text style={styles.stockTitle}>NIFTY BANK</Text>
            <Text
              style={[
                styles.stockValue,
                { color: getColor(stockData.niftyBank.current, stockData.niftyBank.prev) }
              ]}
            >
              {getArrow(stockData.niftyBank.current, stockData.niftyBank.prev)} ₹
              {format(stockData.niftyBank.current)}
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Header */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.header}>
          <Text style={styles.title}>YES Securities</Text>
          <Text style={styles.subtitle}>Smart Investing Made Simple</Text>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.formContainer}>
          <SearchBar
            placeholder="Search for Client ID"
            value={userId}
            onChangeText={setUserId}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={!isButtonEnabled}
          >
            <LinearGradient
              colors={isButtonEnabled ? ['#347ab6', '#5ba3d0'] : ['#94a3b8', '#64748b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },

  heroImage: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
  },

  stockCard: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    position: 'absolute',
    top: 120,
    left: 20,
    elevation: 4,
  },
  middleCard: { top: 165, right: 20, left: undefined },
  bottomCard: { top: 210 },

  stockTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  stockValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4f46e5',
  },

  header: { alignItems: 'center', marginTop: 40 },
  title: { fontSize: 30, fontWeight: '700', color: '#1e293b', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#64748b', fontWeight: '500' },
  formContainer: { gap: 20, marginTop: 20 },

  button: {
    borderRadius: 12,
    shadowColor: '#347ab6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: { shadowOpacity: 0.1, elevation: 2 },

  buttonGradient: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
});
