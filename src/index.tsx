import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import reportWebVitals from './reportWebVitals';
import { Listings } from './sections';

const client = new ApolloClient({
  uri: '/api',
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Listings title="TinyHouse Listings" />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
