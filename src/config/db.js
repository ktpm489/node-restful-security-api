import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
//const connect = () => mongoose.connect('mongodb://data/db/music_api')
const connect = () => mongoose.connect('mongodb://localhost/music_api', {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
},function (err){
    if (err) {
        console.log('Error', err)
    }
});
export default connect