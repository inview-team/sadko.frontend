import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';
import axios from 'axios';
import '../styles/SearchBar.css';

const SearchBar = ({ setVideoData, setSearchQuery }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Загрузка подсказок
  const fetchSuggestions = async (query) => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_SEARCH_API}/word/suggestions`, {
				params: { text: query }
			});
			const suggestions = Array.isArray(response.data.suggestions) ? response.data.suggestions : [];
			setSuggestions(suggestions);
		} catch (error) {
			console.error('Ошибка при загрузке подсказок:', error);
			setError('Ошибка при загрузке подсказок');
		} finally {
			setIsLoading(false);
		}
	};
	

  // Функция обертка для задержки выполнения функции
  const debouncedFetchSuggestionsRef = useRef(debounce(fetchSuggestions, 300));

  // Эффект для вызова функции при изменении ввода
  useEffect(() => {
    const debouncedFetchSuggestions = debouncedFetchSuggestionsRef.current;
    if (input.trim() !== "") {
      debouncedFetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [input]);

  // Обработчик изменения в поле ввода
  const onChange = (e) => {
    setInput(e.target.value);
    setError(null);
    setSelectedIndex(-1);
  };

  // Обработчик клика по подсказке
  const onClickSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); 
    search(suggestion);
  };

  // Обработчик очистки поля ввода
  const onClearInput = () => {
    setInput("");
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  // Обработчик нажатия клавиши в поле ввода
  const onKeyPress = async (e) => {
    if (e.key === 'Enter' && input.trim() !== "") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setInput(suggestions[selectedIndex]);
        setSuggestions([]);
        search(suggestions[selectedIndex]);
      } else {
        search(input);
      }
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    }
  };

  // Поиск видео
  const search = async (query) => {
		setIsLoading(true);
		setSuggestions([]);
		setSearchQuery(query);
		try {
			const response = await axios.get(`${process.env.REACT_APP_SEARCH_API}/search`, {
				params: { text: query }
			});
			const videoData = response.data;
			console.log('Загруженные данные видео:', videoData);
			setVideoData(videoData);
		} catch (error) {
			console.error('Ошибка при загрузке данных видео:', error);
			setError('Ошибка при загрузке данных видео');
		} finally {
			setIsLoading(false);
		}
	};
	
  return (
    <div className="input-wrapper">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          className="input-search"
          placeholder="Поиск"
          value={input}
          onChange={onChange}
          onKeyDown={onKeyPress}
        />
        {input && (
          <button className="clear-button" onClick={onClearInput}>
            <FontAwesomeIcon icon={faTimes} className="search-icon" />
          </button>
        )}
      </div>
      <div className="suggestions-wrapper">
        {isLoading && <div className="loading">Загрузка...</div>}
        {error && <div className="error">{error}</div>}
        {suggestions.length > 0 && (
          <div className="suggestions active">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => onClickSuggestion(suggestion)}
              >
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
