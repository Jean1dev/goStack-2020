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
    OpenDatePickerText,
    Schedule,
    SectionContent,
    Section,
    SectionTitle,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentText
} from './styles'
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { Alert } from 'react-native';

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
    const { goBack, navigate } = useNavigation()
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [providers, setProviders] = useState<Provider[]>([])
    const [availability, setAvailability] = useState<AvailabilityProps[]>([])
    const [selectedHour, setSelectedHour] = useState(0)
    const { providerId } = route.params as RouteParams
    const [selectedProvider, setSelectedProvider] = useState(providerId)

    const backToHome = useCallback(() => goBack(), [goBack])

    const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
        setShowDatePicker(false)

        if (date) {
            setSelectedDate(date)
        }
    }, [])

    const handleSelectedHour = useCallback((hour: number) => setSelectedHour(hour), [])

    const save = useCallback(async () => {
        try {
            const date = new Date(selectedDate)
            date.setHours(selectedHour)
            date.setMinutes(0)

            await api.post('agendamentos', {
                provider_id: selectedProvider,
                date
            })
            navigate('appointmentCreated', { date: date.getTime() })
        } catch (error) {
            Alert.alert('Erro ao criar o agendamento', '')
        }
    }, [selectedProvider, navigate, selectedDate, selectedHour])

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

            <Schedule>
                <Title>Escolha o horario</Title>
                <Section>
                    <SectionTitle>Manha</SectionTitle>
                    <SectionContent horizontal>

                        {morningAvailability.map(({ hourFormated, available, hour }) => {
                            if (available) {
                                return (<Hour
                                    selected={selectedHour === hour}
                                    onPress={() => handleSelectedHour(hour)}
                                    key={hourFormated}>
                                    <HourText>{hourFormated}</HourText>
                                </Hour>)
                            } else {
                                return null
                            }
                        })}
                    </SectionContent>
                </Section>

                <Section>
                    <SectionTitle>Tarde</SectionTitle>
                    <SectionContent horizontal>

                        {affternonAvailability.map(({ hourFormated, available, hour }) => {
                            if (available) {
                                return (<Hour
                                    selected={selectedHour === hour}
                                    onPress={() => handleSelectedHour(hour)}
                                    key={hourFormated}>
                                    <HourText>{hourFormated}</HourText>
                                </Hour>)
                            } else {
                                return null
                            }
                        })}
                    </SectionContent>
                </Section>

                <CreateAppointmentButton onPress={save}>
                    <CreateAppointmentText>Agendar</CreateAppointmentText>
                </CreateAppointmentButton>
            </Schedule>
        </Container>
    )
}

export default CreateAppointment