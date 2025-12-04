import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SearchBar } from '@/components/ui/SearchBar';

export default function SplashScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (userId.trim()) {
      router.push('/(tabs)');
    }
  };

  const isButtonEnabled = userId.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.header}>
          <Text style={styles.title}>YES Securities</Text>
          <Text style={styles.subtitle}>Smart Investing Made Simple</Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.formContainer}>
          {/* Search Input */}
          <View style={styles.inputWrapper}>
            <SearchBar
              placeholder="Search for Client ID"
              value={userId}
              onChangeText={setUserId}
            />

          </View>

          {/* Submit Button with Gradient */}
          <TouchableOpacity
            style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.8}
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
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  formContainer: {
    gap: 20,
  },
  inputWrapper: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    borderColor: '#347ab6',
    shadowColor: '#347ab6',
    shadowOpacity: 0.15,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    height: '100%',
    fontWeight: '500',
  },
  button: {
    borderRadius: 12,
    shadowColor: '#347ab6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  buttonGradient: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
