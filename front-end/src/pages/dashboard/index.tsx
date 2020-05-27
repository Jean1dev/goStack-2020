import React, { useState, useCallback } from 'react'
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

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const no_avatar = 'https://api.adorable.io/avatars/285/abott@adorable.png'

    const handleDateChanged = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day)
        }
    }, [])

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logo} alt="goBarber"></img>

                    <Profile>
                        <img src={user.avatar_url || no_avatar} alt={user.name}></img>
                        <div>
                            <span>Bem vindo</span>
                            <strong>{user.name} </strong>
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
                        <span>hoje</span>
                        <span>dia 6</span>
                        <span>segunda feira</span>
                    </p>

                    <NextAppointment>
                        <strong> atendimento a seguir </strong>
                        <div>
                            <img src={no_avatar} alt=""></img>
                            <strong> nome </strong>
                            <span> Horario
                                <FiClock></FiClock>
                            </span>
                        </div>
                    </NextAppointment>

                    <Section>
                        <strong> manha</strong>

                        <Appointment>
                            <span>
                                <FiClock></FiClock>
                            08:00
                        </span>
                            <div>
                                <img src={no_avatar} alt=""></img>
                                <strong> Cleudia </strong>
                            </div>
                        </Appointment>

                        <strong> tarde</strong>

                        <Appointment>
                            <span>
                                <FiClock></FiClock>
                            13:00
                        </span>
                            <div>
                                <img src={no_avatar} alt=""></img>
                                <strong> Cleudia </strong>
                            </div>
                        </Appointment>
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
                            { daysOfWeek: [0, 6]}
                        ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] }
                        }}
                        onDayClick={handleDateChanged}
                        selectedDays={selectedDate}
                        />
                </Calendar>
            </Content>
        </Container>
    )
}

export default Dashboard