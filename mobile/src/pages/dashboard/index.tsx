import React, { useCallback, useEffect, useState } from 'react';
import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
    ProvidersList,
    ProviderContainer,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
    ProviderAvatar
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather'

export interface Provider {
    id: string
    name: string
    avatar_url: string
}

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([])
    const { user } = useAuth()
    const { navigate } = useNavigation()

    useEffect(() => {
        api.get('prestadores').then(response => {
            setProviders(response.data)
        })
    }, [])

    const goToProfile = useCallback(() => navigate(`profile`), [navigate])

    const goToAppointment = useCallback((providerId: string) => {
        navigate('createAppointment', { providerId })
    }, [navigate])

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo,{"\n"}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={goToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url }} ></UserAvatar>
                </ProfileButton>
            </Header>
            <ProvidersList
                keyExtractor={(provider: any) => provider.id}
                renderItem={({ item: provider }: any) => (
                    <ProviderContainer onPress={() => goToAppointment(provider.id)}>
                        <ProviderAvatar source={{ uri: provider.avatar_url }} />
                        <ProviderInfo>
                            <ProviderName>{provider.name}</ProviderName>

                            <ProviderMeta>
                                <Icon name="calendar" size={24} color="#ff9000" />
                                <ProviderMetaText>Segunda a sexta</ProviderMetaText>
                            </ProviderMeta>

                            <ProviderMeta>
                                <Icon name="clock" size={24} color="#ff9000" />
                                <ProviderMetaText>8h as 18h</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
                data={providers} />
        </Container>
    )
}

export default Dashboard;