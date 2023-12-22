import axios  from 'axios';
import React, { useEffect, useState } from 'react'

export default Mpay = ({token}) =>{
  const [data,setData] = useState([]);
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}` );

  const lipaNaMpesaOnlinePasskey ="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const timestamp = new Date();
  const payload = {
    ShortCode: 600997,
    CommandID: "CustomerBuyGoodsOnline",
    amount: "1",
    MSISDN: "254719323196",
    BillRefNumber: "",
  };

  useEffect(()=>{
    const pushSTK = async()=>{
      try{
        const push = await axios.post(
          "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl",payload,{headers}
        );
        console.log(push.data)
      }catch(error){
        console.log("Error in Pusing Stk",error.message)
      }
    }
    pushSTK();
  },[])
  return null;
}
