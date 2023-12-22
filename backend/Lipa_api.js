// services/MpesaService.js
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = "https://sandbox.safaricom.co.ke/";
const businessShortCode = "174379";


  //timestamp generation..
  const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);
      const stringToBinary = (input) => {
        return input
          .split("")
          .map((char) => char.charCodeAt(0).toString(2))
          .join("");
      };

export const initiateMpesaSTKPush = async (
  accessToken
) => {


  const payload = {
    BusinessShortCode: 174379,
    Password: stringToBinary(
      `${businessShortCode}${lipaNaMpesaOnlinePasskey}${timestamp}`
    ),
    Timestamp: new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3),
    TransactionType: "CustomerPayBillOnline",
    Amount: "1",
    PartyA: "600981",
    PartyB: "600000",
    PhoneNumber: "254719323196",
    CallBackURL: "YOUR_CALLBACK_URL",
    AccountReference: "YOUR_ACCOUNT_REFERENCE",
    TransactionDesc: "Payment for goods/services",
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};
