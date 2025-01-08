import React from 'react';
import { Collection } from './Collections';
import './index.scss';

const cats = [
  { "id": 0, "name": "Все" },
  { "id": 1, "name": "Море" },
  { "id": 2, "name": "Горы" },
  { "id": 3, "name": "Архитектура" },
  { "id": 4, "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3; // Set items per page to ensure 3 pages

  React.useEffect(() => {
    setIsLoading(true);
    const fetchUrl = `https://66fb00ee8583ac93b40a9d2c.mockapi.io/Collections`;

    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        setCollections(json);
      })
      .catch(error => {
        console.warn(error);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Filter collections based on category and search value
  const filteredCollections = collections.filter(obj => {
    const matchesCategory = categoryId === 0 || obj.category === categoryId;
    const matchesSearch = obj.name.toLowerCase().includes(searchValue.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollections.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages (fixed to 3)
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

  // Reset current page when search value changes or category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj) => (
            <li 
              key={obj.id} 
              onClick={() => setCategoryId(obj.id)} 
              className={categoryId === obj.id ? 'active' : ''}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <label htmlFor="search-input" className="search-label">Поиск по названию:</label>
        <input 
          id="search-input" 
          value={searchValue} 
          onChange={e => setSearchValue(e.target.value)} 
          className="search-input" 
          placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          currentItems.length > 0 ? (
            currentItems.map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
          ) : (
            <h2>Нет коллекций для отображения</h2>
          )
        )}
      </div>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <li 
            key={index} 
            onClick={() => setCurrentPage(index + 1)} 
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
