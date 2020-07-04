import React, { useRef, useCallback } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput
} from 'react-native'
import {
    Container,
    Title,
    UserAvatarButton,
    UserAvatar,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api'
import { useAuth } from '../../hooks/AuthContext';
import ImagePicker from 'react-native-image-picker';

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth()
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const confirmationPasswordInputRef = useRef<TextInput>(null)

    const changeAvatar = useCallback(() => {
        ImagePicker.showImagePicker({
            title: 'Selecione um avatar',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Tire uma foto',
            chooseWhichLibraryTitle: 'Escolher uma da galeria'
        }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                const data = new FormData()

                data.append('avatar', {
                    type: 'image/jpeg',
                    uri: source.uri,
                    name: `${user.id}.jpg`
                })

                api.patch('/usuarios/avatar', data).then(apiResponse => {
                    updateUser(apiResponse.data)
                })
            }
        })
    }, [updateUser, user.id])

    const handleSubmit = useCallback(async (data: object): Promise<void> => {
        navigation.goBack()
    }, [navigation])

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    keyboardShouldPersistTaps="handled">
                    <Container>
                        <Title>Meu perfil</Title>
                        <UserAvatarButton onPress={changeAvatar}>
                            <UserAvatar source={{ uri: user.avatar_url }} />
                        </UserAvatarButton>

                        <Form ref={formRef} onSubmit={handleSubmit}>

                            <Input
                                onSubmitEditing={() => emailInputRef.current?.focus()}
                                returnKeyType="next"
                                autoCapitalize="words"
                                autoCorrect={false}
                                name="name"
                                icon="user"
                                placeholder="nome" />
                            <Input
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                returnKeyType="next"
                                ref={emailInputRef}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="email" />
                            <Input
                                ref={passwordInputRef}
                                onSubmitEditing={() => {
                                    confirmationPasswordInputRef.current?.focus()
                                }}
                                returnKeyType="next"
                                secureTextEntry
                                name="password"
                                icon="lock"
                                textContentType="newPassword"
                                placeholder="senha" />

                            <Input
                                ref={confirmationPasswordInputRef}
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                                returnKeyType="send"
                                secureTextEntry
                                name="password_confirmation"
                                icon="lock"
                                textContentType="newPassword"
                                placeholder="confirmacao de senha" />

                            <Button onPress={() => {
                                formRef.current?.submitForm()
                            }}>Alterar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Profile
