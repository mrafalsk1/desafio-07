import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import Item from '../components/Item';
import styles from '../assets/js/Styles';


class Notas extends Component {

    constructor(props) {
        super(props);

        // console.log(props.navigation.state.params.ponto)

        this.state = {

            items: [
                {
                    key: '1',
                    descricao: 'REINST.UM METRO FIOS OU CABOS COMUM-4.1',
                    previsto: 10,
                    realizado: null
                },
                {
                    key: '2',
                    descricao: 'TRACIONAR/NIVELAR/ENCAB. LANCE COND.-4.2',
                    previsto: -15,
                    realizado: -14
                },
                {
                    key: '3',
                    descricao: 'TESTAR',
                    previsto: 0.56,
                    realizado: 0.56
                },

                {
                    key: '4',
                    descricao: 'TESTAR2',
                    previsto: 0.56,
                    realizado: 0.56
                },

                {
                    key: '5',
                    descricao: 'TESTAR3',
                    previsto: 0.56,
                    realizado: 0.56
                }
            ]
        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <DefaultView
                titulo={this.props.navigation.getParam('ponto').descricao}
                voltar={true}
            >

                <FlatList
                    style={{
                        width: '100%',
                    }}
                    data={this.state.items}
                    renderItem={({ item }) => <Item item={item} />}
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                />

                <DefaultButtonFlP
                    title='Adicionar Extra'
                    style={{
                        width: '80%',
                        position: 'absolute',
                        bottom: 0,
                        marginBottom: 20
                    }}
                    onPress={() => this.props.navigation.navigate('AddExtra')}
                />

            </DefaultView>
        );
    }
}

export default withNavigation(Notas);