import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import * as DBUtil from '../components/DBUtil'

import DefaultLabelQuantidade from './DefaultLabelQuantidade';
import DefaultInput from './DefaultInput';



class Item extends PureComponent {

    constructor(props) {
        super(props);


        this.state = {
            quantidadeInstalada: this.props.item.quantidade_instalada,
            quantidadeRetirada: this.props.item.quantidade_retirada,
            quantidadeSubstituida: this.props.item.quantidade_substituida
        }
    }
    handdleChangeRetirada(text) {
        console.log(text);
        this.setState({
            quantidadeRetirada: text
        })
        let item = {
            quantidadeRetirada: text,
            quantidadeSubstituida: this.state.quantidadeSubstituida,
            quantidadeInstalada: this.state.quantidadeInstalada,
            item_id: this.props.item.it_id,
        }
        this.updateQuantidade(item)
    }
    handdleChangeSubstituida(text) {
        this.setState({
            quantidadeSubstituida: text
        })
        let item = {
            quantidadeRetirada: this.state.quantidadeRetirada,
            quantidadeSubstituida: text,
            quantidadeInstalada: this.state.quantidadeInstalada,
            item_id: this.props.item.it_id,
        }
        this.updateQuantidade(item)
    }
    handdleChangeInstalada(text) {
        this.setState({
            quantidadeInstalada: text
        })
        let item = {
            quantidadeRetirada: this.state.quantidadeRetirada,
            quantidadeSubstituida: this.state.quantidadeSubstituida,
            quantidadeInstalada: text,
            item_id: this.props.item.it_id,
        }
        this.updateQuantidade(item)

    }
    async updateQuantidade(item) {
        console.log('esse');
        console.log(this.props.item.equipe_id);
        console.log(item);
        setTimeout(() => DBUtil.setQuantidades(item,this.props.item.equipe_id).then(response => {
            console.log(response);
        }), 300)

    }
    render() {
        const showRetirar = this.props.item.us_retirar ? true : false
        const showInstalar = this.props.item.us_instalar ? true : false
        const showSubstituir = this.props.item.us_substituir ? true : false
        return (
            <View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        // alignItems: 'center',
                        alignItems: 'stretch',
                        marginVertical: 8,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#E4DFDA',
                        overflow: 'hidden',
                        backgroundColor: '#fff'
                    }}
                >
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                            padding: 18,
                        }}
                        activeOpacity={0.5}
                        underlayColor='#FAFAFA'
                        onPress={this.props.onPress}

                    >
                        <View>
                            <Text
                                style={{
                                    fontFamily: 'OpenSans',
                                    fontSize: 16,
                                    color: '#4B4B46'
                                }}
                            >
                                {this.props.item.descricao}
                            </Text>
                            <View>
                                {this.props.idExpanded === this.props.item.it_id ? (
                                    <>
                                        <View
                                            style={{
                                                width: '100%',
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                                paddingTop: 18

                                            }}
                                        >
                                            {showRetirar &&
                                                <DefaultInput style={{
                                                    width: '30%'
                                                }}
                                                    placeholder='Ret'
                                                    keyboardType='numeric'
                                                    value={this.state.quantidadeRetirada.toString() === '0' ? null : this.state.quantidadeRetirada.toString()}
                                                    onChangeText={text => this.handdleChangeRetirada(text)}
                                                >

                                                </DefaultInput>
                                            }
                                            {showInstalar &&
                                                <DefaultInput style={{
                                                    width: '30%',
                                                }}
                                                    placeholder='Inst'
                                                    keyboardType='numeric'
                                                    value={this.state.quantidadeInstalada.toString() === '0' ? null : this.state.quantidadeInstalada.toString()}
                                                    onChangeText={text => this.handdleChangeInstalada(text)}
                                                >
                                                </DefaultInput>

                                            }

                                            {showSubstituir &&
                                                <DefaultInput style={{
                                                    width: '30%'
                                                }}
                                                    placeholder='Subst'
                                                    keyboardType='numeric'
                                                    value={this.state.quantidadeSubstituida.toString() === '0' ? null : this.state.quantidadeSubstituida.toString()}
                                                    onChangeText={text => this.handdleChangeSubstituida(text)}
                                                >

                                                </DefaultInput>
                                            }
                                        </View>
                                    </>
                                ) :
                                    (
                                        <>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingTop: 18,
                                                width: '100%',
                                                justifyContent: 'space-evenly'
                                            }}>
                                                {showRetirar && (
                                                    <DefaultLabelQuantidade
                                                        title={this.state.quantidadeRetirada === '' ? 0 : this.state.quantidadeRetirada}
                                                        operation={'Ret: '}
                                                    />

                                                    // <View style={{
                                                    //     backgroundColor: '#F5F5F5',
                                                    //     borderRadius: 10
                                                    // }}>
                                                    //     <Text style={{
                                                    //         paddingVertical: 8,
                                                    //         paddingHorizontal: 20
                                                    //     }}>Ret: {item.quantidade_retirada}</Text>
                                                    // </View>
                                                )
                                                }
                                                {showInstalar &&
                                                    <DefaultLabelQuantidade
                                                        title={this.state.quantidadeInstalada === '' ? 0 : this.state.quantidadeInstalada}
                                                        operation={'Inst: '}
                                                    />
                                                }
                                                {showSubstituir &&
                                                    <DefaultLabelQuantidade
                                                        title={this.state.quantidadeSubstituida === '' ? 0 : this.state.quantidadeSubstituida}
                                                        operation={'Subst: '}
                                                    />

                                                }

                                            </View>
                                        </>
                                    )
                                }
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };
}

export default Item;