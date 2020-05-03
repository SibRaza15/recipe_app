import React from "react";
import Favorite from "../sections/Favorite";
import { useSelector } from "react-redux";

export default function Recipe_Tiles({
  title,
  calories,
  image,
  URL,
  ingredients,
  id,
}) {
  const user = useSelector((state) => state.user);

  return (
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src={image} alt="this is a recipe" />
      </div>
      <div class="card-content">
        <span
          class="card-title activator grey-text text-darken-4"
          style={{ fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}
        >
          {title}
          <i class="material-icons right">more_vert</i>
        </span>
        <br />
        <hr
          style={{ width: "40%", marginLeft: "90px", marginBottom: "10px" }}
        />
        <p>
          {" "}
          Calories: {Math.floor(calories)} | Ingredients: {ingredients.length}
        </p>
        <br />
        <p>
          <a href={URL}>View The Complete Recipe Here</a>
        </p>
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <Favorite
            title={title}
            recipeId={id}
            userFrom={localStorage.getItem("userId")}
          />
        </div>
      </div>

      <div class="card-reveal">
        <span
          class="card-title grey-text text-darken-4"
          style={{
            fontSize: "15px",
            lineHeight: "20px",
            fontWeight: "700",
            marginRight: "20px",
            marginTop: "50px",
          }}
        >
          Ingredients List:<i class="material-icons right">close</i>
        </span>
        <ol>
          {ingredients.map((i) => (
            <li style={{ marginLeft: "-40px" }}>{i.text}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
