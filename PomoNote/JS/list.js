const inputBox = document.getElementById("input-box");  
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData(); //saveData() called when adding task
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");   //adding checked class name
        saveData();  //saveData() called when checking task
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();    //remove tag if already on
        saveData(); //saveData() called when removing checked tag
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)  //saving everything in list container
}

//load + display data when returning

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}


showTask();