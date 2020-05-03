import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Typography, Popover, Button } from "antd";

const { Title } = Typography;

export default function FavoritePage() {
  // user will be used to extract login data from the redux store
  const user = useSelector((state) => state.user);

  //initialize my states
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);

  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoredRecipe();
  }, []);

  const fetchFavoredRecipe = () => {
    axios.post("/api/favorite/getFavoredRecipe", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
        setLoading(false);
      } else {
        alert("Failed to retrieve favorites");
      }
    });
  };

  const onClickDelete = (recipeId, userFrom) => {
    const variables = {
      recipeId: recipeId,
      userFrom: userFrom,
    };

    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredRecipe();
        } else {
          alert("Failed to remove from favorites");
        }
      });
  };

  const renderTable = Favorites.map((favorite, index) => {
    return (
      <tr key={index}>
        <Popover title={`${favorite.recipeTitle}`}>
          <td>{favorite.recipeTitle}</td>
        </Popover>
        <td>
          <Button
            onClick={() => onClickDelete(favorite.recipeId, favorite.userFrom)}
          >
            {" "}
            Remove{" "}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div
      style={{ width: "85%", margin: "3rem auto", backgroundColor: "white" }}
    >
      <Title level={2}> Favorite Recipes </Title>
      <hr />
      {user.userData && !user.userData.isAuth ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Please Log in to see this page</p>
          <a href="/login">Go to Login page</a>
        </div>
      ) : (
        !Loading && (
          <table>
            <thead>
              <tr>
                <th>Recipe Name</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
            <tbody>{renderTable}</tbody>
          </table>
        )
      )}
    </div>
  );
}
