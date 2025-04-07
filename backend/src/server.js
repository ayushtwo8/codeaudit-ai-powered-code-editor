import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.get('/', (req, res) =>{
    res.send("Express");
})

async function main(){
    app.listen(process.env.PORT, () =>{
        console.log(`Server is running on ${process.env.PORT}`);
    })
}

main();