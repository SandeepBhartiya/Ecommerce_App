const Client=require('node-rest-client').Client

const client=new Client();

module.exports=(subject,content,recepient,requester)=>{
    const reqBody={
        subject:subject,
        recepientEmails:recepient,
        content:content,
        requester:requester
    }

    const reqHeader={
        "Content-Type":"application/json"
    }

    const args={
        data:reqBody,
        headers:reqHeader
    }
    try
    {
        client.post("http://localhost:8088/ecomm/api/v1/notifications",args,(data,res)=>{
            console.log("Request Sent");
            console.log(data);
        })
    }
    catch(err)
    {
        console.log(err.message)
    }
}