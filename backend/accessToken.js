import React, { useEffect, useState } from "react";
import axios from "axios";
import { encode } from "base-64";

const AuthService = () => {
  const [token, setAccessToken] = useState([]);
  const [data, setData] = useState([]);

  const consumerKey = "FYFIuA4hlx9uRMEXIxJRf0qru5kVABGL";
  const consumerSecret = "NZVOC22IQLJ5yTQB";

  const auth = encode(`${consumerKey}:${consumerSecret}`);

  //headers for auth
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };


  useEffect(() => {
    const generateToken = async () => {
      try {
        // Step 1: Make the request to generate the access token
        const response = await axios.get(
          "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
          { headers }
        );

        console.log("token is", response.data.access_token);

      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    generateToken();
  }, []);

  return {token};
};

export default AuthService;
