import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    Calendar,
    NextAppointment,
    Section,
    Appointment
} from './styles'
import logo from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi'
import { useAuth } from '../../hooks/AuthContext'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import api from '../../services/api'
import { isToday, format, parseISO, isAfter } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link } from 'react-router-dom'

interface MonthAvailabilityItem {
    day: number,
    available: boolean
}

interface AppointmentItem {
    id: string
    date: string
    hourFormatted: string
    user: {
        name: string
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
    const [appointments, setAppointments] = useState<AppointmentItem[]>([])
    const no_avatar = 'https://api.adorable.io/avatars/285/abott@adorable.png'

    const handleDateChanged = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day)
        }
    }, [])

    const handleMonthChanged = useCallback((month: Date) => {
        setCurrentMonth(month)
    }, [])

    const disabledDays = useMemo(() => {
        return monthAvailability
            .filter(month => month.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear()
                const month = currentMonth.getMonth()
                return new Date(year, month, monthDay.day)
            })

    }, [currentMonth, monthAvailability])

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR })
    }, [selectedDate])

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR
        })
    }, [selectedDate])

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12
        })
    }, [appointments])

    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12
        })
    }, [appointments])

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()))
    }, [appointments])

    useEffect(() => {
        api.get('/agendamentos/dias-disponiveis-mes', {
            params: {
                provider_id: user.id,
                month: currentMonth.getMonth() + 1,
                year: currentMonth.getFullYear()
            }
        }).then(response => {
            setMonthAvailability(response.data)
        })
    }, [currentMonth, user.id])

    useEffect(() => {
        api.get<AppointmentItem[]>('/prestadores/agendamentos', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(response => {
            const appointmentsFormatted = response.data.map(appointment => {
                return {
                    ...appointment,
                    hourFormatted: format(parseISO(appointment.date), 'HH:mm')
                }
            })
            setAppointments(appointmentsFormatted)
        })
    }, [selectedDate])

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logo} alt="goBarber"></img>

                    <Profile>
                        <img src={user.avatar_url || no_avatar} alt={user.name}></img>
                        <div>
                            <span>Bem vindo</span>
                            <Link to="/profile">
                                <strong>{user.name} </strong>
                            </Link>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower></FiPower>
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Horarios agendados</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>
                    {isToday(selectedDate) && nextAppointment && (

                         <NextAppointment>
                            <strong> atendimento a seguir </strong>
                            <div>
                                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name}></img>
                                <strong> {nextAppointment.user.name} </strong>
                                <span> {nextAppointment.hourFormatted}
                                    <FiClock></FiClock>
                                </span>
                            </div>
                        </NextAppointment>
                    )}

                    <Section>
                        <strong> manha</strong>
                        {morningAppointments.length === 0 && (
                            <p>Nenhum agendamento nesse periodo</p>
                        )}

                        {morningAppointments.map(appointment => (

                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock></FiClock>
                                    {appointment.hourFormatted}
                                </span>
                                <div>
                                    <img src={appointment.user?.avatar_url} alt={appointment.user?.name}></img>
                                    <strong>{appointment.user?.name} </strong>
                                </div>
                            </Appointment>
                        ))}

                        <strong> tarde</strong>
                        {afternoonAppointments.length === 0 && (
                            <p>Nenhum agendamento nesse periodo</p>
                        )}

                        {afternoonAppointments.map(appointment => (

                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock></FiClock>
                                    {appointment.hourFormatted}
                                </span>
                                <div>
                                    <img src={appointment.user.avatar_url} alt={appointment.user?.name}></img>
                                    <strong>{appointment.user?.name} </strong>
                                </div>
                            </Appointment>
                        ))}
                    </Section>
                </Schedule>

                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        months={[
                            'Janeiro',
                            'Feveiro',
                            'Marco',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro'
                        ]}
                        fromMonth={new Date()}
                        disabledDays={[
                            { daysOfWeek: [0, 6] }, ...disabledDays
                        ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] }
                        }}
                        onMonthChange={handleMonthChanged}
                        onDayClick={handleDateChanged}
                        selectedDays={selectedDate}
                    />
                </Calendar>
            </Content>
        </Container>
    )
}

export default Dashboard