import React, { useState } from 'react';

interface StockData {
  'Global Quote'?: {
    '01. symbol': string;
    '05. price': string;
    '09. change': string;
    '10. change percent': string;
  };
}

const StockAnalysisDashboard: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [data, setData] = useState<StockData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const analyzeStock = async () => {
    if (!symbol.trim()) {
      setError('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=demo`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const result: StockData = await response.json();

      if (!result['Global Quote']) {
        throw new Error('No data found for this symbol');
      }

      setData(result);
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="stock-analysis-dashboard-section">
      <div className="container">
        <h2>Stock Analysis Dashboard</h2>

        <div className="main-section" id="stock-analysis-dashboard">
          <div id="stock-analysis-dashboard-title">STOCK ANALYSIS DASHBOARD</div>
          <div id="stock-analysis-dashboard-subtitle">
            Put in a stock symbol you'd like to analyze (e.g., MSFT)
          </div>
          <input
            id="stock-analysis-dashboard-input"
            type="text"
            placeholder="Enter stock symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <button
            className="stock-analysis-dashboard-button"
            onClick={analyzeStock}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          <div id="stock-analysis-dashboard-data">
            {error && <p className="error">{error}</p>}
            {data && data['Global Quote'] && (
              <div className="stock-info">
                <p><strong>Symbol:</strong> {data['Global Quote']['01. symbol']}</p>
                <p><strong>Price:</strong> ${data['Global Quote']['05. price']}</p>
                <p><strong>Change:</strong> {data['Global Quote']['09. change']}</p>
                <p><strong>Change %:</strong> {data['Global Quote']['10. change percent']}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockAnalysisDashboard;