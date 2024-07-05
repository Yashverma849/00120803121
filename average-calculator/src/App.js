import React, { useState, useEffect } from 'react';

const App = () => {
  const [windowSize, setWindowSize] = useState(10);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  const fetchNumbers = async (numberId) => {
    try {
      const response = await fetch(`http://localhost:9876/numbers/${numberId}`);
      const data = await response.json();
      setNumbers(data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  useEffect(() => {
    const updateWindow = () => {
      setWindowPrevState([...windowCurrState]);
      setWindowCurrState(numbers.slice(-windowSize));
      setAvg(calculateAverage(numbers.slice(-windowSize)));
    };

    updateWindow();
  }, [numbers, windowSize]);

  const calculateAverage = (numbers) => {
    if (numbers.length === 0) {
      return 0;
    }
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  };

  const handleNumberIdChange = (e) => {
    const numberId = e.target.value;
    fetchNumbers(numberId);
  };

  const handleWindowSizeChange = (e) => {
    const newWindowSize = parseInt(e.target.value);
    setWindowSize(newWindowSize);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Average Calculator</h1>
      <div className="mb-4">
        <label htmlFor="numberId" className="block text-gray-700 font-bold mb-2">
          Number ID:
        </label>
        <input
          type="text"
          id="numberId"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleNumberIdChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="windowSize" className="block text-gray-700 font-bold mb-2">
          Window Size:
        </label>
        <input
          type="number"
          id="windowSize"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={windowSize}
          onChange={handleWindowSizeChange}
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold mb-2">Previous Window State:</p>
        <ul className="list-disc pl-5">
          {windowPrevState.map((num, index) => (
            <li key={index} className="text-gray-700">
              {num}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold mb-2">Current Window State:</p>
        <ul className="list-disc pl-5">
          {windowCurrState.map((num, index) => (
            <li key={index} className="text-gray-700">
              {num}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold mb-2">Average:</p>
        <p className="text-gray-700 text-xl">{avg}</p>
      </div>
    </div>
  );
};

export default App;
