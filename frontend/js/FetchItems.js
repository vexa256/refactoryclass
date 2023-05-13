const createRow = (item) => {
  // Convert the SQLite timestamp to a JavaScript Date object
  const date = new Date(item.created_at);

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
        <tr>
            <td>${item.id}</td>
            <td>${item.item_name}</td>
            <td>${item.quantity}</td>
            <td>${formattedDate}</td>
            <td><button class="delete-button" data-id="${item.id}">Delete</button></td>
        </tr>
      `;
};

const fetchAndDisplayItems = () => {
  axios
    .get("http://localhost:3000/")
    .then((response) => {
      console.log(response.data);
      let rows = "";
      response.data.forEach((item) => {
        rows += createRow(item);
      });
      document.getElementById("table-body").innerHTML = rows;

      // Add event listeners to the delete buttons
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const itemId = this.getAttribute("data-id");

          alert(`http://localhost:3000/DeleteItem/${itemId}`);
          axios
            .delete(`http://localhost:3000/DeleteItem/${itemId}`)
            .then(() => {
              // After the item is deleted, fetch and display the items again
              fetchAndDisplayItems();
            })
            .catch(console.error);
        });
      });
    })
    .catch(console.error);
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(fetchAndDisplayItems, 1300);

  setInterval(fetchAndDisplayItems, 2000);
});
