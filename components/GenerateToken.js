import { StkPush } from "./StkPushFile";
import { encode } from "base-64";

export default function HandlePay() {
  const custKey = "FYFIuA4hlx9uRMEXIxJRf0qru5kVABGL";
  const custSec = "NZVOC22IQLJ5yTQB";

  const auth = encode(`${custKey}:${custSec}`);
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
  return fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers }
  )
    .then((response) => response.json()) // Parse the response as JSON
    .then((result) => {
      const accessToken = result.access_token;
      console.log("Access Token:", accessToken);
      StkPush(accessToken); // Pass the access token to StkPush function
      return accessToken; // Return the access token
    })
    .catch((error) => {
      console.log("HandlePay error", error);
      throw error; // Propagate the error
    });
}
