import React, { useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

const SignupScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSignup = () => {
        // Validation
        // let newErrors = {}

        // if (!fullName.trim()) {
        //     newErrors.fullName = 'Full name is required'
        // }

        // if (!phoneNumber.trim()) {
        //     newErrors.phoneNumber = 'Phone number is required'
        // } else if (phoneNumber.length < 10) {
        //     newErrors.phoneNumber = 'Invalid phone number'
        // }

        // if (!email.trim()) {
        //     newErrors.email = 'Email is required'
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     newErrors.email = 'Invalid email address'
        // }

        // if (!password.trim()) {
        //     newErrors.password = 'Password is required'
        // } else if (password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters'
        // }

        // if (!confirmPassword.trim()) {
        //     newErrors.confirmPassword = 'Please confirm your password'
        // } else if (password !== confirmPassword) {
        //     newErrors.confirmPassword = 'Passwords do not match'
        // }

        // if (!agreeToTerms) {
        //     newErrors.terms = 'You must agree to Terms of Service'
        // }

        // if (Object.keys(newErrors).length > 0) {
        //     setErrors(newErrors)
        //     return
        // }

        // // Clear errors
        // setErrors({})
        // setLoading(true)

        // API call yahan karoge
        // setTimeout(() => {
            // setLoading(false)
            // console.log('Signup:', { fullName, phoneNumber, email, password })
            navigation.navigate('Otp-Verification')
        // }, 2000)
    }

    const handleLogin = () => {
        navigation.navigate('Login')
    }

    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
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
                        <Text style={styles.title}>Create An Account</Text>
                        <Text style={styles.subtitle}>
                            Enter your information in order to create an account below
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Full Name Input */}
                        <CustomInput
                            label="Your Name"
                            placeholder="Enter your Full Name"
                            value={fullName}
                            onChangeText={(text) => {
                                setFullName(text)
                                setErrors({ ...errors, fullName: '' })
                            }}
                            icon="person-outline"
                            error={errors.fullName}
                        />

                        {/* Phone Number Input */}
                        <CustomInput
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChangeText={(text) => {
                                setPhoneNumber(text)
                                setErrors({ ...errors, phoneNumber: '' })
                            }}
                            keyboardType="phone-pad"
                            icon="call-outline"
                            error={errors.phoneNumber}
                        />

                        {/* Email Input */}
                        <CustomInput
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                                setErrors({ ...errors, email: '' })
                            }}
                            keyboardType="email-address"
                            icon="mail-outline"
                            error={errors.email}
                        />

                        {/* Password Input */}
                        <CustomInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                                setErrors({ ...errors, password: '' })
                            }}
                            secureTextEntry
                            icon="lock-closed-outline"
                            error={errors.password}
                        />

                        {/* Confirm Password Input */}
                        <CustomInput
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text)
                                setErrors({ ...errors, confirmPassword: '' })
                            }}
                            secureTextEntry
                            icon="lock-closed-outline"
                            error={errors.confirmPassword}
                        />

                        {/* Terms & Conditions Checkbox */}
                        <TouchableOpacity 
                            style={styles.checkboxContainer}
                            onPress={() => {
                                setAgreeToTerms(!agreeToTerms)
                                setErrors({ ...errors, terms: '' })
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.checkbox,
                                agreeToTerms && styles.checkboxChecked,
                                errors.terms && styles.checkboxError
                            ]}>
                                {agreeToTerms && (
                                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                )}
                            </View>
                            <Text style={styles.checkboxText}>
                                By signing up, you agree to the{' '}
                                <Text style={styles.linkText}>Terms of service</Text>
                                {' '}and{' '}
                                <Text style={styles.linkText}>Privacy policy</Text>.
                            </Text>
                        </TouchableOpacity>
                        {errors.terms && (
                            <Text style={styles.errorText}>{errors.terms}</Text>
                        )}

                        {/* Create Account Button */}
                        <CustomButton
                            title="Create an account"
                            variant="primary"
                            onPress={handleSignup}
                            loading={loading}
                            style={styles.signupButton}
                        />

                        {/* Login Link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>
                                Already have an account?{' '}
                            </Text>
                            <TouchableOpacity 
                                onPress={handleLogin}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.loginLink}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 0 : 16,
        paddingBottom: 24,
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
        marginBottom: 24,
    },
    title: {
        fontSize: width < 375 ? 26 : 30,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
    },
    form: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    checkboxError: {
        borderColor: '#EF4444',
    },
    checkboxText: {
        flex: 1,
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 20,
    },
    linkText: {
        color: '#004284',
        fontWeight: '600',
    },
    errorText: {
        fontSize: 12,
        color: '#EF4444',
        marginTop: -4,
        marginBottom: 12,
        marginLeft: 4,
    },
    signupButton: {
        marginTop: 16,
        // marginBottom: 24,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 8,
    },
    loginText: {
        fontSize: 14,
        color: '#6B7280',
    },
    loginLink: {
        fontSize: 14,
        color: '#004284',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
})

export default SignupScreen