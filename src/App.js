
import React, { useState } from 'react';
import './App.css';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [isLeapYear, setIsLeapYear] = useState(null);
  const [currentAge, setCurrentAge] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState('');

  
  const calculateDayOfWeek = () => {
    if (!day || !month || !year) {
      alert('Пожалуйста, заполните все поля даты рождения');
      return;
    }
    
    if (!isValidDate(day, month, year)) {
      alert('Некорректная дата рождения. Проверьте правильность ввода.');
      return;
    }
    
    const date = new Date(year, month - 1, day);
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const result = days[date.getDay()];
    setDayOfWeek(result);
  };

  const checkLeapYear = () => {
    if (!year) {
      alert('Пожалуйста, введите год рождения');
      return;
    }
    
    const yearNum = parseInt(year);
    if (yearNum < 1900 || yearNum > 2025) {
      alert('Год должен быть в диапазоне от 1900 до 2025');
      return;
    }
    
    const isLeap = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
    setIsLeapYear(isLeap);
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
      setDay(value);
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
      setMonth(value);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) >= 0)) {
      setYear(value);
    }
  };

  const getAgeWord = (age) => {
    if (age % 10 === 1 && age % 100 !== 11) {
      return 'год';
    } else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
      return 'года';
    } else {
      return 'лет';
    }
  };

  const isValidDate = (day, month, year) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2025) {
      return false;
    }
    
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum > daysInMonth) {
      return false;
    }
    
    const today = new Date();
    const inputDate = new Date(yearNum, monthNum - 1, dayNum);
    if (inputDate > today) {
      return false;
    }
    
    return true;
  };

  const calculateAge = () => {
    if (!day || !month || !year) {
      alert('Пожалуйста, заполните все поля даты рождения');
      return;
    }
    
    if (!isValidDate(day, month, year)) {
      alert('Некорректная дата рождения. Проверьте правильность ввода.');
      return;
    }
    
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setCurrentAge(age);
  };

  const createStarDigit = (digit) => {
    const patterns = {
      '0': [
        ' *** ',
        '*   *',
        '*   *',
        '*   *',
        ' *** '
      ],
      '1': [
        '  *  ',
        ' **  ',
        '  *  ',
        '  *  ',
        ' *** '
      ],
      '2': [
        ' *** ',
        '*   *',
        '  ** ',
        ' *   ',
        '*****'
      ],
      '3': [
        ' *** ',
        '*   *',
        '  ** ',
        '*   *',
        ' *** '
      ],
      '4': [
        '*   *',
        '*   *',
        '*****',
        '    *',
        '    *'
      ],
      '5': [
        '*****',
        '*    ',
        '*** ',
        '    *',
        '*** '
      ],
      '6': [
        ' *** ',
        '*    ',
        '*** ',
        '*   *',
        ' *** '
      ],
      '7': [
        '*****',
        '    *',
        '   * ',
        '  *  ',
        ' *   '
      ],
      '8': [
        ' *** ',
        '*   *',
        ' *** ',
        '*   *',
        ' *** '
      ],
      '9': [
        ' *** ',
        '*   *',
        ' ****',
        '    *',
        ' *** '
      ]
    };
    
    return patterns[digit] || ['     ', '     ', '     ', '     ', '     '];
  };

  const displayDateWithStars = () => {
    if (!day || !month || !year) {
      alert('Пожалуйста, заполните все поля даты рождения');
      return;
    }
    
    if (!isValidDate(day, month, year)) {
      alert('Некорректная дата рождения. Проверьте правильность ввода.');
      return;
    }
    
    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');
    const formattedYear = year;
    
    const dateString = `${formattedDay} ${formattedMonth} ${formattedYear}`;
    
    let output = `Дата рождения: ${formattedDay}.${formattedMonth}.${formattedYear}\n\n`;
    
    const chars = dateString.split('');
    
    for (let row = 0; row < 5; row++) {
      let line = '';
      for (let char of chars) {
        if (char === ' ') {
          line += '   ';
        } else if (/\d/.test(char)) {
          line += createStarDigit(char)[row] + ' ';
        }
      }
      output += line + '\n';
    }
    
    setConsoleOutput(output);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Учебная практика, кейс №2</h1>
      </header>
      
      <main className="main-content">
        <div className="input-section">
          <h2>1. Введите дату рождения</h2>
          <div className="date-inputs">
            <div className="input-group">
              <label>День:</label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={handleDayChange}
                placeholder="ДД"
                style={{
                  borderColor: day && !isValidDate(day, month || '1', year || '2000') ? '#dc3545' : '#ddd'
                }}
              />
            </div>
            <div className="input-group">
              <label>Месяц:</label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={handleMonthChange}
                placeholder="ММ"
                style={{
                  borderColor: month && !isValidDate(day || '1', month, year || '2000') ? '#dc3545' : '#ddd'
                }}
              />
            </div>
            <div className="input-group">
              <label>Год:</label>
              <input
                type="number"
                min="1900"
                max="2025"
                value={year}
                onChange={handleYearChange}
                placeholder="ГГГГ"
                style={{
                  borderColor: year && !isValidDate(day || '1', month || '1', year) ? '#dc3545' : '#ddd'
                }}
              />
            </div>
          </div>
        </div>

        <div className="functions-section">
          <div className="function-card">
            <h3>2. День недели</h3>
            <button onClick={calculateDayOfWeek} className="function-button">
              Определить день недели
            </button>
            {dayOfWeek && (
              <div className="result">
                <strong>Результат:</strong> {dayOfWeek}
              </div>
            )}
          </div>

          <div className="function-card">
            <h3>3. Високосный год</h3>
            <button onClick={checkLeapYear} className="function-button">
              Проверить високосный год
            </button>
            {isLeapYear !== null && (
              <div className="result">
                <strong>Результат:</strong> {isLeapYear ? 'Високосный год' : 'Не високосный год'}
              </div>
            )}
          </div>

          <div className="function-card">
            <h3>4. Возраст</h3>
            <button onClick={calculateAge} className="function-button">
              Вычислить возраст
            </button>
            {currentAge !== null && (
              <div className="result">
                <strong>Результат:</strong> {currentAge} {getAgeWord(currentAge)}
              </div>
            )}
          </div>

          <div className="function-card">
            <h3>5. Дата звездочками</h3>
            <button onClick={displayDateWithStars} className="function-button">
              Показать дату звездочками
            </button>
          </div>
        </div>

        <div className="console-section">
          <div className="console-container">
            <div className="console-header">
              <div className="console-buttons">
                <span className="console-button close"></span>
                <span className="console-button minimize"></span>
                <span className="console-button maximize"></span>
              </div>
              <div className="console-title">Console Aboba</div>
            </div>
            <div className="console-content">
              <div className="console-prompt">PS C:\Users\aboba&gt;</div>
              <pre className="console-output">{consoleOutput}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
