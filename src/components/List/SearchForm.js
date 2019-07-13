import React, { useState } from 'react';

const SearchForm = (props) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDescription, setSearchDescription] = useState('');

  return(
    <form onSubmit={(e) => props.onSubmit(e, searchTitle, searchDescription)}>
      <div>
        タイトル　:　
        <input
          type="text"
          name="title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      <div>
        説明内容　:　
        <input
          type="text"
          name="description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" name="button">検索</button>
      </div>
    </form>
  )
}

export default SearchForm;
