async function editProductHandler(event) {
  event.preventDefault();
  const title = document
    .querySelector('input[name="edit-product-title"]')
    .value.trim();
  console.log('Title: ' + title);
  const description = document
    .querySelector('input[name="edit-product-description"]')
    .value.trim();
  const price = document
    .querySelector('input[name="edit-product-price"]')
    .value.trim();
  const file = document.querySelector('input[name="edit-product-img"]').files[0];
  console.log('File: ' + file);
  const userId = document.querySelector('input[name="edit-product-img"]').getAttribute('meta_user');
  console.log('User ID: ' + userId);

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const img_link = await fetch(`/api/products/image`, {
    method: "POST",
    body: JSON.stringify({
      file,
      userId,
      title
    }),
    headers: {
      "Content-Type": "application/json",
    }
  });

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
    }
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
