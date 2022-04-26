const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = (e)=>{
    let search = e.target.value; //user enetered data

console.log("Data ingresada",search);

$.ajax({
    url:'../assets/crud/buscador.php',
    type: 'POST',
    data:{search:search},

    success:function(response){
     let emptyArray = [];

     if(response){

     emptyArray = JSON.parse(response);

      console.log("EMPTY ARRAY", emptyArray[0].titulo);

        emptyArray = emptyArray.map((emptyArray)=>{
            // passing return data inside li tag
            let dat = JSON.stringify(emptyArray.titulo);
             console.log("DATA",dat);

            return emptyArray = `<li>${dat}</li>`;

        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }

  console.log("Response", emptyArray);
  
  }

 });
 function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;

}

}