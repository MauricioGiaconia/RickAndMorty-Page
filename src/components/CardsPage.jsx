import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styleMain from '../styles/MainPage.module.css';
import SearchBar from './SearchBar.jsx';
import Cards from './Cards.jsx';
import Loading from './Loading';

export default function CardsPage(props) {

  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const url = 'https://be-a-rym.up.railway.app/api';
  const apiKey = 'ac10126d166d.71df16a1f54c9d912e78';

  const getCharacters = (xUrl, cleanData = false) => {

    if (!isLoading) {
      setIsLoading(true);
    }

    fetch(`${xUrl}key=${apiKey}`)

      .then(response => {

        if (response.ok) {

          return response.json();
        }
      }
      )
      .then(dataApi => {

        if (dataApi.results) {
          setData(dataApi.results);
        } else {

          if (cleanData) {
            setData([dataApi]);
          } else {
            setData([...data, dataApi]);
          }

        }


        if (dataApi.info) {
          if (dataApi.info['prev']) {

            setPrevUrl(dataApi.info['prev']);
          } else {
            setPrevUrl(null);
          }

          if (dataApi.info['next']) {

            setNextUrl(dataApi.info['next']);
          } else {
            setNextUrl(null);
          }
        }


        setIsLoading(false);
      }

      );
  }

  useEffect(() => {
    getCharacters(`${url}/character?`);
  }, []);

  const onClickHandleSearch = (xid) => {
    console.log(isSearch);
    if (!isSearch) {
      getCharacters(`${url}/character/${xid}?`, true);
      setIsSearch(true);
    } else {
      getCharacters(`${url}/character/${xid}?`, false);
    }

  }

  const onClickHandleReset = () =>{
    getCharacters(`${url}/character?`);
    setIsSearch(false);
  }

  if (isLoading) {
    return <div className={`${styleMain.mainContainer}`}>
      <Loading></Loading>
    </div>
  }

  return <div className={`${styleMain.mainContainer}`}>

    <div style={{ width: '100%', marginBottom: 'auto' }}>
      <SearchBar
        onSearch={onClickHandleSearch}
        onReset={onClickHandleReset}
      />
     
    </div>

    <Cards faIconNext={<FaArrowRight />}
      faIconPrev={<FaArrowLeft />}
      data={data}
      dataType='character'
      btnPrev={prevUrl && !isSearch ? () => getCharacters(`${prevUrl}&`) : false}
      btnNext={url && !isSearch ? () => getCharacters(`${nextUrl}&`) : false}></Cards>
  </div>
}