const LoadOurNavBar = () => {
  /* AXIOS GET request to our navbar.html */

  axios
    .get("../components/navbar.html")

    .then((response) => {
      /* loads the fetched navbar.html into the OurNavBar div tag as innerHTML */

      document.getElementById("OurNavBar").innerHTML = response.data;
    })

    .catch((error) => {
      /* Console logs all errors*/
      console.error("Error:", error);
    });
}; /*load our nav bar ends here */

/** Function to load the add items form**/

const AddAndViewItems = () => {
  /* AXIOS GET request to our additems.html */

  /*add items*/
  axios
    .get("../components/additems.html")

    .then((response) => {
      /* loads the fetched additems.html into the AddAndViewItems div tag as innerHTML */

      document.getElementById("AddAndViewItems").innerHTML = response.data;
    })

    .catch((error) => {
      /* Console logs all errors*/
      console.error("Error:", error);
    });

  /* view items*/
  axios
    .get("../components/viewitems.html")

    .then((response) => {
      /* loads the fetched viewitems.html into the AddAndViewItems div tag as innerHTML */

      document.getElementById("AddAndViewItems").innerHTML += response.data;
    })

    .catch((error) => {
      /* Console logs all errors*/
      console.error("Error:", error);
    });
};

/*WAIT FOR THE PAGE TO LOAD */
document.addEventListener("DOMContentLoaded", () => {
  LoadOurNavBar();

  AddAndViewItems();
});
