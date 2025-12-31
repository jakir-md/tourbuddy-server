import axios from "axios";
import { EnvVars } from "../../../config/env";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";
export const sslPaymentInit = async (payload) => {
    try {
        const data = {
            store_id: EnvVars.SSL_STORE_ID,
            store_passwd: EnvVars.SSL_STORE_PASS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            //if payments falls in the categories bellow then we want to hit into the backend url
            //in the bakend url we will do some task
            //after that we want to redirect into the frontend url
            success_url: `${EnvVars.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&email=${payload.email}&status=success`,
            fail_url: `${EnvVars.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&email=${payload.email}&status=fail`,
            cancel_url: `${EnvVars.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&email=${payload.email}&status=cancel`,
            ipn_url: EnvVars.SSL_IPN_URL,
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: payload.address,
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1342",
            cus_country: "Bangladesh",
            cus_fax: "017111111",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: "N/A",
            ship_country: "N/A",
        };
        const response = await axios({
            method: "POST",
            url: EnvVars.SSL_PAYMENT_API,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return response.data;
    }
    catch (error) {
        console.log("Error In SSL Payment", error);
        throw new ApiError(statusCode.BAD_REQUEST, "Payment Error");
    }
};
//# sourceMappingURL=sslCommerz.service.js.map