import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from '@/components/ui/SearchBar';

// Types
interface StockValue {
  current: number;
  prev: number;
}

interface StockData {
  nifty50: StockValue;
  sensex: StockValue;
  niftyBank: StockValue;
}

// Constants
const COLORS = {
  positive: '#10b981',
  negative: '#ef4444',
  primary: '#347ab6',
  primaryLight: '#5ba3d0',
  disabled: '#94a3b8',
  disabledDark: '#64748b',
  background: '#f1f5f9',
  text: '#1e293b',
  textLight: '#64748b',
  white: '#ffffff',
  warning: '#f59e0b',
};

export default function SplashScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const buttonScale = useSharedValue(1);
  const inputScale = useSharedValue(1);

  const [stockData, setStockData] = useState<StockData>({
    nifty50: { current: 26070.70, prev: 26070.70 },
    sensex: { current: 85387.97, prev: 85387.97 },
    niftyBank: { current: 59537.10, prev: 59537.10 },
  });

  const isButtonEnabled = userId.trim().length > 8;


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

  //  client ID as user types 
  const formatClientId = (text: string): string => {
    const cleaned = text.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join('-') : cleaned;
  };

  // text change with formatting and animation
  const handleTextChange = (text: string) => {
    const formatted = formatClientId(text);
    setUserId(formatted);

    // Subtle  animation scale 
    inputScale.value = withSequence(
      withSpring(1.02, { damping: 20 }),
      withSpring(1, { damping: 20 })
    );
  };

  // Handle submit
  const handleSubmit = () => {
    if (userId.trim()) {
      Keyboard.dismiss();
      router.push('/(tabs)');
    }
  };


  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: inputScale.value }],
  }));

  // Helper functions
  const format = (n: number) => n.toFixed(2);

  const getColor = (current: number, prev: number) => {
    return current >= prev ? COLORS.positive : COLORS.negative;
  };

  const getArrow = (current: number, prev: number) => {
    return current >= prev ? '▲' : '▼';
  };

  // Dynamic validation color and hinyt
  const validationHint = useMemo(() => {
    const length = userId.replace(/-/g, '').length;
    if (length > 12) return { text: ' Client IDs are usually 8-12 characters', color: COLORS.warning };
    return { text: '', color: COLORS.positive };
  }, [userId]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Market Banner */}
        <Animated.View entering={FadeInUp.delay(100).springify()}>
          <Image
            source={require('@/assets/images/stock_image.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />

          {/* Stock Tickers */}
        </Animated.View>

        {/* Header */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.header}>
          <Image
            source={require('@/assets/images/logoyes.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>


        <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.formContainer}>

          <Animated.View style={inputAnimatedStyle}>
            <SearchBar
              placeholder="Enter Client ID"
              value={userId}
              onChangeText={handleTextChange}
              showFilter={false}
            />

            <Animated.View entering={FadeIn}>
              <Text style={[styles.hintText, { color: validationHint.color }]}>
                {validationHint.text}
              </Text>
            </Animated.View>
          </Animated.View>

          {/* Submit Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <Pressable
              style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
              onPress={handleSubmit}
              onPressIn={() => {
                buttonScale.value = withSpring(0.95);
              }}
              onPressOut={() => {
                buttonScale.value = withSpring(1);
              }}
              disabled={!isButtonEnabled}
            >
              <LinearGradient
                colors={isButtonEnabled ? [COLORS.primary, COLORS.primaryLight] : [COLORS.disabled, COLORS.disabledDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}

              >
                <Text style={styles.buttonText}>SUBMIT</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>

        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

// Stock Card Component
interface StockCardProps {
  title: string;
  data: StockValue;
  style: any;
  delay: number;
  format: (n: number) => string;
  getColor: (current: number, prev: number) => string;
  getArrow: (current: number, prev: number) => string;
}

const StockCard: React.FC<StockCardProps> = ({
  title,
  data,
  style,
  delay,
  format,
  getColor,
  getArrow
}) => {
  const scale = useSharedValue(1);

  //  animation when value changes
  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.05, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );
  }, [data.current]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[style, animatedStyle]}
      entering={FadeInDown.delay(delay).springify()}
    >
      <Text style={styles.stockTitle}>{title}</Text>
      <Text
        style={[
          styles.stockValue,
          { color: getColor(data.current, data.prev) }
        ]}
      >
        {getArrow(data.current, data.prev)} ₹{format(data.current)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center'
  },

  heroImage: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
  },

  logoImage: {
    width: '60%',
    alignSelf: 'center',
  },

  stockCard: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    left: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginTop: 2,
  },

  header: {
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: '500'
  },

  formContainer: {
    gap: 16,
    marginTop: 20
  },

  hintText: {
    fontSize: 13,
    marginTop: 8,
    marginLeft: 4,
    fontWeight: '500',
  },

  button: {
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 10, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },

  buttonDisabled: {
    shadowOpacity: 0.1,
    elevation: 2
  },

  buttonGradient: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.white,
  },

  helpButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  helpText: {
    fontSize: 14,
    color: COLORS.textLight,
    textDecorationLine: 'underline',
  },
});