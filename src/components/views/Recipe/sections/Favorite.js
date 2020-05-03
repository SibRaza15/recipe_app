import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { useSelector } from "react-redux";

function Favorite(props) {
  const user = useSelector((state) => state.user);

  const recipeId = props.id;
  const userFrom = props.userFrom;
  const recipeTitle = props.title;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    recipeId: recipeId,
    userFrom: userFrom,
    recipeTitle: recipeTitle,
  };

  const onClickFavorite = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    if (Favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to Remove From Favorite");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to Add To Favorite");
        }
      });
    }
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to get Favorite Number");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subcribed);
      } else {
        alert("Failed to get Favorite Information");
      }
    });
  }, []);

  return (
    <>
      <Button style={{ marginTop: "5px" }} onClick={onClickFavorite}>
        {" "}
        {!Favorited ? "Add to Favorite" : "Remove From Favorite"}{" "}
      </Button>
    </>
  );
}

export default Favorite;
