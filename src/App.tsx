import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';
import { Container,Row,Col, Button, Stack} from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './contanst';
import { ArrowsIcon, ClipBoardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/Languagesector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {

  const {fromLanguage
    ,loading
    ,interchangeLauguages
    ,toLanguage
    ,setFromLanguages
    ,setToLanguages
    ,setFromText
    ,setResult
    ,fromText
    ,result} = useStore()
    const debouncedFromText = useDebounce(fromText,300)

    useEffect(()=>{
      if(debouncedFromText === '') return
      translate({toLanguage,text: debouncedFromText})
        .then(result =>{
          if(result == null) return
          setResult(result)  
        })
        .catch(()=>{ setResult('Error')})
    },[debouncedFromText,fromLanguage])

    const handlerClipBoard = () =>{
      navigator.clipboard.writeText(result)
    }

    const handlerSpeak = () =>{
      const utterance = new SpeechSynthesisUtterance(result)
      utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }

  return (
    <Container fluid >
      <h2> Google traductor</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type= {SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguages}/>

              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
          </Stack>
        </Col>

        <Col xs= 'auto'>
          <Button variant='link'
           disabled = {fromLanguage== AUTO_LANGUAGE}
           onClick={interchangeLauguages}>
            <ArrowsIcon/>
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguages}/>
               <div style={{position: 'relative'}}>
                <TextArea
                    loading ={loading}
                    type={SectionType.To}
                    value={result}
                    onChange={setResult}
                  />

                  <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                    <Button variant='link' 
                      onClick={handlerClipBoard}
                    > <ClipBoardIcon/> </Button>

                    <Button variant='link' 
                      onClick={handlerSpeak}
                    > <SpeakerIcon/> </Button>
                  </div>                 
              </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
