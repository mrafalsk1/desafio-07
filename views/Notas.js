import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import Nota from '../components/Nota';
import styles from '../assets/js/Styles';


class Notas extends Component {


    constructor(props) {
        super(props);

        this.state = {
            notas: [
                {
                    key: '123456',
                    numero: '123456'
                },
                {
                    key: '6543210',
                    numero: '6543210'
                }
            ]
        }
    }

    componentDidMount() {
        
    }


    render() {
        return (
            <DefaultView titulo='Notas'>

                <FlatList
                style={{
                    width: '100%'
                }}
                    data={this.state.notas}
                    renderItem={({ item }) => <Nota nota={item} />}
                />

            </DefaultView>
        );
    }
}

export default withNavigation(Notas);