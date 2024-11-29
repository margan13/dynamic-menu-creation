import { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { Input, InputProps } from 'src/components/Input';

export interface SearchInputProps extends InputProps {
  suggestions: string[];
  onSelectSuggestion?: (url: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { autoFocus, suggestions = [], onSelectSuggestion, ...props },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      if (autoFocus) {
        const timeout = setTimeout(() => inputRef.current?.focus(), 0);
        return () => clearTimeout(timeout);
      }
    }, [autoFocus]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setShowSuggestions(!!value);
    };

    const handleSelect = (url: string) => {
      setInputValue(url);
      setShowSuggestions(false);
      onSelectSuggestion?.(url);
    };

    return (
      <div className="relative">
        <Input
          ref={mergeRefs([ref, inputRef])}
          placeholder={props.placeholder}
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          {...props}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full z-10 mt-1 w-full border border-gray-300 bg-white shadow-lg">
            {suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .map((suggestion) => (
                <li
                  key={suggestion}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  },
);
