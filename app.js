// const http=require("http");
// const listening=(req,res)=>{
//     switch(req.url)
//     {
//         case "/names":
//             res.end("hello sandeep");
//             break;
//         case "/age":
//             res.end("i am 23")
//             break;
//         default:
//             res.end("this endpoint is not accessable")
//     }
// }


            
            
//             const server=http.createServer(listening);

//             server.listen(8088,()=>{
//                 console.log("connected at ",8088)
//             })

const app=require("express")()
app.get("/",(req,res)=>{
    res.send("Welcome");
});
app.post("/:id",(req,res)=>{
    const p=req.params.id;
    res.send(`user sending ${p}`);
})
app.listen(8080);

function main(){
    appx();
    console.log("main")
    main();
}

function appx()
{
    console.log("appx")
}
appx()

function num()
{
    let a=-1,b=4,c=1,d;
    d=++a && ++b || ++c
    console.log(a,b,c,d)
}

num();