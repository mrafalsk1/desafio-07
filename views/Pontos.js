import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import Ponto from '../components/Ponto';
import TopMenuBar from '../components/TopMenuBar';
import styles from '../assets/js/Styles';


class Notas extends Component {

    constructor(props) {
        super(props);

        // console.log(props.navigation.state.params.nota)

        this.state = {

            pontos: [
                {
                    key: 'P101',
                    descricao: 'P101'
                },
                {
                    key: 'P99',
                    descricao: 'P99'
                }
            ]
        }
    }

    componentDidMount() {
        
    }


    render() {
        return (
            <DefaultView titulo={this.props.navigation.getParam('nota').numero} voltar={true} >

                <FlatList
                style={{
                    width: '100%'
                }}
                    data={this.state.pontos}
                    renderItem={({ item }) => <Ponto ponto={item} />}
                />

            </DefaultView>
        );
    }
}

export default withNavigation(Notas);