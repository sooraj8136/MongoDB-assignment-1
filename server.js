const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

async function main() {
    await mongoose.connect('mongodb+srv://soorajcpchathanathparampil:Todo_password@cluster0.5iova.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

main()
.then(()=> {
    console.log("MongoDB Connected")
})

const DataSchema = new mongoose.Schema({
    name: String,
});

const Data = mongoose.model('data', DataSchema);

app.use(express.json())

app.get('/', async(req, res) => {
    let data = await Data.find({})
    res.send(data)
})

app.post('/', (req, res) => {
    let data = new Data(req.body)
    data.save(data)
    res.send("Reponse for POST requsest")
})

app.put('/:id', (req, res) => {
    let id = req.params.id
    let data = req.body
    Data.findByIdAndUpdate(id, data).exec()
    res.send("Reponse for PUT requsest")
})

app.delete('/:id', (req, res)=> {
    let id = req.params.id
    Data.findByIdAndDelete(id).exec()
    res.send("Reponse for DELETE requsest")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})