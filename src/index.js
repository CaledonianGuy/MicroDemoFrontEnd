import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      searchType: 'Find_Films',
      numOfFilmToFind: '1',
      searchValue: '',
      valueURL: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.buildURL =this.buildURL.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // async componentDidMount() {
  //   const response = await fetch('/Find_Films_By_Genre/Horror/5');
  //   const body = await response.json();
  //   this.setState({films: body});
  // }

  async handleClick() {
    await this.buildURL();

    alert('Value URL: ' + this.state.valueURL);

    const response = await fetch(this.state.valueURL);
    const body = await response.json();
    this.setState({ films: body });
    console.log(body);
  }

  buildURL() {
    if (this.state.searchType === 'Find_Films_By_Actor') {
      let actorName = this.state.searchValue.split(" ");

      this.setState({
        valueURL: '/' + this.state.searchType + '/' + actorName[0] + '/' + actorName[1] + '/' + this.state.numOfFilmToFind
      });
    } else if (this.state.searchType === 'Find_Films_By_Genre') {
      this.setState({
        valueURL: '/' + this.state.searchType + '/' + this.state.searchValue + '/' + this.state.numOfFilmToFind
      });
    } else {
      this.setState({
        valueURL: '/' + this.state.searchType + '/' + this.state.numOfFilmToFind
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {films} = this.state;
    return (
      <div className="center">
        {/* Search Bar */}
        <div className="center">
          <form>
            <table className="centerTable">
              <tr>
                <td>Search by:</td>
                <td>
                  <select name="searchType" defaultValue={''} onChange={event => this.handleInputChange(event)}>
                    <option value="Find_Films">Random</option>
                    <option value="Find_Films_By_Genre">Genre</option>
                    <option value="Find_Films_By_Actor">Actor</option>
                  </select>
                </td>
                <td>
                  <input 
                    name="searchValue" 
                    type="text" 
                    defaultValue={''} 
                    onChange={event => this.handleInputChange(event)}
                    placeholder="Genre / Actor" 
                  />
                </td>
                <td>
                  <input 
                    name="numOfFilmToFind"
                    type="number" 
                    defaultValue={''}
                    onChange={event => this.handleInputChange(event)}
                    min="1" 
                    max="100" 
                  />
                </td>
                <td><button type="button" onClick={this.handleClick}>Search</button></td>
              </tr>
            </table>
          </form>
        </div>
        {/* Movie Data */}
        <div className="center">
          <h2>Films</h2>
          {films.map(film => 
            <div key={film.filmId} className="center movieCard">
              Title: {film.title} <br />
              Release Year: {film.releaseYear.split("-")[0]} <br />
              Rating: {film.rating} <br /><br />
              Description: {film.description}
            </div>
          )}
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);