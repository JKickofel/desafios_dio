//switch case
const prompt = require('prompt-sync')();

// repete até ter um nome válido
let nome = "";
while (!nome) {
    nome = prompt("Vamos descobrir o quão forte o seu Herói é? Mas primeiro, qual o nome do seu Herói: ");
    if (!nome) {
    console.log("⚠️ O Herói precisa ter um nome para ser reconhecido nas futuras canções que farão sobre sua bravura! Por favor, digite um nome!");
    }
}

let xp;
while (true) {
    xp = prompt("Agora, quanto XP o Herói " + nome + " tem? Digite um valor entre 0 e 11.000: ");

    if (xp) {
    // remove pontos e vírgulas
    xp = xp.replace(/[.,]/g, "");

    // tenta converter para número
    xp = parseInt(xp);

    // se for número válido, sai do loop
    if (!isNaN(xp)) {
        break;
    } else {
        console.log("⚠️ Opa! Você precisa digitar um número mesmo. Tente novamente.");
    }
} else {
    console.log("⚠️ Não tenha vergonha se o seu Herói ainda é fraquinho! Digite um valor numérico para o XP do " + nome + "!");
}
}

let nivel;

switch (true) {
  case (xp < 1000):                     //Se XP for menor do que 1.000 = Ferro
    nivel = "ferro"; 
    break;
  case (xp > 1000 && xp <= 2000):      //Se XP for entre 1.001 e 2.000 = Bronze
    nivel = "bronze";
    break;
  case (xp > 2000 && xp <= 5000):       //Se XP for entre 2.001 e 5.000 = Prata
    nivel = "prata";
    break;
  case (xp > 5000 && xp <= 7000):       //Se XP for entre 5.001 e 7.000 = Ouro
    nivel = "ouro";
    break;
  case (xp > 7000 && xp <= 8000):       //Se XP for entre 7.001 e 8.000 = Platina
    nivel = "platina";
    break;
  case (xp > 8000 && xp <= 9000):       //Se XP for entre 8.001 e 9.000 = Ascendente
    nivel = "ascendente";
    break;
  case (xp > 9000 && xp <= 10000):      //Se XP for entre 9.001 e 10.000= Imortal
    nivel = "imortal";
    break;
  case (xp > 10000 && xp < 11001):                    //Se XP for maior ou igual a 10.001 = Radiante
    nivel = "radiante";
    break;
  default:
    nivel = "Você tem certeza desse número?";
}

console.log("O Herói de nome " + nome + " está no nível " + nivel + "!");
