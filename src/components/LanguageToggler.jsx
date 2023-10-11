import React, { useContext, useEffect, useState } from 'react';
import LanguageData from './constants/LanguagesData';
import LangContext from './constants/Secrets';

const LanguageToggler = () => {
  const { Lang, setLang, UpdateLang } = useContext(LangContext)
  const [Language, setLanguage] = useState(LanguageData);
  const [Toggle, setToggle] = useState(false);
  const [SelectedLang, setSelectedLang] = useState("")
  const BtnStyle = "bg-black mr-2 m-auto my-1 w-fit p-2 rounded-xl shadow-xl text-white"

  const ToggleDiv = () => {
    return setToggle(!Toggle);
  };

  const SelectedLanguage = (id) => {
    setSelectedLang(id)
    UpdateLang(id)
    console.log(Lang);
    setToggle(!Toggle)
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center mr-2'>
        <button
          onClick={ToggleDiv}
          className='bg-gray-100 w-fit m-auto mt-2 p-2 rounded-2xl text-[#D80032] font-extrabold'
        >
          Translate From:
        </button>
        <div
          className={`${Toggle
            ? 'mt-1 w-fit rounded-2xl bg-gray-200 text-[#D80032] font-bold max-h-[30rem] overflow-y-auto '
            : 'hidden'
            }`}
        >
          <ul className=" w-full flex flex-col justify-center items-center ">
            {Language !== null ? (
              Language.map((Lang, index) => {
                return (
                  <button onClick={() => {
                    SelectedLanguage(Lang.code)
                  }}
                    key={index}
                    className={`${SelectedLang === Lang.code ? BtnStyle : 'bg-white m-auto ml-1 mr-1 mt-1 mb-1 w-fit p-2 rounded-xl shadow-xl'}`}
                  >
                    {Lang.name}
                  </button>
                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LanguageToggler;
