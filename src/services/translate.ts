import {  type Language } from '../types'

export async function translate ({  toLanguage, text}: {  toLanguage: Language, text: string } ) {

  const solicitud = await fetch('http://localhost:5000/api/Todo/GoogleTranslate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          targetLang: toLanguage
        })
  })
  const response = await solicitud.text()
  return response
}