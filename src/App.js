import React, {useState, useEffect} from 'react';
import Listings from './Components/Listings'
import { API_ID, API_KEY} from './Config'

import './App.css';


function App() {

  //Initialized states
  const [Search, setSearch] = useState("");
  const [Term, setTerm] = useState();
  const [Recipe, setRecipe] = useState([]);


//useEffect will run again if the Term state is updated
  useEffect(() => {
      getAPI();
  }, [Term]);

//method to retrieve recipes
  const getAPI = () => {
    fetch(`https://api.edamam.com/search?q=${Term}&app_id=${API_ID}&app_key=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setRecipe(response.hits)
    })
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

 const handleSubmit = (e) => {
   e.preventDefault();
   setTerm(Search);
   setSearch("");
 }

  return (
    <div className="App">

        <h1 style = {{textAlign: 'center'}}>The Recipe App</h1>

      <form  onSubmit = {handleSubmit}>
      <div className="row inputs">
        <div className="input-field col s6">
        <label htmlFor="first_name"> Search for Recipes</label>
          <input 
          className = "recipe-input"
          type = "text"
          value = {Search}
          onChange = {handleChange}
          />
        </div>
        <button 
            className="btn waves-effect waves-light button-input" 
            type="submit"
            onSubmit = {handleSubmit} 
            name="action">Search
              <i className="material-icons right">local_dining</i>
          </button>
    </div>
    </form>
   
   {/* 
   The listings component is used to create the recipe cards.
   Once data is retreived from the API, it'll be passed as props to the component. 
   */}
    {Recipe.map(i => (
      <Listings 
      title = {i.recipe.label} 
      calories = {i.recipe.calories}
      image = {i.recipe.image}
      URL = {i.recipe.url}
      ingredients = {i.recipe.ingredients}
       />
    ))}

    </div>
  );
}

export default App;