import React, { useEffect, useRef, useState } from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Animated, 
    Dimensions,
    StatusBar 
} from 'react-native'

const { width, height } = Dimensions.get('window')

const StartupScreen = ({ navigation }) => {
    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.5)).current
    const progressAnim = useRef(new Animated.Value(0)).current
    const loadingTextAnim = useRef(new Animated.Value(0)).current

    // Loading text animation
    const [loadingDots, setLoadingDots] = useState('')

    useEffect(() => {
        // Status bar ko hidden kar do (optional)
        StatusBar.setHidden(true)

        // Logo fade in animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start()

        // Progress bar animation
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 4500,
            useNativeDriver: false,
        }).start()

        // Loading text animation (pulsing effect)
        Animated.loop(
            Animated.sequence([
                Animated.timing(loadingTextAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(loadingTextAnim, {
                    toValue: 0.5,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start()

        // Loading dots animation
        const dotsInterval = setInterval(() => {
            setLoadingDots(prev => {
                if (prev === '...') return ''
                return prev + '.'
            })
        }, 500)

        // Auto redirect after 5 seconds
        const timer = setTimeout(() => {
            StatusBar.setHidden(false) // Status bar wapas show karo
            navigation.navigate('Startup-Screen') 
        }, 10000)

        return () => {
            clearTimeout(timer)
            clearInterval(dotsInterval)
            StatusBar.setHidden(false)
        }
    }, [])

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    })

    return (
        <View style={styles.container}>
            {/* Logo with Animation */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {/* <Text style={styles.appName}>HumanSource</Text> */}
            </Animated.View>

            {/* Loading Text with Animation */}
            <Animated.View
                style={[
                    styles.loadingContainer,
                    { opacity: loadingTextAnim },
                ]}
            >
                <Text style={styles.loadingText}>
                    Loading{loadingDots}
                </Text>
            </Animated.View>

            {/* Progress Bar at Bottom */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                    <Animated.View
                        style={[
                            styles.progressBarFill,
                            { width: progressWidth },
                        ]}
                    />
                </View>
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004284',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        // Shadow for Android
        elevation: 10,
    },
    appName: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 120,
    },
    loadingText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        letterSpacing: 1,
    },
    progressContainer: {
        position: 'absolute',
        bottom: 50,
        width: width * 0.6,
        alignItems: 'center',
    },
    progressBarBackground: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    versionText: {
        marginTop: 12,
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: 0.5,
    },
})

export default StartupScreen