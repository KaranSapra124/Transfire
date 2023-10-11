import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ApiKey, PostUrl, SpeechSynthesis } from './constants/Links';
import LanguageToggler from './LanguageToggler';
import LangContext from './constants/Secrets';
import TransLanguage from './TransLanguage';
import TransLangContext from './constants/Secrets2';
import { useLocation } from 'react-router-dom';
import { getCookie } from './constants/Cookie';

const Translate = () => {
  const CookEmail = getCookie("UserEmail")
  const Location = useLocation()
  const UserEmail = Location?.state;

  const { Lang, setLang, UpdateLang } = useContext(LangContext);
  const { TransLang, setTransLang, UpdateTransLang } = useContext(TransLangContext);

  const [Sentence, setSentence] = useState(null);
  const [ResultSentence, setResultedSentence] = useState(null);
  const [SavedWords, setSavedWords] = useState([]); // Use state to manage SavedWords
  const HandleChange = (e) => {
    setSentence(e.target.value);
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', Lang);
  encodedParams.set('target_language', TransLang);
  encodedParams.set('text', `${Sentence}`);

  const HandleTranslate = () => {
    if (Lang !== "" && TransLang !== "") {

      fetch(PostUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': ApiKey,
        },
        body: encodedParams,
      })
        .then((data) => data.json())
        .then((data) => setResultedSentence({ ...data.data }));
    } else {
      alert("Choose Language to translate from!!")
    }
  };

  const HandleSave = () => {
    if (Sentence !== null) {

      setSavedWords([...SavedWords, Sentence])
    } else {
      alert("Write something!!!")
    }
  }
  useEffect(() => {
    // This useEffect will run whenever SavedWords changes
    if (SavedWords.length !== 0) {
      fetch("http://localhost:3000/translate", {
        method: 'POST',
        body: JSON.stringify({
          emailId: UserEmail || CookEmail,
          SavedWords: SavedWords, // Use the state value here
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      setSavedWords([])
      alert("Word Saved!!")
    }
  }, [SavedWords]); // Watch for changes in SavedWords




  return (
    <>
      <div className='relative flex flex-col md:flex-col justify-center items-center space-y-4 '>
        <div className='w-full flex justify-center mt-2 xsm:flex-wrap'>

          <LanguageToggler />
          <TransLanguage />
          <h6 className='h-fit  mt-2 p-1 text-xl rounded-xl font-extrabold bg-gray-100 text-[#D83F31]'
          >Hello , {UserEmail || CookEmail}</h6>
        </div>
        <div className='w-full '>
          <div className='flex flex-col '>
            <div className=' textarea-container relative'>

              <textarea
                value={Sentence}
                onChange={HandleChange}
                className='w-full rounded-2xl p-4 shadow-lg text-xl font-bold'
                placeholder='Enter Your Sentence or Word...'
                cols='3'
                rows='5'
              >

              </textarea>
              <button onClick={HandleSave} className='absolute bottom-2 right-2 p-2 text-xl rounded-xl font-bold shadow-xl bg-gray-100 text-[#D83F31]'>Save</button>
            </div>
            <button
              onClick={() => {
                SpeechSynthesis(Sentence);
              }}
              className='w-fit m-auto mt-2 p-2 text-xl rounded-xl font-bold shadow-xl bg-gray-100 text-[#D83F31]'
            >
              Voice
            </button>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col'>
            <textarea
              disabled
              value={ResultSentence?.translatedText}
              className='w-full rounded-2xl p-4 shadow-lg text-xl font-bold'
              placeholder='Enter Your Sentence or Word...'
              cols='3'
              rows='5'
            ></textarea>
          </div>
          <button
            onClick={HandleTranslate}
            className='w-fit m-auto  mt-2 p-2 text-xl rounded-xl font-bold shadow-xl bg-gray-200 text-[#D83F31]'
          >
            Translate
          </button>
        </div>

      </div>
    </>
  );
};

export default Translate;
