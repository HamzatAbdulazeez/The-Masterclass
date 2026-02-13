import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import CrapsGame from './components/CrapsGame';
import QuoteGenerator from './components/QuoteGenerator';
import StockAnalysisDashboard from './components/StockAnalysisDashboard';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AboutSection />
      <CrapsGame />
      <QuoteGenerator />
      <StockAnalysisDashboard />
    </>
  );
};

export default App;