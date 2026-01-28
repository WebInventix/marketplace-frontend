import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'

const CustomButton = ({ 
    title, 
    onPress, 
    variant = 'primary', // 'primary' or 'secondary'
    loading = false,
    disabled = false,
    style 
}) => {
    const isPrimary = variant === 'primary'
    
    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
                disabled && styles.disabledButton,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator 
                    color={isPrimary ? '#000000' : '#FFFFFF'} 
                    size="small"
                />
            ) : (
                <Text style={[
                    styles.buttonText,
                    isPrimary ? styles.primaryText : styles.secondaryText
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 56,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    primaryButton: {
        backgroundColor: '#FECC07',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    primaryText: {
        color: '#000000',
    },
    secondaryText: {
        color: '#FFFFFF',
    },
})

export default CustomButton