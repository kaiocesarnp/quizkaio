
//função referenciando o botão start
function Mudarestado(altern) {
	let display = document.getElementById(altern).style.display;
	if (display == "none")
	  document.getElementById(altern).style.display = 'block';
	else
	  document.getElementById(altern).style.display = 'none';
  }

let instrucao = document.querySelector('#instrucao') //seleciona h2
let recado = document.querySelector('#recado') //seleciona o article do id 'recado', o qual aparece a questão e seu respectivo numero
let pontos = 0 // variavel de pontos para o placar parcial
let placar = 0 // variavel do placar final


//variavéis das perguntas
let numquest = document.querySelector('#numquest') //seleciona o numero da questão
let pergunta   = document.querySelector('#pergunta') //seleciona a questão em si

//variavéis das respostas. Seleciona as alternais que são os <li>, que por sua vez estão dentro do <ol>
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')

// variavel selecionando o article com a class questoes.
let articleQuestoes = document.querySelector('.questoes')
//seleciona o ol, li com as alternativas
let alternativas = document.querySelector('#alternativas')


//Variavéis com a estrutura das questões no formato de objetos.
let quest0 = {
    numquest   : 0,
    pergunta     : "Pergunta",
    a : "Altern A",
    b : "Altern B",
    c : "Altern C",
    d : "Altern D",
    correta      : "0",
}

let quest1 = {
    numquest   : 1,
    pergunta     : "Qual a capital do Brasil?",
    a : "Salvador",
    b : "Brasilia",
    c : "Goiania",
    d : "Belo Horizonte",
    correta      : "Brasilia",
}

let quest2 = {
    numquest   : 2,
    pergunta     : "Quantas patas tem uma aranha?",
    a : "Quinze",
    b : "Oito",
    c : "Dez",
    d : "Doze",
    correta      : "Oito",
}

let quest3 = {
    numquest   : 3,
    pergunta     : "Quem pintou o quadro 'Mona Lisa'?",
    a : "Michelangelo",
    b : "Salvador",
    c : "Leonardo Da Vinci",
    d : "Pablo Picasso",
    correta      : "Leonardo Da Vinci",
}

let quest4 = {
    numquest   : 4,
    pergunta     : "Qual é a cor das famosas cabines telefônicas de Londres?",
    a : "Azul",
    b : "Verde",
    c : "Vermelha",
    d : "Branca",
    correta      : "Vermelha",
}

let quest5 = {
    numquest   : 5,
    pergunta     : "Qual é o país mais populoso do mundo?",
    a : "Brasil",
    b : "India",
    c : "Rússia",
    d : "China",
    correta      : "China",
}

//Variavel com array de objetos acomodando todas as questões
let questoes = [quest0, quest1, quest2, quest3, quest4, quest5]

let numero = document.querySelector('#numero') //variavel que diz em qual questão está
let total  = document.querySelector('#total') //define o tamanho do quiz, quantas questões tem

numero.textContent = quest1.numquest

let totalQuest = (questoes.length)-1
console.log("Total de questões " + totalQuest)
total.textContent = totalQuest

//Fazendo a 1ª questão para iniciar o jogo
numquest.textContent = quest1.numquest //o texto (textContent) do numero da questão é o numero da questao que está no objeto 'quest1'
pergunta.textContent   = quest1.pergunta //o texto da pergunta é a pergunta que está no objeto 'quest1'
a.textContent = quest1.a //o texto da alternativa A é a alternativa A da 'quest1'
b.textContent = quest1.b //o texto da alternativa B é a alternativa B da 'quest1'
c.textContent = quest1.c 
d.textContent = quest1.d 

//Configurando os valores iniciais da quest1
//Set atribute em value, passando os valores das questões. 1a, 1b, 1c... depois vem 2a, 2b, 2c...
//Desta forma é possível identificar cada questão unicamente, sendo possível inverter a ordem depois através de uma função
a.setAttribute('value', '1A')
b.setAttribute('value', '1B')
c.setAttribute('value', '1C')
d.setAttribute('value', '1D')


// função que monta as próximas questões
function proximaQuest(nquestao) {
    numero.textContent = nquestao //numero da questão
    //valores das questões, sendo iguais a 1ª, só que desta vez todas estão numa unica função
    numquest.textContent = questoes[nquestao].numquest
    pergunta.textContent   = questoes[nquestao].pergunta
    a.textContent = questoes[nquestao].a
    b.textContent = questoes[nquestao].b
    c.textContent = questoes[nquestao].c
    d.textContent = questoes[nquestao].d

    a.setAttribute('value', nquestao+'A')
    b.setAttribute('value', nquestao+'B')
    c.setAttribute('value', nquestao+'C')
    d.setAttribute('value', nquestao+'D')

}

//função para bloquear alternativas, adicionando a class 'bloqueado'
function bloquearAlternativas() {
    a.classList.add('bloqueado')
    b.classList.add('bloqueado')
    c.classList.add('bloqueado')
    d.classList.add('bloqueado')

}

//função para desbloquear alternativas, removendo a class 'bloqueado'
function desbloquearAlternativas() {
    a.classList.remove('bloqueado')
    b.classList.remove('bloqueado')
    c.classList.remove('bloqueado')
    d.classList.remove('bloqueado')

}

//função que verifica se a pessoa acertou a questão
function checar(nquestao, resposta) {

    //mostrando qual é a questão
    let numdaQuest = nquestao.value
    console.log("Questão " + numdaQuest)

    //resposta escolhida
    let respostSelecionada = resposta.textContent

    //resposta correta
    let certa = questoes[numdaQuest].correta

    //se a resposta escolhida é igual a certa, então + 2 pontos
    if(respostSelecionada == certa) {
        pontos += 2 // pontos recebe ele mais 2 pontos
    } else {
        //se errou, nada muda. Não ganha os pontos
    }

    // atualizar placar
    placar = pontos 
    instrucao.textContent = placar + " Pontos"  //placar recebe o numero de pontos, e exibe os pontos no lugar da 'instrução' que é o <h2>

    // após verificar se acertou, bloqueia a escolha de opcoes
    bloquearAlternativas()

    // função setTimeout para passar para a próxima questão e verifica se já está no final do quiz
    setTimeout(function() {
        //respostaEsta.textContent = '...'
        proxima = numdaQuest+1 //recebe o numero da questão + 1, ou seja, a próxima questão é a atual mais 1

        //se a proxima questao for maior que o total de questões, significa que chegou no final
        if(proxima > totalQuest) {
            console.log('FIM!')
            fimDoJogo()
        } else { //senão, passa para a próxima questão
            proximaQuest(proxima)
        }
    }, 200) //tempo para passar para a próxima questão: 200 milésimos de segundos
    desbloquearAlternativas() //após isso, desbloqueia as alternativas
}

//função de término do jogo
function fimDoJogo() {
    instrucao.textContent = "FIM!" //'FIM!' substitui a instrução do <h2>
    numquest.textContent = "" //numero da questão fica vazio

    //caso não tenha acertado nenhuma questão, então 0 ponto, senão 'pontos!'
    let pont = ''
    pontos == 0 ? pont = 'ponto!' : pont = 'pontos!'

    recado.textContent = "Ganhou " + pontos + " " + pont

    //zerar conteúdos do texto
    a.textContent = ""
    b.textContent = ""
    c.textContent = ""
    d.textContent = ""
    
    //zerar placar
    a.setAttribute('value', '0')
    b.setAttribute('value', '0')
    c.setAttribute('value', '0')
    d.setAttribute('value', '0')


    //ocultar o article das questões
    articleQuestoes.style.display = 'none'
}
