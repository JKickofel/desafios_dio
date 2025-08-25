
async function fetchProfileData() {
    //Sobe o projeto para o Github;
    //Vai em data/profile.json e clica em raw (topo direito);
    //Vai aparecer o arquivo de json no navegador; 
    //Copia esse link e cola aqui.
    const url = 'https://raw.githubusercontent.com/JKickofel/JKickofel.github.io/refs/heads/main/portfolio-js/data/profile.json';
    const response = await fetch(url)
    const profileData = await response.json()
    return profileData
}