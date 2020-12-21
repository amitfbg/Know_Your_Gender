/* 
@Description: API Fetching using async await method
@Author: Amit Kumar
*/
let submitButton = document.getElementById("formsubmitbutton");
let loaderLogo = document.getElementById("loader");
let outputBox = document.getElementById("outputBox");


/* 
@function: formSubmited
@Description: checking if it is blank or not
               If blank reset the form
               Else call the function hide_show and call setTimeout function
*/
function formSubmited() {
    let inp = document.myForm.Name.value.trim();
    //Input value taken from user input
    if (inp == "") {
        resetForm();
    }
    else {
        hide_show(submitButton, loaderLogo);
        setTimeout(() => {
            apiFetch(inp);
        }, 3000);
    }
}

/* 
@function: apiFetch
@param: inp --input variable
@Description: This will fetch the data from given api
*/
async function apiFetch(inp) {
    try{
    hide_show(loaderLogo, outputBox);
    const response = await fetch(`https://api.genderize.io/?name=${inp}`);
    let resData = await response.json();
    let output = "";
    //Checking if the gender is null or not
    if (!resData.gender) {
        output = "Invalid Name!!!!!";
    }
    else {
        output += `
                <li><span>Name</span> : ${resData.name}</li>
                <li><span>Gender</span> : ${resData.gender}</li>
                <li><span>Probability</span> : ${resData.probability}</li>
            `
    }
    document.getElementById("output").innerHTML = output;
    document.getElementById("recheck").style.display = "block";
    }
    //if we caught some error
    catch {
        hide_show(loaderLogo, outputBox);
        document.getElementById("output").innerHTML = "OOPS!!!";
        document.getElementById("recheck").style.display = "block";
    }
}

/* 
@function: resetForm
@Description: It will reset the form and hide the output and show to input box
*/
function resetForm() {
    document.myForm.reset();
    hide_show(outputBox, submitButton);
    document.getElementById("output").innerHTML = "";
}

/* 
@function: hide_show
@Description: This function takes two argrument which is ID of the element and it will change
               css property style of that ID one will make the id disable and other will enable
*/
function hide_show(hide, show) {
    hide.style.display = "none";
    show.style.display = "block";
}