import React from 'react';
import { TouchableOpacity } from 'react-native';
import MSText from './MSText';

export default ({ title, location, nameOnPress }) => {
    return (<TouchableOpacity style = {{ width: '90%', margin: 5, padding: 15, elevation: 2, borderRadius: 10, alignSelf: 'center', backgroundColor: 'white' }}
    onPress = { nameOnPress }>

        <MSText msText = {title} msStyle = {{ fontSize: 14 }} msLines = {1}/>

        <MSText msText = {location} msStyle = {{ fontSize: 11, color: 'gray', marginTop: 5 }} msLines = {1}/>

    </TouchableOpacity>);
}
