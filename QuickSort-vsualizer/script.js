var container = document.getElementById("array");
  
function ClearItems(range){
    range.innerHTML = "";
}


function GenerateArray() {

    ClearItems(container);

    var arrLen = GetArrLen()
    for (var i = 0; i < arrLen; i++) {

        var value = Math.ceil(Math.random() * 100);
  
        var col = document.createElement("div");
  
        col.classList.add("column_block");

        col.style.height =
        `${value * 3}px`;

        var col_label = 
        document.createElement("label");
        col_label.classList.add("block_id");
        col_label.innerText = value;

        col.appendChild(col_label);
        container.appendChild(col);
    }
}


var count_container = document.getElementById("count");
  
function GenerateIdxs() {
    ClearItems(count_container);

    var arrLen = GetArrLen();
    for (var i = 0; i < arrLen; i++) {

        var idx = document.createElement("div");
  
        idx.classList.add("label_block");
        idx.innerText = i;

        count_container.appendChild(idx);
    }
}

var pointer_container = document.getElementById("pointer");

function GeneratePointers(){
    ClearItems(pointer_container);

    var arrLen = GetArrLen();
    for(let i = 0; i < arrLen; i++){
        var pointer = document.createElement("div");

        pointer.classList.add("pointer_block");
        pointer.innerHTML = "&#129137;";

        pointer_container.appendChild(pointer);
    }
}

function GetArrLen(){
    return document.getElementById("sliderLength").value;
}

function SetSortSpeed(){
    console.log("speed = " + document.getElementById("sliderSpeed").value);

    return document.getElementById("sliderSpeed").value;
}

function DisplayMessage(text){
    document.getElementById("message").innerText = text;
};



var btnNext = document.getElementById("forward");
var fastSort = false;
var speed = SetSortSpeed();

  
async function Partition(l, r) {

    let arrLen = GetArrLen();
    let cols = document.querySelectorAll(".column_block");
    let pointers = document.querySelectorAll(".pointer_block");

    var tempVal;
    var tempHeight;

    let pivotIdx = l++;

    cols[pivotIdx].style.backgroundColor = "beige";

    DisplayMessage(`Pivot = ${cols[pivotIdx].childNodes[0].innerText} at index = ${pivotIdx}`);
    if(fastSort){
        await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
    }else{
        await new Promise((resolve) =>{
            btnNext.addEventListener("click", resolve);
        });
    }
    
    
    while(true){

        while(Number(cols[l].childNodes[0].innerText) < Number(cols[pivotIdx].childNodes[0].innerText)){

            pointers[l].style.color = "blue"
           
            cols[l].style.backgroundColor = "blue";

            DisplayMessage(`${cols[l].childNodes[0].innerText} < pivot so move on`);
            if(fastSort){
                await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, speed)
                    );
            }else{
                await new Promise((resolve) =>{
                    btnNext.addEventListener("click", resolve);
                });
            }

            pointers[l].style.color = "white"
            l++;
            
            if(l >= arrLen){
                break;
            }
            //if cols[l] undefined occurs

            DisplayMessage(`left pointer pos = ${l}`);
            
        }
        if(l >= arrLen){
            l--;
        }
        pointers[l].style.color = "blue"

        while(Number(cols[r].childNodes[0].innerText) > Number(cols[pivotIdx].childNodes[0].innerText)){

            pointers[r].style.color = "blue"

            cols[r].style.backgroundColor = "green";

            DisplayMessage(`${cols[r].childNodes[0].innerText} > pivot so move on`);
            if(fastSort){
                await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, speed)
                    );
            }else{
                await new Promise((resolve) =>{
                    btnNext.addEventListener("click", resolve);
                });
            }
            
            pointers[r].style.color = "white"
            r--;
            

            DisplayMessage(`left pointer pos = ${r}`);
            

        }
        pointers[r].style.color = "blue"

        if(l >= r){
            DisplayMessage("Pointers have crossed");

            pointers[l].style.color = "white"
            pointers[r].style.color = "white"

            cols[r].style.backgroundColor = "red";
            cols[l].style.backgroundColor = "red";

            
            break;
        }

        if(Number(cols[l].childNodes[0].innerText) == Number(cols[r].childNodes[0].innerText)){
           
            
            cols[l].style.backgroundColor = "yellow";
            
            cols[r].style.backgroundColor = "yellow";

            DisplayMessage(`${cols[l].childNodes[0].innerText} = ${cols[pivotIdx].childNodes[0].innerText}`);
            if(fastSort){
                await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, speed)
                    );
            }else{
                await new Promise((resolve) =>{
                    btnNext.addEventListener("click", resolve);
                });
            }
            
            pointers[l].style.color = "white";
            pointers[r].style.color = "white";
            l++;
            r--;
        }
        else{


            DisplayMessage(`Swap ${cols[l].childNodes[0].innerText} and ${cols[r].childNodes[0].innerText}
            because ${cols[l].childNodes[0].innerText} > pivot`)
            if(fastSort){
                await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, speed)
                    );
            }else{
                await new Promise((resolve) =>{
                    btnNext.addEventListener("click", resolve);
                });
            }
            

            tempHeight = cols[l].style.height;
            tempVal = cols[l].childNodes[0].innerText;

            cols[l].style.height = cols[r].style.height;
            cols[r].style.height = tempHeight;

            cols[l].childNodes[0].innerText = cols[r].childNodes[0].innerText;
            cols[r].childNodes[0].innerText = tempVal;
        }

    }

    
    DisplayMessage(`Swap ${cols[r].childNodes[0].innerText} and ${cols[pivotIdx].childNodes[0].innerText}
    because ${cols[r].childNodes[0].innerText} < pivot`)

    if(fastSort){
        await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
    }else{
        await new Promise((resolve) =>{
            btnNext.addEventListener("click", resolve);
        });
    }
   

    tempHeight = cols[r].style.height;
    tempVal = cols[r].childNodes[0].innerText;

    cols[r].style.height = cols[pivotIdx].style.height;
    cols[pivotIdx].style.height = tempHeight;

    cols[r].childNodes[0].innerText = cols[pivotIdx].childNodes[0].innerText;
    cols[pivotIdx].childNodes[0].innerText = tempVal;

    DisplayMessage(`${cols[pivotIdx].childNodes[0].innerText} found a relative position`);

    return r;

}


async function QuickSort(l, r) {
    let sorted = false;

    if(l <= r && !sorted){
        var pivot = await Partition(l, r);

        if(pivot > 1){
            await QuickSort(l, pivot - 1);
        }
        if(pivot + 1 < r){
            await QuickSort(pivot + 1, r)
        }
    }
    else{
        sorted = true;
        DisplayMessage("Array sorted")
    }

}

async function StartFastSort(){
    fastSort = true;
    let btnStart = document.getElementById("start-fast");
    btnStart.disabled = true;
    let len = document.getElementById("sliderLength").value;
    let spd = document.getElementById("sliderSpeed").value;
    speed = spd;
    await QuickSort(0,  len - 1);  
}



async function StartSorting(){
    let btnStart = document.getElementById("start-step");
    btnStart.disabled = true;
    let len = document.getElementById("sliderLength").value;

    await QuickSort(0,  len - 1);  
}


GenerateArray();
  
GenerateIdxs();

GeneratePointers();
