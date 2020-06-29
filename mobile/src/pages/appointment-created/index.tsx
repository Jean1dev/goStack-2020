import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather'
import {
    Container,
    Text,
    Description,
    OK,
    OkButtonText
} from './styles'
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'

interface RouteProps {
    date: number
}

const AppointmentCreated: React.FC = () => {
    const { reset } = useNavigation()
    const { params } = useRoute()
    const routeParms = params as RouteProps

    const formattedDate = useMemo(() => {
        return format(routeParms.date, "EEEE', dia' dd 'de' MMMM 'as' HH:mm", { locale: ptBr })
    }, [routeParms.date])

    return (
        <Container>
            <Icon name="check" size={80} color="#04d361" />
            <Text>Agendamento concluido</Text>
            <Description>{formattedDate}</Description>
            <OK onPress={() => reset({
                routes: [
                    { name: 'dashboard' }
                ],
                index: 0
            })}>
                <OkButtonText>Ok</OkButtonText>
            </OK>
        </Container>
    )
}

export default AppointmentCreated