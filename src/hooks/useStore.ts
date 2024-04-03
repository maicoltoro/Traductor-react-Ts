import { useReducer } from "react"
import { Action, FromLanguage, Language, State } from "../types"
import { AUTO_LANGUAGE } from "../contanst"

const initialState :State = {
    fromLanguage : 'auto',
    toLanguage:'en',
    fromText:'',
    result:'',
    loading: false
}
  
function reducer (state:State , action:Action ){
    const {type } = action
  
    if(type == 'INTERCHANGE_LANGUAGES'){
        if (state.fromLanguage == AUTO_LANGUAGE) return state

        const loading = state.fromText !== ''

        return {
            ...state,
            loading,
            result: '',
            fromLanguaje : state.toLanguage,
            toLanguaje : state.fromLanguage
        }
    }
     
    if(type== 'SET_FROM_LANGUAGE'){
      if(state.fromLanguage == action.payload) return state
      const loading = state.fromText !== ''
      return{
        ...state,
        fromLanguaje : action.payload,
        result: '',
        loading
      }
    }
    
    if(type== 'SET_TO_LANGUAGE'){
      if(state.toLanguage == action.payload) return state
      const loading = state.fromText !== ''
      return{
        ...state,
        toLanguaje : action.payload,
        result: '',
        loading
      }
    }
  
    if(type== 'SET_FROM_TEXT'){
      const loading = action.payload !== ''
      return{
        ...state,
        loading ,
        fromText : action.payload,
        resul : ''
      }
    }
  
    if (type == 'SET_RESULT') {
      return{
        ...state,
        loading : false,
        result : action.payload
      }
    }
    return state
}

export function useStore (){
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
      },dispatch] = useReducer(reducer,initialState)


    const interchangeLauguages = () =>{ 
        dispatch({type: 'INTERCHANGE_LANGUAGES'})
    }

    const setFromLanguages = (payload :FromLanguage) =>{
        dispatch({type: 'SET_FROM_LANGUAGE',payload})
    }

    const setToLanguages = (payload :Language) =>{
        dispatch({type: 'SET_TO_LANGUAGE',payload})
    }

    const setFromText = (payload :string) =>{
        dispatch({type: 'SET_FROM_TEXT',payload})
    }

    const setResult = (payload :string) =>{
        dispatch({type: 'SET_RESULT',payload})
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLauguages,
        setFromLanguages,
        setToLanguages,
        setFromText,
        setResult
    }
}