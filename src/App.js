import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, TextField } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';
import Definitions from "./components/definitions/Definitions";
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
function App() {
  const [keyWord, setKeyWord] = useState("");
  const [lang, setLang] = useState("en");
  const [results, setResults] = useState(null);
  const [lightMode,setLightMode]=useState(false)
  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };
  
  const darkTheme = createTheme({
    palette: {
      primary: {      
        main:lightMode?"#111":"#fff",
      },
      type:lightMode?"light": "dark",
    },
  });
  const languages = [
    { value: "English", label: "en" },
    { value: "Hindi", label: "hi" },
    { value: "Spanish", label: "es" },
    { value: "French", label: "fr" },
    { value: "Japanese", label: "ja" },
    { value: "Russian", label: "ru" },
    { value: "German", label: "de" },
    { value: "Italian", label: "it" },
    { value: "Korean", label: "ko" },
    { value: "Brazilian Portuguese", label: "pt-BR" },
    { value: "Arabic", label: "ar" },
    { value: "Turkish", label: "tr" },
  ];
  const LightMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  useEffect(() => {
    const dictionaryApi = async () => {
      try {
        let data = await axios.get(`/api/v2/entries/${lang}/${keyWord}`);
        console.log(data.data);
        setResults(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (keyWord.length > 1) {
      dictionaryApi()
    }

  }, [keyWord, lang])
  return (
    <div className="App" style={{backgroundColor:lightMode?"#f0f0f0":"#282c34"
    ,color:lightMode?"#111":"#fff",transition:"all 0.5s linear"}}>
      <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100vh',justifyContent:"spaceEvenly" }}>
        <div style={{position:"absolute",top:0,right:15,paddingTop:10}}>
          <span style={{fontFamily:"Montserrat,sans-serif"}}>{lightMode?"Dark":"Light"} mode</span>
    <LightMode checked={lightMode} onChange={()=>setLightMode(!lightMode)}/>
        </div>
        <div>
          <ThemeProvider theme={darkTheme}>
            <div className="header" >
          <h1 className="title">Dictionary</h1>
           <div>
            <TextField
              id="standard-basic"
              label="Search"
              style={{ margin: 8 }}
              value={keyWord}
              onChange={handleChange}
              />
            <TextField
              id="standard-select-currency-native"
              select
              label="Select Language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your language"
              >
              {languages.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.value}
                </option>
              ))}
            </TextField>
              </div>   
              </div>
          </ThemeProvider>

        </div>



        {results && <Definitions word={keyWord} meanings={results} language={lang} lightMode={lightMode}/>}
      </Container>
    </div>
  );
}

export default App;
