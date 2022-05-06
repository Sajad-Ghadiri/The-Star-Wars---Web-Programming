const center = document.getElementById("center"); // define center to use it global
// i defined the url which i need to fetch as a const to use it comfortable
const URL = "https://swapi.dev/api/films";
let page = 0; // define page to use it in second blur page to move between pages

async function get_data() {
  // make my blur screen empty
  page = 0;
  center.innerHTML = "";
  // making header for first blur page
  const header = document.createElement("h1");
  header.className = "main_header"; // give header a classname
  header.innerText = "The Star Wars Movies"; // give header a value

  center.appendChild(header);
  
  // making a ul for first blur page
  const ul1 = document.createElement("ul");
  ul1.className = "ulcss";
  ul1.id = "ul_1"; // give ul a id

  center.appendChild(ul1); // append ul to center block

  // fetching data from URL by calling get_movie_name function
  await get_movie_name(4);
  await get_movie_name(5);
  await get_movie_name(6);
  await get_movie_name(1);
  await get_movie_name(2);
  await get_movie_name(3);
}


async function get_movie_name(ith_film) {
  // fetching ith film from URL by adding ith_film variabel to URL 
  const film = await fetch(`${URL}/${ith_film}`); 
 // fetching json data from ith film
  const data = await film.json();

  // creating a li element to show the name of film
  const ul1 = document.getElementById("ul_1");
  const li1 = document.createElement("li");
  const div_starship = document.createElement("div"); // create a div to show starships
  div_starship.className = "div_starship"; // give div a classname

  
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  
  // according to pdf file i set p1 p2 p3 to one properties of film
  p1.innerText = data.title;
  p2.innerText = data.episode_id;
  p3.innerText = data.release_date;

  // creating a button to show the "starships" in front of every films
  const button = document.createElement("button");
  button.className = "button"; // give button a classname
  button.innerText = "Starships"; // give button a value
  button.onclick = () => partition(data.starships); // when button is clicked, call partition function

  // appending p1 p2 p3 to div_starship
  div_starship.appendChild(p1);
  div_starship.appendChild(p2);
  div_starship.appendChild(p3);
  div_starship.appendChild(button);

  // appending div_starship to li1
  li1.appendChild(div_starship);
  // appending li1 to ul1
  ul1.appendChild(li1);
}

async function partition(data) {
  center.innerHTML = ""; // with this line i make my blur center block empty to use it as a new page
  const div1 = document.createElement("div"); // div1 stands for whole blur block
  const div2 = document.createElement("div"); // div2 stands for left side of blur block to show Starships
  const div3 = document.createElement("div"); // div3 stands for right side of blur block to show details of starships
  const div4 = document.createElement("div");
  const div5 = document.createElement("div");
  div5.id = "buttomDiv";
  div4.className = "upDiv";
  div5.className = "downDiv";

  div1.className = "second"; // give second empty page a classname
  div2.className = "left"; // give left-side div with 50% width classname
  div3.className = "right"; // give right-side div with 50% width classname
  div3.id = "right";

  const header_left = document.createElement("h1"); // create a header for left-side block
  header_left.innerText = "starships"; // give the left header a value to show
  header_left.className = "left_header"; // give left header a classname

  div4.appendChild(header_left); // append left header to its div block

  const ul_partition = document.createElement("ul"); // ?
  ul_partition.id = "ul_partition"; // ?

  div4.appendChild(ul_partition); // ?

  // appending div2 (left-side block) and div3 (right-side block) to div1 (blur second page)
  div2.appendChild(div4);
  div2.appendChild(div5);
  div1.appendChild(div2);
  div1.appendChild(div3);
  // append div1 to center block
  center.appendChild(div1);
  const ships = data.slice(page * 10, (page + 1) * 10);
  makeButton(data, ships);
  // now i use slice method to separate json data ( i set 0 to 10 limitation of showing data)
  // and then i use map method to take and show data
  //  i call fetch_button function to fetch the data from URL
  ships.map((e) => fetch_button(e));
}

async function fetch_button(input) {
  const starship_data = await fetch(input);
  const data_left = await starship_data.json();
  const ul_button = document.querySelector("#ul_partition");

  const li_2 = document.createElement("li");
  li_2.className = "li_2";

  const button2 = document.createElement("button");
  button2.innerText = data_left.name;

  button2.onclick = () => fetch_right(data_left);
  button2.className = "button2";
  li_2.appendChild(button2);
  ul_button.appendChild(li_2);
}
async function fetch_right(data) {
  // create a header to show the name of starship bigger
  const header_name = document.createElement("h1");
  header_name.innerText = data.name;
  header_name.className = "right_header";

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const div_right = document.createElement("div");
  div_right.className = "div_right";

  // set classname for p1 to p4
  p1.className = "model_info";
  p2.className = "manufacturer";
  p3.className = "crew";
  p4.className = "passengers";

  // set text for p1 to p4
  p1.innerText = data.model;
  p2.innerText = data.manufacturer;
  p3.innerText = data.crew;
  p4.innerText = data.passengers;

  // appending right_header and p1 p2 p3 p4 to div_right block
  div_right.appendChild(header_name);
  div_right.appendChild(p1);
  div_right.appendChild(p2);
  div_right.appendChild(p3);
  div_right.appendChild(p4);

  const show = document.querySelector("#right"); // right is class name 
  show.innerHTML = ""; // make right empty to use it as a new page
  show.appendChild(div_right);
}
function makeButton(data, ships) {
  const div = document.querySelector("#buttomDiv");
  const but1 = document.createElement("button");
  const but2 = document.createElement("button");
  const but3 = document.createElement("button");
  const p = document.createElement("p");
  const div2 = document.createElement("div");
  div2.className = "buttomsDiv";
  but1.onclick = () => upPage(data, ships);
  but2.onclick = () => downPage(data);
  but1.innerText = "Next";
  but2.innerText = "Prev";
  but3.innerText = "Back";

  // page label for down div which includes buttons
  p.innerText = `PAGE-${page + 1}`;
  but3.onclick = () => get_data();  // when back button is clicked, call get_data function
  // append buttons to div
  div2.appendChild(but2);
  div2.appendChild(p);
  div2.appendChild(but1);
  div.appendChild(div2);
  div.appendChild(but3);
}

// check length of data and if it is less than 10 then allow to go to next page
function upPage(data, ships) {
  if (ships.length == 10) //  checking condition to allow to go to next page
   {
    page = page + 1;
    partition(data); // call partition function when next button is clicked 
  }
}

function downPage(data) {
  if (page > 0) {
    page = page - 1;
    partition(data);
  }
}

get_data();
