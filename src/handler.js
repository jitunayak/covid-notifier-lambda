const axios = require("axios");
const { notifyEmail } = require("./notifyEmail");

module.exports.hello = async (event) => {
  const cowinBaseURL =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?";

  const date = new Date();
  date.setDate(date.getDate() + 1);
  const tomorrowDate = `${date.getDate()}-${date.getMonth() + 1
    }-${date.getFullYear()}`;

  const response = await axios
    .get(cowinBaseURL + `pincode=00000&date=${tomorrowDate}`)
    .then(function (response) {
      const result = response.data.sessions;
      const foundCenter = result.find((e) => e.center_id === 854829);
      if (foundCenter != undefined) {
        console.log("Vaccines are found for your location :) . Sending you an email")

        //We will notify the user by email
        notifyEmail(foundCenter)
        return {
          statusCode: 200,
          body: JSON.stringify(foundCenter),
        };
      } else {
        console.log(`vaccines are not available for Badaro as of ${new Date().toISOString()}`);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "error, check log", error: error }),
      };
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  return response;
};
