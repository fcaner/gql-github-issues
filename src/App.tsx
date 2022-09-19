import React from 'react';
import logo from './logo.svg';
import { useQuery } from '@apollo/client';
import {  GET_ISSUES } from "./gql/Query";
import './App.css';

function App() {
  const { loading, error, data } = useQuery(GET_ISSUES);
  console.log(data);

  return (
    <div>
    </div>
  );
}

export default App;
