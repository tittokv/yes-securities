import { PositionCard } from '@/components/position/PositionCard';
import { SummaryCard } from '@/components/ui/SummaryCard';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { Position, PositionTab } from '@/types/position';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 64;

const OVERALL_POSITIONS: Position[] = [
    { id: '1', symbol: 'RELIANCE', quantity: 50, buyPrice: 2450.50, currentPrice: 2520.75, pnl: 3512.50, pnlPercent: 2.87 },
    { id: '2', symbol: 'TCS', quantity: 30, buyPrice: 3650.00, currentPrice: 3580.25, pnl: -2092.50, pnlPercent: -1.91 },
    { id: '3', symbol: 'INFY', quantity: 100, buyPrice: 1450.75, currentPrice: 1485.50, pnl: 3475.00, pnlPercent: 2.40 },
    { id: '4', symbol: 'HDFC BANK', quantity: 25, buyPrice: 1620.00, currentPrice: 1598.50, pnl: -537.50, pnlPercent: -1.33 },
];

const TODAY_POSITIONS: Position[] = [
    { id: 't1', symbol: 'NIFTY FUT', quantity: 75, buyPrice: 21450.00, currentPrice: 21520.50, pnl: 5287.50, pnlPercent: 0.33 },
    { id: 't2', symbol: 'BANKNIFTY FUT', quantity: 40, buyPrice: 45200.00, currentPrice: 45050.75, pnl: -5970.00, pnlPercent: -0.33 },
];

export default function PositionScreen() {
    const [activeTab, setActiveTab] = useState<PositionTab>('overall');
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const positions = activeTab === 'overall' ? OVERALL_POSITIONS : TODAY_POSITIONS;
    const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0);

    const scrollToCard = (index: number) => {
        scrollViewRef.current?.scrollTo({ x: index * (CARD_WIDTH + 16), animated: true });
        setCurrentCardIndex(index);
    };

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + 16));
        setCurrentCardIndex(index);
    };

    return (
        <LinearGradient colors={GradientColors.background} style={styles.container}>
            <View style={styles.tabContainer}>
                <TabButton
                    label="Overall"
                    isActive={activeTab === 'overall'}
                    onPress={() => { setActiveTab('overall'); setCurrentCardIndex(0); }}
                />
                <TabButton
                    label="Today"
                    isActive={activeTab === 'today'}
                    onPress={() => { setActiveTab('today'); setCurrentCardIndex(0); }}
                />
            </View>

            <SummaryCard>
                <View style={styles.summaryRow}>
                    <SummaryItem label="Total Positions" value={positions.length.toString()} />
                    <View style={styles.summaryDivider} />
                    <SummaryItem
                        label="Total P&L"
                        value={`${totalPnL >= 0 ? '+' : ''}₹ ${totalPnL.toFixed(2)}`}
                        valueColor={totalPnL >= 0 ? Colors.success : Colors.error}
                    />
                </View>
            </SummaryCard>

            {positions.length > 1 && (
                <View style={styles.controlsContainer}>
                    <ControlButton
                        icon="chevron-back"
                        onPress={() => currentCardIndex > 0 && scrollToCard(currentCardIndex - 1)}
                        disabled={currentCardIndex === 0}
                    />
                    <View style={styles.indicatorContainer}>
                        {positions.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.indicator, index === currentCardIndex && styles.activeIndicator]}
                            />
                        ))}
                    </View>
                    <ControlButton
                        icon="chevron-forward"
                        onPress={() => currentCardIndex < positions.length - 1 && scrollToCard(currentCardIndex + 1)}
                        disabled={currentCardIndex === positions.length - 1}
                    />
                </View>
            )}

            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
            >
                {positions.map((position) => (
                    <View key={position.id} style={{ width: CARD_WIDTH }}>
                        <PositionCard position={position} />
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
}

function TabButton({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
    return (
        <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
            {isActive ? (
                <LinearGradient
                    colors={GradientColors.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.activeTabGradient}
                >
                    <Text style={styles.activeTabText}>{label}</Text>
                </LinearGradient>
            ) : (
                <Text style={styles.tabText}>{label}</Text>
            )}
        </TouchableOpacity>
    );
}

function SummaryItem({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
    return (
        <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={[styles.summaryValue, valueColor && { color: valueColor }]}>{value}</Text>
        </View>
    );
}

function ControlButton({ icon, onPress, disabled }: { icon: string; onPress: () => void; disabled: boolean }) {
    return (
        <TouchableOpacity
            style={[styles.controlButton, disabled && styles.controlButtonDisabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Ionicons name={icon as any} size={24} color={disabled ? Colors.text.light : Colors.primary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        marginBottom: Spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: BorderRadius.lg,
        padding: 4,
        gap: Spacing.sm,
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    activeTab: {
        overflow: 'hidden',
    },
    activeTabGradient: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing['2xl'],
        borderRadius: BorderRadius.md,
        width: '100%',
        alignItems: 'center',
    },
    tabText: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.semibold,
        color: Colors.text.secondary,
    },
    activeTabText: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.white,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    summaryLabel: {
        fontSize: FontSizes.sm,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: FontWeights.semibold,
        marginBottom: 6,
    },
    summaryValue: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.white,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    controlButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        ...{ shadowColor: Colors.primary, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3 },
    },
    controlButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorContainer: {
        flexDirection: 'row',
        gap: 6,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
    },
    activeIndicator: {
        backgroundColor: Colors.primary,
        width: 24,
    },
    cardsContainer: {
        paddingHorizontal: Spacing.lg,
        gap: Spacing.lg,
    },
});
