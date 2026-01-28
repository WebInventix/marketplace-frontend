import React, { useState } from 'react'
import { 
    View, 
    TextInput, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Platform 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CustomInput = ({ 
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    icon,
    error,
    style
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View style={[styles.container, style]}>
            {/* Label */}
            {label && <Text style={styles.label}>{label}</Text>}

            {/* Input Container */}
            <View style={[
                styles.inputContainer,
                isFocused && styles.inputFocused,
                error && styles.inputError
            ]}>
                {/* Left Icon */}
                {icon && (
                    <Ionicons 
                        name={icon} 
                        size={20} 
                        color="#9CA3AF" 
                        style={styles.leftIcon}
                    />
                )}

                {/* Text Input */}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoCapitalize="none"
                />

                {/* Password Eye Icon */}
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                        activeOpacity={0.7}
                    >
                        <Ionicons 
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                            size={22} 
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Error Message */}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#E8E8E8',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    inputFocused: {
        borderColor: '#FECC07',
        backgroundColor: '#FFFFFF',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    leftIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#1F2937',
        paddingVertical: Platform.OS === 'ios' ? 16 : 8,
    },
    eyeIcon: {
        padding: 4,
        marginLeft: 8,
    },
    errorText: {
        fontSize: 12,
        color: '#EF4444',
        marginTop: 4,
        marginLeft: 4,
    },
})

export default CustomInput