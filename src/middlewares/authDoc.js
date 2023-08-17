async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;

    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/"){
        // LOCAL HOST
        return next();
    }

    if(senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        // SENHA CERTA
        return next();
    }

    if(senhaDigitada){
        // SENHA DIGITADA ERRADA
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <p style="color: red;">Senha Incorreta!</p>
                <label for="senhaDigitada">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada"/>
                <button type="submit">Entrar</button>
            </form>
        `));
        
    } else {
        // USUARIO NAO DIGITOU A SENHA E ESTA EM MODO PRODUÇÃO
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <label for="senhaDigitada">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada"/>
                <button type="submit">Entrar</button>
            </form>
        `))
    }
}

module.exports = authDocProducao;