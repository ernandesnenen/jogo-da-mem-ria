class LGame{

    constructor({tela, util}){

        this.tela = tela
        this.util = util
        this.heroisIniciais= [
            {img:'./arquivos/Batman.png',nome:'batman'},
            {img:'./arquivos/HomemAranha.png',nome:'HomemAranha'},
            {img:'./arquivos/Ironman.png',nome:'Ironman'},
            {img:'./arquivos/mulherMaravilha.png',nome:'mulherMaravilha'}
        ]
        this.imgPadrao ='./arquivos/padrao.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }

    inicializar(){
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configuraBotaoJogar(this.jogar.bind(this))
        this.tela.configuraBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configuraBotaoMostrarTudo(this.mostrarTodosHerois.bind(this))
    }

    async embaralhar(){
        const copias = this.heroisIniciais.concat(this.heroisIniciais)
        .map(item =>{
            return Object.assign({}, item, {id: Math.random()/0.5})
        })
        .sort(()=>Math.random()-0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirSpiner()

        const idDoIntervalo = this.tela.iniciarContador()
        
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirSpiner(false)
      
        
    }

    esconderHerois(herois){
        
        const heroisOcultos = herois.map(({nome, id})=>({
            id,
            nome,
            img:this.imgPadrao
        })) 
        this.tela.atualizarImagens(heroisOcultos)
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeHeroi){

        const {img} = this.heroisIniciais.find(({nome})=> nome === nomeHeroi)
        this.tela.exibirHerois(nomeHeroi, img)

    }

    verificarSelecao(id, nome){
       const item = {id, nome}
       const heroisSelecionados = this.heroisSelecionados.length
       switch (heroisSelecionados) {
           case 0:
               this.heroisSelecionados.push(item)
               break;
           case 1:
               const [opcao1] = this.heroisSelecionados
               this.heroisSelecionados = []
               if(opcao1.nome === item.nome && opcao1.id !== item.id){

                this.exibirHerois(item.nome)
                this.tela.exibirMensagem()
                return
               }
              
               this.tela.exibirMensagem(false)
               break;
       
           
       }

    }

    mostrarTodosHerois(){
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos){
            const {img} = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }


    jogar(){
        this.embaralhar()
    }
}