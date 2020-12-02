const ID_CONTEUDO = 'conteudo'
const ID_BTN_JOGAR = 'jogar'
const ID_BTN_MOSTRAR = 'mostrarTudo'
const ID_MENSAGEN = 'mensagem'
const ID_CARREGANDO = 'carregando'
const ID_CONTADOR = 'contador'
const CLASSE_INVISIBLE = 'invisible'


const util = Util
const MENSAGENS = {
    sucesso:{
        texto:'combinação correta!!',
        classe: 'alert-success'
    },
    error:{
        texto:'combinação incorreta!!',
        classe: 'alert-danger'
    }
}

class Tela {

    static obterCodigoHtml(item){

        return` 
        <div class="col-md-3">
        <div class="card" style="width: 50%;" onclick = " window.verificarSelecao('${item.id}' ,'${item.nome}')">
        <img src="${item.img}" name='${item.nome}' class="card-img-top" alt="batman">
        </div>
        <br>
        </div>
       
        `
    }

    static configuraBotaoVerificarSelecao(funcaoOnclick){
        window.verificarSelecao = funcaoOnclick
    }

    static alterarConteudoHtml(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringHtmlPelaImagem(itens){
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStringHtmlPelaImagem(itens)
        Tela.alterarConteudoHtml(codigoHtml)
    }
     static configuraBotaoJogar(funcaoOnClick){
         const btnJogar = document.getElementById(ID_BTN_JOGAR)
         btnJogar.onclick = funcaoOnClick
    }
    static exibirHerois(nomeHeroi, img){
        const elementosHtml = document.getElementsByName(nomeHeroi)
        elementosHtml.forEach((item => item.src = img))

    }
    static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_MENSAGEN)
        console.log('entrou')
        if(sucesso){
            elemento.classList.remove(MENSAGENS.error.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }else{
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.error.classe)
            elemento.innerText = MENSAGENS.error.texto
        }

         elemento.classList.remove(CLASSE_INVISIBLE)
         await util.timeout(1000)
         elemento.classList.add(CLASSE_INVISIBLE)
    }

    static exibirSpiner(mostrar = true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIBLE)
            return
        }
        carregando.classList.add(CLASSE_INVISIBLE)
    }

    static iniciarContador(){
        let contaAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        const identificadorNoTexto = "$$contador"
        const textoPadao =`Começando em ${identificadorNoTexto} segndos...`
        const atualizarTexto = () =>(elementoContador.innerHTML = textoPadao.replace(identificadorNoTexto, contaAte--))
        atualizarTexto()
        const idDoItervalo = setInterval(atualizarTexto,1000)
        return  idDoItervalo
    }

    static limparContador(idDoItervalo){
        clearInterval(idDoItervalo)
        document.getElementById(ID_CONTADOR).innerHTML =""
    }

    static configuraBotaoMostrarTudo(funcaoOnClick){
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR)
        btnMostrarTudo.onclick = funcaoOnClick
    }

}