import React, { useRef, useContext, useEffect } from 'react';
import { View, StatusBar, Animated, PanResponder, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../assets/colors.json';
import MSText from '../components/MSText';
import { Context } from '../context/UniversityDataContext';
import NameDetails from '../components/NameDetails';
import NetInfo from '@react-native-community/netinfo';

const UniversityListScreen = ({ navigation }) => {

    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.light_red);

    const { state, getUniversityData, setOfflineUniversityData } = useContext(Context);

    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset(
                    {
                        y: pan.y._value
                    }
                );
            },
            onPanResponderMove: (evt, gestureState) => {
                if(gestureState.dy > 0 && gestureState.dy < 200)
                {
                    pan.y.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {

                if(pan.y._value > 100)
                {
                    Animated.timing(pan.y, {
                        toValue: 200,
                        duration: 100,
                        useNativeDriver: false
                    }).start();

                    getUniversityData(() => {
                        pan.flattenOffset();

                        pan.y.setValue(-20);
                        completeRefresh();
                    });
                    return;
                }

                pan.flattenOffset();

                pan.y.setValue(-20);
                completeRefresh();
            }
        })
    ).current;

    const completeRefresh = () => {
        Animated.timing(pan.y,
            {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start();
    }

    useEffect(() => {

        NetInfo.fetch().then(state => {
            if(state.isConnected)
            {
                getUniversityData();
            } else
            {
                setOfflineUniversityData();
            }
        })

    }, []);

    return (<View style = {{ flex: 1 }}>

        <MSText msText = 'Loading...' msStyle = {{ position: 'absolute', marginTop: 70, alignSelf: 'center', color: colors.light_red, fontSize: 16 }} msLines = {1}/>

        <Animated.View style = {{ marginTop: 20, borderTopStartRadius: 30, borderTopEndRadius: 30, elevation: 2, flex: 1, backgroundColor: colors.pool,
        transform: [{ translateY: pan.y }]}}>

            <Animated.View style = {{ paddingBottom: 20, backgroundColor: colors.pool, borderTopStartRadius: 30, borderTopEndRadius: 30 }}
            {...panResponder.panHandlers}>

                <TouchableOpacity style = {{ marginTop: 5, alignSelf: 'center', width: 50, height: 10, borderRadius: 20, backgroundColor: 'gray' }}></TouchableOpacity>

            </Animated.View>

            <MSText msText = 'University List' msStyle = {{ fontSize: 20, alignSelf: 'center', textDecorationLine: 'underline', color: 'black' }} msLines = {1}/>

            {state.length != 0 ? <FlatList
                data = {state}
                keyExtractor = {(item, index) => (index.toString())}
                renderItem = {(item) => {
                    return <NameDetails title = {item.item.name} location = {`${item.item.country}`} nameOnPress = {() => {
                        return navigation.navigate('UniversityDetail', { name: item.item.name, country_name: item.item.country, web_pages_url: item.item.web_pages, domain_name: item.item.domains });
                    }}/>
                }}
                style = {{ marginTop: 20 }}
                showsVerticalScrollIndicator = {false}
            /> : <View style = {{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size = {50} style = {{ marginBottom: 50, alignSelf: 'center' }} color = {colors.red}/></View>}

        </Animated.View>
        
    </View>);

}

export default UniversityListScreen;
