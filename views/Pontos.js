import React, { Component } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import Ponto from '../components/Ponto';
import TopMenuBar from '../components/TopMenuBar';
import styles from '../assets/js/Styles';
import * as DBUtil from '../components/DBUtil'


class Notas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nota: props.navigation.getParam('nota'),
            loading: false,
            pontos: []
        }
    }

    onFocus = () => {
        this.setState({ loading: true })

        DBUtil.getPontos(this.props.navigation.getParam('nota').ag_id).then((pontos) => {
            pontos.forEach(p => {
                p.key = p.ap_id + ''
            });

            this.setState({ pontos: pontos, loading: false })
        })
    }

    render() {
        return (
            <DefaultView
                titulo={this.state.nota.nota_id}
                voltar={true}
                onFocus={this.onFocus}
            >
                {/* {this.state.nota.manha && this.state.nota.tarde ? null :
                    <View
                        style={{
                            position: 'absolute',
                            height: 30,
                            width: 100,
                            right: 0,
                            top: -50,
                            borderRadius: 25,
                            backgroundColor: '#EF8F3B',
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 20,
                            color: '#FFF'
                        }}>{this.state.nota.manha ? 'Manhã' : 'Tarde'}</Text>
                    </View>} */}

                {this.state.loading ?
                    <ActivityIndicator size="large" color="#EF8F3B" /> :
                    <FlatList
                        style={{
                            width: '100%'
                        }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.pontos}
                        renderItem={({ item }) => <Ponto ponto={item} />}
                    />
                }
            </DefaultView>
        );
    }
}

export default withNavigation(Notas);