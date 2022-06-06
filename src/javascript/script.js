/*---------- VARIÁVEIS INICIAIS ----------*/

let mario = document.querySelector('.mario');
let bala_de_canhao = document.querySelector('.bala-de-canhao');
let montanhas = document.querySelector('.montanhas');
let nuvens = document.querySelector('.nuvens');
let chao = document.querySelector('.chao');
let pontos = document.querySelector('#pontos_valor');    
let pontuacao=0;
let string_pontuacao=0;
let audio_tela_inicio=document.querySelector('#audio-tela-inicio');
let audio_tema=document.querySelector('#audio-tema');
let audio_game_over=document.querySelector('#audio-game-over');
let audio_pulo=document.querySelector('#audio-pulo');



/*---------- PULO DO MARIO ----------*/

document.addEventListener('keydown',pulo_mario);


/*---------- COLISÃO / FIM DO JOGO ----------*/

let checar_colisao = setInterval(()=>{colisao()},10);


/*---------- FUNÇÕES ----------*/

function iniciar_jogo(){
    document.getElementById('tela_start').style.display = "none";
    audio_tela_inicio.pause();
    audio_tema.play();
    bala_de_canhao.style.animation='animacao_bola-de-canhao 2.5s infinite linear';
}

function pulo_mario() {
    audio_pulo.currentTime=0.5;
    audio_pulo.volume=0.2;
    audio_pulo.play();
    mario.classList.add('pulo');
    setTimeout(()=>{mario.classList.remove('pulo');},600);
}

function parar_animacoes(){
    bala_de_canhao.style.animation='none';
    montanhas.style.animation='none';
    nuvens.style.animation='none';
    mario.style.animation='none';  
    chao.style.animation='none';
}

function atualizar_posicoes(posicao_bala_de_canhao,posicao_montanhas,posicao_nuvens,posicao_mario,posicao_chao){
    bala_de_canhao.style.left=`${posicao_bala_de_canhao}px`;
    montanhas.style.left=`${posicao_montanhas}px`;
    nuvens.style.left=`${posicao_nuvens}px`;
    mario.style.bottom=`${posicao_mario}px`;
    chao.style.left=`${posicao_chao}px`;
}

function mario_colisao(){
    mario.src='src/imagens/mario-colisao.png';
    mario.style.width='45px';
    mario.style.marginLeft='80px';
    mario.style.animation='animacao_mario-colisao 2s';
    setTimeout(()=>{mario.style.marginBottom='-150px';},2000);  
}

function atualizar_pontos (pontuacao){
    if (pontuacao<9) string_pontuacao = "000" + pontuacao;
    if (pontuacao>9 && pontuacao<99) string_pontuacao = "00" + pontuacao;
    if (pontuacao>99 && pontuacao<999) string_pontuacao = "0" + pontuacao;
    if (pontuacao>999) string_pontuacao = pontuacao;
    pontos.textContent = string_pontuacao;
}

function mostrar_tela_game_over(){
    document.getElementById('tela_game_over').style.display = "block";
    clearInterval(checar_colisao);
    audio_tema.pause();
    audio_tema.currentTime = 0;
    audio_game_over.play();
}

function reiniciar_animacoes(){
    bala_de_canhao.style.animation='animacao_bola-de-canhao 2.5s infinite linear';
    bala_de_canhao.style.left='';
    montanhas.style.animation='animacao_montanhas 30s infinite linear';
    montanhas.style.left='';
    nuvens.style.animation='animacao_nuvens 20s infinite linear';
    nuvens.style.left='';  
    chao.style.animation='animacao_chao 20s infinite linear';
    chao.style.left='';
    mario.style.animation='';
    mario.src='src/imagens/mario-yosh.gif';
    mario.style.width='90px';
    mario.style.marginLeft='';
    mario.style.bottom='0'; 
}

function reiniciar_jogo(){
    document.getElementById('tela_game_over').style.display = "none";
    reiniciar_animacoes();
    clearInterval(checar_colisao);
    pontuacao=0;
    atualizar_pontos(pontuacao);
    mario.style.marginBottom='30px';
    audio_tema.play();
    checar_colisao = setInterval(colisao, 10);
}

function colisao(){
    let posicao_bala_de_canhao = bala_de_canhao.offsetLeft;
    let posicao_montanhas = montanhas.offsetLeft;
    let posicao_nuvens = nuvens.offsetLeft;
    let posicao_chao = chao.offsetLeft;
    let posicao_mario = +window.getComputedStyle(mario).bottom.replace('px','');
    /*VERIFICAÇÃO COLISÃO*/ 
    if(posicao_bala_de_canhao<=120 && posicao_bala_de_canhao>25 && posicao_mario <80){
        parar_animacoes();
        atualizar_posicoes(posicao_bala_de_canhao,posicao_montanhas,posicao_nuvens,posicao_mario,posicao_chao);
        mario_colisao();
        mostrar_tela_game_over();
    }
    /*ADICIONAR PONTOS*/
    if(posicao_bala_de_canhao<=0){ 
        pontuacao=pontuacao+1;
        atualizar_pontos(pontuacao);
    }
}
