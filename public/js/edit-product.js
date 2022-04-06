async function editProductHandler(event) {
  event.preventDefault();

  const title = document
    .querySelector('input[name="edit-product-title"]')
    .value.trim();
  const description = document
    .querySelector('input[name="edit-product-description"]')
    .value.trim();
  const price = document
    .querySelector('input[name="edit-product-price"]')
    .value.trim();
  const img_link = document
    .querySelector('input[name="edit-product-img_link"]')
    .value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      price,
      img_link,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-product-form")
  .addEventListener("submit", editProductHandler);
