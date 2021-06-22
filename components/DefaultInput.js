import React, { Component } from 'react';
import { TextInput } from 'react-native';
class DefaultInput extends Component {

    constructor(props) {
        super(props);
    }
    // handdleChangeRetirada = (value, index) => {
    //     console.log(value, index)
    //     let itens = [...this.state.itens]
    //     let item = { ...itens[index] }
    //     item.quantidade_retirada = value
    //     itens[index] = item
    //     this.setState({ itens })
    //     this.handdleUpdateQuantidades(item)

    // }
    // handdleChangeSubstituida = (value, index) => {
    //     console.log(value, index)
    //     let itens = [...this.state.itens]
    //     let item = { ...itens[index] }
    //     item.quantidade_substituida = value
    //     itens[index] = item
    //     this.setState({ itens })
    //     this.handdleUpdateQuantidades(item)

    // }
    // handdleUpdateQuantidades = (item) => {
    //     console.log('a');
    //     setTimeout(() => {
    //         DBUtil.updateQuantidades(item).then(response => {
    //             console.log(response);
    //         });
    //     }, 300)
    // }
    // on

    render() {
        return (
            <TextInput style={{
                fontFamily: 'OpenSans',
                fontSize: 16,
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#E4DFDA',
                backgroundColor: '#fff',
                ...this.props.style,
                maxHeight: 40
            }}
                keyboardType={this.props.keyboardType}
                autoCapitalize={this.props.autoCapitalize}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                secureTextEntry={this.props.secureTextEntry}
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
            />

        )
    }
}

export default DefaultInput