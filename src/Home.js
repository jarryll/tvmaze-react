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
            movies: [],
            sortBy: '',
            location:'',
            showDetails:'',
            wantMoreDetails: false
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
                    query: '',
                })

            })
            .catch(err => console.log ('Failed to fetch results', err.stack))
    }

    handleSearchAgain = () => {
        this.setState ({
            hasSearched: false,
            sortBy: '',
            wantMoreDetails: false
        })
    }

    handleSort = (e) => {
        this.setState({
            sortBy: e.target.value
        })
    }

    handleShowDetails = (e) => {

        const url = `http://api.tvmaze.com/shows/${e.target.id}?embed=cast`

        fetch(url)
        .then(res => res.json())
        .then(res => this.setState({
            showDetails: res,
            wantMoreDetails: true
        }))
        .catch(err => console.log(err.stack))
    }


    componentDidMount() {

        const getCityName = (lat, long) => {
            const url = `https://eu1.locationiq.com/v1/reverse.php?key=85771ba5df42a6&lat=${lat}&lon=${long}&format=json`;
            
            fetch(url)
                .then(res => res.json())
                .then(res => this.setState ({
                    location: res.display_name
                }))
                .catch(err => console.log(err.stack))
        } 

             //Get latitude and longitude;
        const successFunction = (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                getCityName(lat, long);
            }

        const errorFunction = (err) => {
            console.log(`ERROR(${err.code}): ${err.message}`)
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction, {enableHighAccuracy: true});         
        } 
    }


    componentDidUpdate (prevProps, prevState) {
        if (prevState.sortBy !== this.state.sortBy){
            switch(this.state.sortBy){
                case "ratings":
                    this.setState({
                        movies: prevState.movies.sort((a,b)=> {
                            if (a.show.rating.average > b.show.rating.average) {
                                return -1;
                            }
                            if (a.show.rating.average < b.show.rating.average) {
                                return 1;
                            }
                            return 0;
                        })

                    })
                    break;
                case "duration":
                    this.setState ({
                        movies: prevState.movies.sort((a,b)=>{
                            if (a.show.runtime > b.show.runtime) {return -1;}
                            if (a.show.duration < b.show.runtime) {return 1;}
                            return 0;
                        })
                    })
                    break;
            }
        }
    }


    render () {
        return(
            <div className="container">
                <h1>TVMaze React</h1>
                <p>You are at {this.state.location}</p>
                {this.state.hasSearched ? <Result results={this.state.movies} onSearchAgain={this.handleSearchAgain} sortBy = {this.handleSort} handleShowDetails={this.handleShowDetails} showDetails={this.state.showDetails} wantMoreDetails={this.state.wantMoreDetails} /> : <Search handleSearchInput={this.handleChange} onSubmitQuery={this.handleClick} query={this.state.query} /> }

            </div>
        )
    }
}