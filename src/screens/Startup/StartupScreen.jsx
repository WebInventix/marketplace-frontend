import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    Dimensions,
    Platform,
    StatusBar
} from 'react-native'
import CustomButton from '../../components/CustomButton.jsx'

import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const WelcomeScreen = ({ navigation }) => {
    const handleLogin = () => {
        navigation.navigate('Login')
    }

    const handleSignup = () => {
        navigation.navigate('Signup')
    }

    return (
        <ImageBackground
            source={require('../../assets/images/welcom-bg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            {/* Dark Overlay for better text readability */}
            <View style={styles.overlay} />
            
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Header Text */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Welcome to Human Source</Text>
                        <Text style={styles.subtitle}>
                            Find the right service or offer your{'\n'}expertise — all in one place.
                        </Text>
                    </View>

                    {/* Buttons Container */}
                    <View style={styles.buttonsContainer}>
                        {/* Yellow Login Button */}
                        <CustomButton
                            title="Login"
                            variant="primary"
                            onPress={handleLogin}
                        />

                        {/* Outlined Create Account Button */}
                        <CustomButton
                            title="Create an account"
                            variant="secondary"
                            onPress={handleSignup}
                        />

                        {/* Terms Text */}
                        <Text style={styles.termsText}>
                            By continuing, you agree to our{' '}
                            <Text style={styles.termsLink}>Terms of Service</Text>
                            {' '}and{' '}
                            <Text style={styles.termsLink}>Privacy Policy</Text>.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0,)', // Dark overlay for text contrast
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    title: {
        // fontSize: width < 375 ? 28 : 32, // Responsive font size
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: width < 375 ? 36 : 40,
    },
    subtitle: {
        // fontSize: width < 375 ? 14 : 16,
        fontSize: 17,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 20,
        opacity: 0.95,
        paddingHorizontal: 8,
    },
    buttonsContainer: {
        width: '100%',
        paddingBottom: 30,
    },
    termsText: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 18,
        opacity: 0.9,
        paddingHorizontal: 20,
    },
    termsLink: {
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
})

export default WelcomeScreen