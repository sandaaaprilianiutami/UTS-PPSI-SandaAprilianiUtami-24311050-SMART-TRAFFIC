import React from 'react';
import { AppProvider } from './context/AppContext';
import { MainApp } from './MainApp';
import './index.css';

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
