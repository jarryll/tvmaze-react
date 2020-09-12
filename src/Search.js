import React from 'react';

const Search = (props) => {
    const { handleSearchInput, onSubmitQuery, query } = props
    return (    
        <form>
            <input type="text" onChange={ handleSearchInput} value={query} placeholder="Search shows here" />
            <button type="submit" onClick = {(e) => onSubmitQuery(e)}>Search</button>
        </form>
    )
}

export default Search