import React from 'react'

function GenerateToken() {
  let headers = new Headers();

  const consumerKey = "FYFIuA4hlx9uRMEXIxJRf0qru5kVABGL";
  const consumerSecret = "NZVOC22IQLJ5yTQB";

  const auth = encode(`${consumerKey}:${consumerSecret}`);
  headers.append(
    "Authorization",
    `Bearer ${auth}`
  );
  fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers }
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}

export default GenerateToken

