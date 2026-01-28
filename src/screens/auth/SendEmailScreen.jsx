import React, { useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width } = Dimensions.get('window')

const SendEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = () => {
        // Validation
        // if (!email.trim()) {
        //     setError('Email is required')
        //     return
        // }

        // if (!/\S+@\S+\.\S+/.test(email)) {
        //     setError('Invalid email address')
        //     return
        // }

        // // Clear error
        // setError('')
        // setLoading(true)

        // API call yahan karoge
        // setTimeout(() => {
            // setLoading(false)
            // console.log('Email:', email)
            // Go back to verification screen
            navigation.navigate("Login")
            // navigation.goBack()
        // }, 2000)
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
                    <Text style={styles.title}>Send An Email?</Text>
                    <Text style={styles.subtitle}>
                        It seems like you did not receive the code. Please enter an email address, and we will send the verification code again
                    </Text>
                </View>

                {/* Email Input */}
                <View style={styles.form}>
                    <CustomInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                            setError('')
                        }}
                        keyboardType="email-address"
                        icon="mail-outline"
                        error={error}
                    />

                    {/* Submit Button */}
                    <CustomButton
                        title="Submit"
                        variant="primary"
                        onPress={handleSubmit}
                        loading={loading}
                        style={styles.submitButton}
                    />
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
    form: {
        flex: 1,
    },
    submitButton: {
        marginTop: 8,
    },
})

export default SendEmailScreen