import express from 'express';

const delistarAPIRouter = express.Router();

delistarAPIRouter.post("/Account/user/register", async(req, res)=>{
    console.log("User Registration on DeliStarBackendSystem!!!");
    try{
        // let mohammad = i;
        await fetch(`http://localhost:8080/DeliStarBackend/Account/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
            // body: JSON.stringify({"name":"Dania","phone":"770233649","password":"Dania&m0"})
        }).
        then(response => response.json()).
        then(data => {
            console.log(Date().split(" ")[4], data);
            
            if(data.status !== '200'){
                return res.status(parseInt(data.status)).json({
                    ...data,
                    // "servers": ["Java Jersey JAX-RS", "express.js"]
                });
            }
            
            return res.status(200).json({
                ...data,
                // "servers": ["Java Jersey JAX-RS", "express.js"]
            });
        });
    }catch(error){
        console.log(`Something wrong: ${error.message}`);
        return res.status(500).json({
            mssg: error.message
        });
    }
});

delistarAPIRouter.post("/Account/user/signin", async (req, res) => {
    console.log("User Sign In on DeliStarBackendSystem!!!");
    try{
        // let mohammad =  i;
            await fetch(`http://localhost:8080/DeliStarBackend/Account/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
            // body: JSON.stringify({"name":"Dania","phone":"770233649","password":"Dania&m0"})
        }).
        then(response => response.json()).
        then(data => {
            console.log(Date().split(" ")[4], data);
            
            if(data.status !== '200'){
                return res.status(parseInt(data.status)).json({
                    ...data,
                    // "servers": ["Java Jersey JAX-RS", "express.js"]
                });
            }

            return res.status(200).json({
                ...data,
                // "servers": ["JAX-RS Jersey Java", "express.js"]
            });
        });
    }catch(error){
        console.log(`Something wrong: ${error.message}`);
        return res.status(500).json({
            "status": "500",
            "mssg": error.message
        });
    }
});


export default delistarAPIRouter;