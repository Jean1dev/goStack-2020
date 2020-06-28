import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderName,
    ProviderAvatar,
    Calendar,
    Title,
    OpenDatePicker,
    OpenDatePickerText
} from './styles'
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

interface RouteParams {
    providerId: string
}

export interface Provider {
    id: string
    name: string
    avatar_url: string
}

interface AvailabilityProps {
    hour: number
    available: boolean
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth()
    const route = useRoute()
    const { goBack } = useNavigation()
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [providers, setProviders] = useState<Provider[]>([])
    const [availability, setAvailability] = useState<AvailabilityProps[]>([])
    const { providerId } = route.params as RouteParams
    const [selectedProvider, setSelectedProvider] = useState(providerId)

    const backToHome = useCallback(() => goBack(), [goBack])

    const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
        setShowDatePicker(false)

        if (date) {
            setSelectedDate(date)
        }
    }, [])

    useEffect(() => {
        api.get('prestadores').then(response => {
            setProviders(response.data)
        })
    }, [])

    useEffect(() => {
        api.get('agendamentos/horas-disponiveis-dia', {
            params: {
                provider_id: selectedProvider,
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
                day: selectedDate.getDate()
            }
        }).then(response => setAvailability(response.data))

    }, [selectedDate, selectedProvider])

    const morningAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour < 12)
            .map(({ hour, available }) => ({
                hour,
                available,
                hourFormated: format(new Date().setHours(hour), 'HH:00')
            }))

    }, [availability])

    const affternonAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour >= 12)
            .map(({ hour, available }) => ({
                hour,
                available,
                hourFormated: format(new Date().setHours(hour), 'HH:00')
            }))

    }, [availability])

    return (
        <Container>
            <Header>
                <BackButton onPress={backToHome}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabelereiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <ProvidersListContainer>
                <ProvidersList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={providers}
                    keyExtractor={(provider: any) => provider.id}
                    renderItem={({ item: provider }: any) => (
                        <ProviderContainer
                            onPress={() => setSelectedProvider(provider.id)}
                            selected={provider.id === selectedProvider}
                        >
                            <ProviderAvatar source={{ uri: provider.avatar_url }} />
                            <ProviderName>{provider.name}</ProviderName>
                        </ProviderContainer>
                    )}
                ></ProvidersList>
            </ProvidersListContainer>

            <Calendar>
                <Title>Escolha a data</Title>
                <OpenDatePicker onPress={() => setShowDatePicker(true)} >
                    <OpenDatePickerText>Selecionar data</OpenDatePickerText>
                </OpenDatePicker>

                {showDatePicker && (<DateTimePicker
                    onChange={handleDateChanged}
                    textColor="#f4ede8"
                    display="calendar"
                    mode="date"
                    value={selectedDate} />)}
            </Calendar>

            {morningAvailability.map(({ hourFormated, available }) => (
                <Title>{hourFormated}</Title>
            ))}


            {affternonAvailability.map(({ hourFormated, available }) => (
                <Title>{hourFormated}</Title>
            ))}
        </Container>
    )
}

export default CreateAppointment