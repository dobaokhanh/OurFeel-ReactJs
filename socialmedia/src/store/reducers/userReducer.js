import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userData : null,
    loading: false,
    error: false
};

const signUpStart = (state, action) => {
    return  updateObject(state, {
        loading: true,
        error: null
    });
};

const signUpSuccess = (state, action) => {
    return updateObject(state, {
        
    })
}