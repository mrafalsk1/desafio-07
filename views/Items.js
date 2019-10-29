import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import Item from '../components/Item';
import styles from '../assets/js/Styles';
import * as DBUtil from '../components/DBUtil'


class Notas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itens: [],
            loading: false
        }
    }

    onFocus = () => {
        this.setState({ loading: true })

        DBUtil.getItensPonto(this.props.navigation.getParam('ponto').ap_id).then((itens) => {
            itens.forEach(i => {
                i.key = i.id + '' + i.operacao
            });

            this.setState({ itens: itens, loading: false })
        })
    }


    render() {
        return (
            <DefaultView
                titulo={this.props.navigation.getParam('ponto').descricao}
                voltar={true}
                onFocus={this.onFocus}
            >
                {this.state.loading ?
                    <ActivityIndicator size="large" color="#EF8F3B" /> :
                    <FlatList
                        style={{
                            width: '100%',
                        }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.itens}
                        renderItem={({ item }) => <Item item={item} />}
                        ListFooterComponent={<View style={{ height: 100 }}></View>}
                    />
                }
                <DefaultButtonFlP
                    title='Adicionar Extra'
                    style={{
                        width: '80%',
                        position: 'absolute',
                        bottom: 0,
                        marginBottom: 20
                    }}
                    onPress={() => this.props.navigation.navigate('AddExtra', { ponto: this.props.navigation.getParam('ponto') })}
                />

            </DefaultView>
        );
    }
}

export default withNavigation(Notas);