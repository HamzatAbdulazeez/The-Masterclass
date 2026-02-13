import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import CrapsGame from './components/CrapsGame';
import QuoteGenerator from './components/QuoteGenerator';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AboutSection />
      <CrapsGame />
      <QuoteGenerator />
    </>
  );
};

export default App;