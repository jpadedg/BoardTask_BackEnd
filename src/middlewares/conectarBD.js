const mongoose = require('mongoose');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados.js')


async function conectarBancoDados(req= null, res = null, next= null) {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {  useUnifiedTopology: true });
        console.log('Conectado ao banco de dados!!');
        try{ next() ; } catch { };
        return mongoose;
    } catch (error) {
        console.log(error);
        tratarErrosEsperados(res, 'Error: erro ao conectar ao banco de dados')
        return error;
    }
}

module.exports = conectarBancoDados;