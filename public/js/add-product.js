async function newProductHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="product-title"]').value;
  const description = document.querySelector(
    'input[name="product-description"]'
  ).value;
  const price = document.querySelector('input[name="product-price"]').value;
  const img_link = document.querySelector('input[name="product-url"]').value;

  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      price,
      img_link,
    }),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-product-form")
  .addEventListener("submit", newProductHandler);
