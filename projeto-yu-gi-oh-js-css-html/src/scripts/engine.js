//criando os states da engine
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points'),
    },

    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },

    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },

    playerSides: {
        player1: 'player-cards',
        player1BOX: document.querySelector("#player-cards"),
        computer: 'computer-cards',
        computerBOX: document.querySelector("#computer-cards"),
    },

    actions: {
        buttom: document.getElementById('next-duel'),
    },
}

//dando sentido às cartas (enumerando)
const pathImages = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: `${pathImages}dragon.png`,
        WinOff: [1],
        LoseOff: [2],
    },

    {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: `${pathImages}magician.png`,
        WinOff: [2],
        LoseOff: [0],
    },

    {
        id: 2,
        name: 'Exodia the Forbidden One',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        WinOff: [0],
        LoseOff: [1],
    }
]

//implementação dos métodos
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    return cardImage;
}

//Essa função chama as outras funções. Técnica de Extract to Method
async function setCardsField(cardId){
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImages(true);

    await hiddenCardDetails();

    await drawCardsInField (cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();

    await drawButtom(duelResults);
}

// lista defunções extraídas no método
async function drawCardsInField (cardId, computerCardId){
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
} 

async function showHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }

    if (value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

//tira as informações da carta anterior da tela
async function hiddenCardDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function drawButtom(text) {
    state.actions.buttom.innerText = text.toUpperCase();
    state.actions.buttom.style.display = "block";
}

async function updateScore(){
    state.score.scoreBox.innerText = `WIN: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

//descobrindo quem ganhou
async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "draw"; //draw é empate
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOff.includes(computerCardId)){
        duelResults = "win";
        await playAudio(duelResults)
        state.score.playerScore ++;
    } 
    if (playerCard.LoseOff.includes(computerCardId)){
        duelResults = "lose";
        await playAudio(duelResults)
        state.score.computerScore ++;
    }
    return duelResults;
}

//criando a função que remove as cartas do campo após a seleção
async function removeAllCardsImages(){
    let {computerBOX, player1BOX} = state.playerSides;

    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach(img => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach(img => img.remove());
}

//criando a função de carta selecionada
async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute: " + cardData[index].type;
}

//assinatura dos métodos principais
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

//reseta visualmente as cartas
async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.buttom.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    //chama a função para recomeço
    init();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();

    try {
        audio.play();
    }   catch {};
}

function init() {

    showHiddenCardFieldsImages(false);

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();