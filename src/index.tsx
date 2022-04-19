import React from 'react';
import ReactDOM from 'react-dom';
import DropDownSelect from './DropDownSelect';

const selectOptions = [
  { text: 'Avlasting for pårørende', pillColor: '#FBD960' },
  { text: 'Rehabilitering etter operasjon', pillColor: '#FF9587' },
  { text: 'Lindrende behandling', pillColor: '#99DAFF' },
  { text: 'Generelt redusert funksjonsnivå', pillColor: '#A799FF' },
];

ReactDOM.render(
  <React.StrictMode>
    <DropDownSelect labelText="Velg bakgrunn" options={selectOptions}/>
  </React.StrictMode>,
  document.getElementById('root')
);