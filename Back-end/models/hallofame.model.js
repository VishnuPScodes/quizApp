import mongoose from 'mongoose'


const HallofameSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    score:{
        type:Number
    }
})

 const WFF=mongoose.model('wholeofame',HallofameSchema)
export default WFF 