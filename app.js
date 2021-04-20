const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById("searchPoke");

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  const res = await fetch(url);
  const data = await res.json();
  if(!data){
    alert("Something went wrong")
  } else{
    const pokemon = data.results.map((poke, index) => ({
      ...poke,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
        1}.png`,
      id: index + 1
    }));
    if (searchBar.value.length === 0) {
      displayPokemon(pokemon);
    } 
    searchBar.addEventListener("input", event => {
      let filteredPoke = pokemon.filter(poke => {
        return poke.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      pokedex.innerHTML = "";
      if(filteredPoke.length === 0){
        pokedex.innerHTML = "<h1>Sorry, no Pokemon left!</h1>"
      }
      displayPokemon(filteredPoke);
    });

  };
  }



const displayPokemon = pokemon => {
  pokemon.map(poke => {
    const listElt = document.createElement("li");
    listElt.classList = "card";
    listElt.addEventListener("click", () => {
      getPokemon(poke.id);
    });

    const imgElt = document.createElement("img");
    imgElt.src = `${poke.img}`;
    imgElt.classList = "card-img";

    const nameElt = document.createElement("h3");
    nameElt.textContent = `${poke.id}. ${poke.name}`;
    nameElt.classList = "card-title";

    listElt.appendChild(imgElt);
    listElt.appendChild(nameElt);

    pokedex.appendChild(listElt);
  });
};

const getPokemon = async id => {
  if (id <= 0 || id > 385){
    fetchPokemon();
    alert("No Pokemon left");
    const allNextBtns = document.querySelectorAll("#nextBtn");
    allNextBtns.forEach((btn) =>{
      btn.style.display = "none";
    })
    closePopup()
    document.getElementById("searchPoke").style.display = "block";

  } else {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const results = await fetch(url);
    const pokeInfo = await results.json();
    displayPopup(pokeInfo);
  }
};


const displayPopup = poke => {
  const allNextBtns = document.querySelectorAll("#nextBtn");
  allNextBtns.forEach((btn) =>{
    btn.style.display = "none";
  })
  document.getElementById("searchPoke").style.display = "none";
  const form = document.getElementById("searchForm");
  const nextBtn = document.createElement("p");
  nextBtn.setAttribute("id", "nextBtn");
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", function() {
    getPokemon(poke.id+1);
  });
  const prevBtn = document.createElement("p");
  prevBtn.setAttribute("id", "nextBtn");
  prevBtn.textContent = "Prev";
  prevBtn.addEventListener("click", function() {
    getPokemon(poke.id-1);
  });
  form.appendChild(prevBtn);
  form.appendChild(nextBtn);
  const type = poke.types.map(type => type.type.name).join(", ");
  const imgFront = poke.sprites.front_default;
  const imgBack = poke.sprites.back_default;
  const imgShiny = poke.sprites.front_shiny;
  const popupDiv = document.createElement("div");
  popupDiv.setAttribute("id", "popup");
  let closeBtn = document.createElement("button");
  closeBtn.setAttribute("id", "closeBtn");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    closePopup();
  });
  const classCard = document.createElement("div");
  classCard.setAttribute("class", "card");
  const imgEltFront = document.createElement("img");
  imgEltFront.src = `${imgFront}`;
  imgEltFront.classList = "card-img";
  const imgEltBack = document.createElement("img");
  imgEltBack.src = `${imgBack}`;
  imgEltBack.classList = "card-img";
  const imgEltShiny = document.createElement("img");
  imgEltShiny.src = `${imgShiny}`;
  imgEltShiny.classList = "card-img";
  const nameElt = document.createElement("h3");
  nameElt.textContent = `${poke.id}. ${poke.name}`;
  nameElt.classList = "card-title";
  const infoElt = document.createElement("p");
  infoElt.textContent = `Height: ${poke.height} | weight: ${poke.weight} | type: ${type}`;
  classCard.appendChild(imgEltFront);
  classCard.appendChild(imgEltBack);
  classCard.appendChild(imgEltShiny);
  classCard.appendChild(nameElt);
  classCard.appendChild(infoElt);
  classCard.appendChild(closeBtn);
  popupDiv.appendChild(classCard);
  pokedex.innerHTML = "";
  pokedex.appendChild(popupDiv);
};

const closePopup = () => {
  pokedex.innerHTML = "";
  document.getElementById("searchPoke").style.display = "block";
  let nextBtns = document.querySelectorAll("#nextBtn");
  if(nextBtns.length > 0){
    nextBtns.forEach((btn)=>{
      btn.style.display = "none"
    })
  }
  fetchPokemon();
};

fetchPokemon();
