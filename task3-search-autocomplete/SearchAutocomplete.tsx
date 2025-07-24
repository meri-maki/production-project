import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchAutocomplete.module.scss';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
}

interface SearchAutocompleteProps {
  searchApi: (query: string) => Promise<SearchResult[]>;
  placeholder?: string;
  debounceTime?: number;
  onSelect?: (result: SearchResult) => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  searchApi,
  placeholder = 'Search...',
  debounceTime = 300,
  onSelect
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length > 0) {
        setIsLoading(true);
        setError(null);
        
        try {
          const searchResults = await searchApi(query);
          setResults(searchResults);
          setIsOpen(true);
        } catch (err) {
          setError('Failed to fetch results');
          setResults([]);
        }
        
        setIsLoading(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, debounceTime);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current.blur();
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelect(result);
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className={styles.highlight}>{part}</mark> : 
        part
    );
  };

  return (
    <div ref={searchRef} className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={styles.input}
          aria-label="Search"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        
        {isLoading && (
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul 
          id="search-results"
          className={styles.resultsList}
          role="listbox"
        >
          {results.map((result, index) => (
            <li
              key={result.id}
              className={`${styles.resultItem} ${
                index === selectedIndex ? styles.selected : ''
              }`}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className={styles.resultTitle}>
                {highlightMatch(result.title, query)}
              </div>
              <div className={styles.resultDescription}>
                {result.description}
              </div>
              <div className={styles.resultCategory}>
                {result.category}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && results.length === 0 && !isLoading && query.length > 0 && (
        <div className={styles.noResults}>
          {error || 'No results found'}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;