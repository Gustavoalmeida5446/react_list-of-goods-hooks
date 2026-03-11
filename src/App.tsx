import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = 'none',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  // 1. Handler unificado para os botões de ordenação
  const handleSort = (sortType: SortType) => {
    if (currentSort === sortType) {
      // Se já está ativo, inverte a ordem
      setIsReversed(prev => !prev);
    } else {
      // Se é um novo tipo, define o tipo e reseta o reverse
      setCurrentSort(sortType);
      setIsReversed(false);
    }
  };

  const getVisibleGoods = () => {
    let result = [...goodsFromServer];

    if (currentSort === SortType.Alphabetical) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (currentSort === SortType.Length) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const visibleGoods = getVisibleGoods();
  const isAnyFilterActive = currentSort !== SortType.Default || isReversed;

  const handleReset = () => {
    setCurrentSort(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isAnyFilterActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};