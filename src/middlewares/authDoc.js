async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;

    // LOCAL HOST
    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc"){
        return next();
    }

    // SENHA CERTA
    if(senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        return next();
    }

    // SENHA DIGITADA ERRADA
    if(senhaDigitada){
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post>
                <p style="color: red;">Senha Incorreta!</p>
                <label for="senhaDigitada">Senha da documentação:"</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada"/>
                <button type="submit">Entrar</button>
            </form>
        `))
    } else {
        // USUARIO NAO DIGITOU A SENHA E ESTA EM MODO PRODUÇÃO
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post>
                <label for="senhaDigitada">Senha da documentação:"</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada"/>
                <button type="submit">Entrar</button>
            </form>
        `))
    }
}

module.exports = authDocProducao;