import React, { Component } from 'react';
import { FlatList, Keyboard, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import Nota from '../components/Nota';
import styles from '../assets/js/Styles';
import * as DBUtil from '../components/DBUtil'
import SwitchSelector from "react-native-switch-selector"
import moment from 'moment'

class Notas extends Component {


    constructor(props) {
        super(props);

        this.state = {
            notas: [],
            loading: false,
            turno: moment().format('a')
        }
    }

    onFocus = () => {
        Keyboard.dismiss()
        this.busca(this.state.turno)
    }

    busca = (turno) => {
        this.setState({ loading: true })

        DBUtil.getNotas(turno).then((notas) => {
            notas.forEach(n => {
                n.key = n.ag_id + ''
            });

            this.setState({ notas: notas, loading: false })
        })
    }

    render() {
        const font = { fontFamily: 'OpenSans', fontSize: 16 }
        return (
            <DefaultView
                titulo='Notas'
                onFocus={this.onFocus}
            >
                <SwitchSelector
                    style={{
                        position: "absolute",
                        width: '50%',
                        top: -50,
                        right: 0,
                    }}
                    hasPadding
                    buttonColor='#EF8F3B'
                    borderColor='#E4DFDA'
                    textStyle={font}
                    selectedTextStyle={font}
                    initial={this.state.turno == 'am' ? 0 : 1}
                    options={[
                        { label: "Manhã", value: "am" },
                        { label: "Tarde", value: "pm" }
                    ]}
                    onPress={value => { this.setState({ turno: value }); this.busca(value) }}
                />

                {this.state.loading ?
                    <ActivityIndicator size="large" color="#EF8F3B" /> :
                    <FlatList
                        style={{
                            width: '100%'
                        }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.notas}
                        renderItem={({ item }) => <Nota nota={item} />}
                    />
                }
            </DefaultView>
        );
    }
}

export default withNavigation(Notas);