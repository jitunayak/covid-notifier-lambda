const AWS = require('aws-sdk')
const ses = new AWS.SES({ region: "ap-south-1" });
module.exports.notifyEmail = async (info) => {
    const body = "Sending a notification to Mr.Jitu Nayak regarding vaccines availibilty. "
    console.info(body)

    const subject = "COVID vaccines are available :)"

    const params = {
        Source: "jitunayak715@gmail.com",
        Destination: {
            ToAddresses: ["jitunayak715@gmail.com"],
        },
        Message: {
            Body: {
                Text: {
                    Data: body + info.name,
                },
            },
            Subject: {
                Data: subject,
            },
        },
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

