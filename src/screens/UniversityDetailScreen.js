import React from 'react';
import { View } from 'react-native';
import MSText from '../components/MSText';

const UniversityDetailScreen = ({ route }) => {

    return (<View style = {{ flex: 1 }}>

        <MSText msText = {route.params.name} msStyle = {{ fontSize: 20, marginVertical: 30, marginHorizontal: 10, textDecorationLine: 'underline', textAlign: 'center' }} msLines = {0}/>

        <MSText msText = {route.params.country_name} msStyle = {{ textAlign: 'center', color: 'gray' }} msLines = {0}/>

        <MSText msText = {route.params.domain_name} msStyle = {{ marginTop: 5, textAlign: 'center' }}/>

        <MSText msText = {route.params.web_pages_url[0]} msStyle = {{ marginTop: 5, textAlign: 'center', color: 'blue', textDecorationLine: 'underline' }} msLines = {0}/>

    </View>);

}

export default UniversityDetailScreen;
