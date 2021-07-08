import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Fonts from 'expo-font';

const MSText = ({ msStyle, msText, msLines }) => {

    const [ fontLoaded, setFontLoaded ] = useState(false);

    const addFont = async () => {
        await Fonts.loadAsync({
            "Montserrat-Light": require("../../assets/Montserrat-Light.ttf"),
        });

        setFontLoaded(true);
    }
    
    useEffect(() => {

        addFont();

    }, []);

    return (fontLoaded ? <Text style = {[{ fontFamily: 'Montserrat-Light' }, msStyle]} numberOfLines = {msLines}>{msText}</Text> : <Text style = {msStyle} numberOfLines = {msLines}>{msText}</Text>);
}

export default MSText;
