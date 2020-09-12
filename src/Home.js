import React from 'react';
import Search from './Search';
import Result from './Result';

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            error: false,
            query: '',
            hasSearched: false,
            movies: []
        }
    }

    //Functions
    handleChange = (e) => {
        this.setState ({
            query: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();

        const url = `http://api.tvmaze.com/search/shows?q=${this.state.query}`

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    hasSearched: true,
                    movies: res,
                    query: ''
                })
                
            })
            .catch(err => console.log ('Failed to fetch results', err.stack))
    }

    handleSearchAgain = () => {
        this.setState ({
            hasSearched: false
        })
    }
    
    componentDidMount() {

    }


    render () {
        return(
            <div>
                <h1>TVMaze React</h1>
                {this.state.hasSearched ? <Result results={this.state.movies} onSearchAgain={this.handleSearchAgain} /> : <Search handleSearchInput={this.handleChange} onSubmitQuery={this.handleClick} query={this.state.query} /> }
                         
            </div>
        )
    }
} 