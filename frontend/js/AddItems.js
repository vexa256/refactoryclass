const SendItemsToTheDatabase = () => {
  document
    .getElementById("SendItemsToTheDatabaseForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally

      /* get all the form fields and their values for sending to the backend */

      var itemNameFormValue = document.getElementById("item_name").value;
      var quantityFormValue = document.getElementById("quantity").value;

      axios
        .post("http://localhost:3000/CreateItem", {
          item_name: itemNameFormValue,
          quantity: quantityFormValue,
        })
        .then(function (response) {
          console.log(response.data);

          Swal.fire("Success", response.data.status, "success");
        })
        .catch(function (error) {
          console.log(error);
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(SendItemsToTheDatabase, 1300);
});
