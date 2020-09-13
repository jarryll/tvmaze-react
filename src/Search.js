import React from 'react';

const Search = (props) => {
    const { handleSearchInput, onSubmitQuery, query } = props
    return (    
        <form className="form-group">
            <input type="text" onChange={ handleSearchInput} value={query} placeholder="Search shows here" className="form-control" />
            <button type="submit" onClick = {(e) => onSubmitQuery(e)} className="btn btn-primary">Search</button>
        </form>
    )
}

export default Search