//Handle Payment through Mpesa
import { encode } from "base-64";

export const StkPush = async (accessTk) => {
  try {
    console.log("Access Token here", accessTk);

    const headers = {
      Authorization: `Bearer ${accessTk}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          BusinessShortCode: 174379,
          Password:
            "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMxMjIyMjMyNDI1",
          Timestamp: "20231222232425",
          TransactionType: "CustomerPayBillOnline",
          Amount: 1,
          PartyA: "254719323196",
          PartyB: 174379,
          PhoneNumber: "254719323196",
          CallBackURL: "https://mydomain.com/path",
          AccountReference: "HHRD SDLC NAIROBI",
          TransactionDesc: "Payment of Cakes Purchased",
        }),
      }
    );

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log("Stk error", error.message);
  }
};
