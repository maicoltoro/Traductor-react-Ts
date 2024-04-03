import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Prosp {
    loading? : boolean
    onChange : (value : string) => void
    value : string
    type: SectionType
}

const commonStyle = {border: 0,height: '150px', resize : 'none'}

const getPlaceHolder = ({type, loading}: {type : SectionType, loading?: boolean}) =>{
    if(type == SectionType.From) return 'Introducir texto'
    if(loading) return 'Cargando...'
    return 'Traduccion'
}

export const TextArea = ({loading,type,value,onChange} : Prosp) =>{
    
    const style = type == SectionType.From 
        ? commonStyle
        : {...commonStyle, backgroundColor: '#f5f5f5'}

    const handlerChange = (event : React.ChangeEvent<HTMLTextAreaElement>) =>{
        onChange(event.target.value)
    }
    return(
        <Form.Control
            as= 'textarea'
            placeholder={getPlaceHolder({type,loading})}
            autoFocus = {type == SectionType.From}
            style={style}
            value={value}
            onChange={handlerChange}
        >
      </Form.Control>
    )
}