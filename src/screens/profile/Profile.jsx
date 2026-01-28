import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    Platform,
    Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width } = Dimensions.get('window')

const CreateProfileScreen = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(null)
    const [shortBio, setShortBio] = useState('')
    const [expertise, setExpertise] = useState('')
    const [location, setLocation] = useState('')
    const [interests, setInterests] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Sample tags (aap API se bhi le sakte ho)
    const availableTags = [
        'Consulting',
        'Design',
        'Development',
        'Marketing',
        'Writing',
        'Teaching',
        'Photography',
        'Fitness'
    ]

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please allow access to your photos to upload a profile picture.'
            )
            return
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Square crop
            quality: 0.8,
        })

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri)
        }
    }

    const takePhoto = async () => {
        // Request camera permission
        const { status } = await ImagePicker.requestCameraPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please allow access to your camera to take a photo.'
            )
            return
        }

        // Open camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri)
        }
    }

    const showImageOptions = () => {
        Alert.alert(
            'Change Picture',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: takePhoto },
                { text: 'Choose from Library', onPress: pickImage },
                { text: 'Cancel', style: 'cancel' }
            ]
        )
    }

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const handleSubmit = () => {
        navigation.navigate('Profile-Completed')
    }

    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
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
                    <Text style={styles.title}>Create your profile</Text>
                    <Text style={styles.subtitle}>
                        Upload your photo and provide basic information.
                    </Text>
                </View>

                {/* Profile Picture */}
                <View style={styles.imageSection}>
                    <TouchableOpacity
                        style={styles.imageContainer}
                        onPress={showImageOptions}
                        activeOpacity={0.8}
                    >
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Ionicons name="person" size={60} color="#9CA3AF" />
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.changePictureButton}
                        onPress={showImageOptions}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.changePictureText}>Change Picture</Text>
                    </TouchableOpacity>
                    {errors.image && (
                        <Text style={styles.errorText}>{errors.image}</Text>
                    )}
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Short Bio */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Short Bio</Text>
                        <CustomInput
                            placeholder="Tell us about yourself (optional)"
                            value={shortBio}
                            onChangeText={(text) => {
                                setShortBio(text)
                                setErrors({ ...errors, shortBio: '' })
                            }}
                            multiline
                            numberOfLines={4}
                            style={styles.multilineInput}
                            error={errors.shortBio}
                        />
                    </View>

                    {/* Area of Expertise */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>What is your area of expertise?</Text>
                        <CustomInput
                            placeholder="What have you done for a living in the past and/or currently?"
                            value={expertise}
                            onChangeText={(text) => {
                                setExpertise(text)
                                setErrors({ ...errors, expertise: '' })
                            }}
                            multiline
                            numberOfLines={3}
                            style={styles.multilineInput}
                            error={errors.expertise}
                        />
                    </View>

                    {/* Location */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Your Location</Text>
                        <CustomInput
                            placeholder="Enter your location"
                            value={location}
                            onChangeText={(text) => {
                                setLocation(text)
                                setErrors({ ...errors, location: '' })
                            }}
                            error={errors.location}
                        />
                    </View>

                    {/* Interests */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Interests</Text>
                        <CustomInput
                            placeholder="e.g. tutoring, design, fitness"
                            value={interests}
                            onChangeText={setInterests}
                        />
                    </View>

                    {/* Tags */}
                    <View style={styles.tagsContainer}>
                        {availableTags.map((tag, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.tag,
                                    selectedTags.includes(tag) && styles.tagSelected
                                ]}
                                onPress={() => toggleTag(tag)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.tagText,
                                    selectedTags.includes(tag) && styles.tagTextSelected
                                ]}>
                                    {tag}
                                </Text>
                                {selectedTags.includes(tag) && (
                                    <Ionicons
                                        name="close-circle"
                                        size={16}
                                        color="#1F2937"
                                        style={styles.tagCloseIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                    {errors.tags && (
                        <Text style={styles.errorText}>{errors.tags}</Text>
                    )}

                    {/* Submit Button */}
                    <CustomButton
                        title="Complete Your Profile"
                        variant="primary"
                        onPress={handleSubmit}
                        loading={loading}
                        style={styles.submitButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
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
    imageSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 12,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePictureButton: {
        paddingVertical: 4,
    },
    changePictureText: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '600',
        // textDecorationLine: 'underline',
    },
    form: {
        flex: 1,
    },
    inputWrapper: {
        // marginBottom: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1F2937',
        // marginBottom: 8,
    },
    multilineInput: {
        height: 'auto',
        minHeight: 80,
        paddingTop: 12,
        textAlignVertical: 'top',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    tagSelected: {
        backgroundColor: '#FECC07',
        borderColor: '#FECC07',
    },
    tagText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    tagTextSelected: {
        color: '#1F2937',
    },
    tagCloseIcon: {
        marginLeft: 6,
    },
    errorText: {
        fontSize: 12,
        color: '#EF4444',
        marginTop: 4,
        textAlign: 'center',
    },
    submitButton: {
        marginTop: 8,
    },
})

export default CreateProfileScreen