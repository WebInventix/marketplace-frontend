import React, { useState, useRef } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    Dimensions,
    Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

const VerificationScreen = ({ navigation, route }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const inputRefs = useRef([])

    // Get phone number from previous screen
    const phoneNumber = route?.params?.phoneNumber || '+92 XXX XXXXXXX'

    const handleOtpChange = (value, index) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value

        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e, index) => {
        // Handle backspace
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = () => {
        // const otpCode = otp.join('')

        // if (otpCode.length !== 6) {
        //     alert('Please enter complete verification code')
        //     return
        // }

        // setLoading(true)

        // API call yahan karoge
        // setTimeout(() => {
            // setLoading(false)
            // console.log('OTP:', otpCode)
            navigation.navigate('Profile')
        // }, 2000)
    }

    const handleResendCode = () => {
        console.log('Resend code clicked')
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
        // API call to resend OTP
    }

    const handleSendEmail = () => {
        navigation.navigate('email-Verification')
    }

    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={24} color="#1F2937" />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Account Verification</Text>
                    <Text style={styles.subtitle}>
                        We've sent a verification code to the number you provided, please enter the code below
                    </Text>
                </View>

                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={[
                                styles.otpBox,
                                digit && styles.otpBoxFilled
                            ]}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                {/* Resend Code Link */}
                <TouchableOpacity 
                    style={styles.resendContainer}
                    onPress={handleResendCode}
                    activeOpacity={0.7}
                >
                    <Text style={styles.resendText}>Re-send code</Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <CustomButton
                    title="Submit"
                    variant="primary"
                    onPress={handleSubmit}
                    loading={loading}
                    style={styles.submitButton}
                />

                {/* Email Option */}
                <View style={styles.emailContainer}>
                    <Text style={styles.emailText}>
                        Didn't receive the email? Check your spam filter{'\n'}
                        or try{' '}
                    </Text>
                    <TouchableOpacity 
                        onPress={handleSendEmail}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.emailLink}>another email address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 0 : 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: width < 375 ? 26 : 30,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpBox: {
        width: width < 375 ? 48 : 52,
        height: width < 375 ? 48 : 52,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1F2937',
    },
    otpBoxFilled: {
        borderColor: '#FECC07',
        backgroundColor: '#FFFFFF',
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    resendText: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    submitButton: {
        marginBottom: 24,
    },
    emailContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    emailText: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    emailLink: {
        fontSize: 13,
        color: '#004284',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
})

export default VerificationScreen