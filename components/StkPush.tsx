//imported packages
import React from "react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//locally imported
import { PastableSpan } from "./PastableSpan";
import { ApiTitle } from "./ApiTitle";
import { BlockWrapper } from "./BlockWrapper";


export const StkPush = () => {
    const code = `
    import { stkPushRequest , STKPushRequestParam} from "daraja-kit";

    const myReqObj:STKPushRequestParam = {
      phoneNumber: "254719428019",
      amount: "100",
      callbackURL: "https://example.com/api/stk-push-callback",
      transactionDesc: "Payment for your service",
      accountReference: "user123@example.com",
    }

    const makeSTKPushRequest = async () => {
      try {
        const response = await stkPushRequest(myReqObj);
        console.log("STK Push Request Successful:", response);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    makeSTKPushRequest();
`;

const callBackCode = `
    import { STKPushErrorCallbackBody, STKPushSuccessfulCallbackBody} from "daraja-kit";
    import { NextRequest, NextResponse } from "next/server";
    
    const POST = async (req: NextRequest, res: NextResponse) => {
      const receivedResponse:STKPushSuccessfulCallbackBody | STKPushErrorCallbackBody = req.body;
    
      let successObj: STKPushSuccessfulCallbackBody;
      let errorObj: STKPushErrorCallbackBody;
    
      if (receivedResponse.Body.stkCallback.ResultCode === 0) {
        successObj = receivedResponse;
        //do something
      } else {
        errorObj = receivedResponse;
        //do something
      }
        //the below response doesn't matter but nextjs requires you to return something from Api route handlers
      return NextResponse.json({ received: true });
    };
`;

return (
    <section className="text-myGray">
        <ApiTitle text="Stk Push" />
         <p className="mt-5 ">
        The library exports a function{" "}
        <PastableSpan text="stkPushRequest" /> that takes an object as a
        parameter. the type of the object is{" "}
        <PastableSpan text="STKPushRequestParam" />. You can use the type to
        provide you with intellisense as you build out the object.
      </p>
      <p className="mt-5">
        Here is an example of how you can make a request in node .
      </p>
      <BlockWrapper code={code} />
      <p className="mt-5">
        The account reference param i have found to be required when using the
        api. If you don`t have an account reference or you don`t need it you
        might just include a random non-empty string.
      </p>
      <h4>Handling stk push callbacks</h4>
      <p>
        Daraja API sends the result of the STKPush Request after processing to
        the callback url you sent when making the request.
      </p>
      <div className="mt-5 rounded-md overflow-clip bg-blue-200 flex">
        <div className="bg-blue-500 w-2" />
        <div className="p-5 text-sm">
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon icon={faCircleInfo} className="text-brightGreen"/>
            <p className="text-myBgColor">Personal opinion.</p>
          </div>
          <p className="mt-2 text-myBgColor">
            I don`t like the way we send a callback url each time we make STK
            push requests, same thing with validation and confirmation urls, i
            feel this is something that i should just set on some dashboard
            somewhere and it just works. The way sanity and other platforms
            handle that. I really hope the engineers at safaricom work on that.
          </p>
        </div>
      </div>
      <p className="mt-5">
        Anyways the library exports two types{" "}
        <PastableSpan text="STKPushSuccessfulCallbackBody" /> and{" "}
        <PastableSpan text="STKPushErrorCallbackBody" /> that you can use to
        when processing daraja responses. Here is an example of how you can use
        the types in NextJS.
      </p>
      <BlockWrapper code={callBackCode} />
    </section>
)
}