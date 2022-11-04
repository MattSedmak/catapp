import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { CatElement } from './CatElement';
import { InputField } from './InputField.jsx';
import { Button } from './Button';

function App() {
  const [catId, setCatId] = useState(0);
  const [catName, setCatName] = useState('');
  const [catUrl, setCatUrl] = useState('');
  const [catFact, setCatFact] = useState('');
  const [cats, setCats] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const factUrl = 'https://catfact.ninja/fact';
  const newCatUrl = 'https://api.thecatapi.com/v1/images/search';

  const fetchNewCat = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };

    const [response1, response2] = await Promise.all([
      fetch(newCatUrl, options),
      fetch(factUrl, options),
    ]);

    const newCat = await response1.json();
    const catFact = await response2.json();

    setCatUrl(newCat[0].url);
    setCatFact(catFact.fact);
    setCatId(newCat[0].id);
    setButtonDisabled(false);
  }, []);

  useEffect(() => {
    fetchNewCat();
  }, [fetchNewCat]);

  const addCat = () => {
    setButtonDisabled(true);
    fetchNewCat();
    setCats([
      ...cats,
      {
        id: catId,
        name: catName,
        fact: catFact,
        url: catUrl,
      },
    ]);
    setCatName('');
  };

  const removeCat = (id) => {
    const newCats = cats.filter((cat) => {
      return cat.id !== id;
    });
    setCats(newCats);
  };

  const addCatToList = (event) => {
    setCatName(event.target.value);
  };

  return (
    <div className='app'>
      <h1>Kattgenerator</h1>
      <img src={catUrl} alt='' className='new-cat-image' />
      <br />
      <InputField onChange={addCatToList} name={catName} />
      <br />
      <Button
        title='Lägg till katt'
        onClick={addCat}
        disabled={buttonDisabled}
        className='add-button'
      />

      {cats.map((cat, i) => (
        <CatElement key={cat.name + i} cat={cat} deleteCat={removeCat} />
      ))}
    </div>
  );
}

export default App;
