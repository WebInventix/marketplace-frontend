import React, { useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    Image
} from 'react-native'

const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'

const SuccessScreen = ({ navigation, route }) => {
    // Get custom message if passed (optional)
    // const message = route?.params?.message || 'Your account is ready to use. You will be redirected to the home screen in a few seconds.'

    useEffect(() => {
        // Auto redirect after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('Home')
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/profileComplete.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Congratulations</Text>

                {/* Message */}
                <Text style={styles.message}>Your account is ready to use. You will be redirected to the home screen in a few seconds.</Text>
                {/* <Text style={styles.message}>{message}</Text> */}
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    imageContainer: {
        marginBottom: 40,
    },
    image: {
        width: 160,
        height: 160,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
})

export default SuccessScreen