import createDataContext from './createDataContext';
import universityApi from '../api/universityApi';
import offline_data from '../../assets/offline_data.json';

const universityDataReducer = (state, action) => {
    switch(action.type)
    {
        case 'getUniversityData':

        case 'setOfflineUniversityData': return action.payload;

        default: return state;
    }
}

const getUniversityData = dispatch => {
    return async (callback) => {
        
        try
        {
            const response = await universityApi.get('/search?country=India');

            dispatch({ type: 'getUniversityData', payload: response.data.slice(0, 50) });

            if(callback)
            {
                callback();
            }
        } catch(err)
        {
            console.log(err);
        }
    }
}

const setOfflineUniversityData = dispatch => {

    return (callback) => {
        dispatch({ type: 'setOfflineUniversityData', payload: offline_data.universityData });

        if(callback)
        {
            callback();
        }

    }

}

export const { Context, Provider } = createDataContext(
    universityDataReducer,
    { getUniversityData, setOfflineUniversityData },
    []
);
