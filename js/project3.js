const init = () => {
  // Variable declarations and assignments
  let taskButton;
  taskButton = document.querySelector("#getTask");

  let taskList;

  taskList = document.getElementById("taskList");
  taskButton.addEventListener("click", addNewTask)
  // call getTasks function
  getTasks();
}

// Function adds new task through http request
const addNewTask = () => {

  // Variable declarations and Assignments
  let xhr;
  xhr = new XMLHttpRequest();

  let url;
  url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks";

  let apiKey;
  apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";

  let studentId;
  studentId = "3033109";

  let taskDescription;
  taskDescription = document.querySelector("#newTask").value;

  let params;
  params = {
    StudentId: studentId,
    Description: taskDescription
  };


  xhr.open("post", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("x-api-key", apiKey);

  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      // calls get tasks function
      getTasks();
    }
  }

  // turns responseText to JSON
  xhr.send(JSON.stringify(params));
}

// function displays all current tasks to screen
const getTasks = () => {

  let xhr;
  xhr = new XMLHttpRequest();

  let studentId;
  studentId = "3033109";

  let url;
  url = `https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/`
  + `${studentId}`;

  let apiKey;
  apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";

  xhr.open("get", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("x-api-key", apiKey);

  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      let taskList = document.getElementById("taskList");

      // resets list
      taskList.innerHTML = " ";
      // converts text responseText to JSON
      let response = JSON.parse(xhr.responseText);
      let results = response.Items;

      // loops through and appends new tasks to page
      for(let i = 0; i < results.length; i++){
        taskList.appendChild(displayResult(results[i]));
      };

    };
  };

  xhr.send();
}

// function displays
const displayResult = (result) => {
  let description = result.Description;

  let taskItem = document.createElement("p");
  taskItem.innerHTML = `<button onclick="deleteTasks('${description}')" > Delete
                  </button>
                  <span> ${result.Description} </span> `;
  return taskItem;
}

// function deletes task descriptions from screen
const deleteTasks = (taskDescription) => {

  // Variable declaration and Assignments
  let xhr;
  xhr = new XMLHttpRequest();

  let studentId;
  studentId = "3033109";

  let url;
  url = `https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks`;

  let apiKey;
  apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";

  let params;
  params = {
    StudentId: studentId,
    Description: taskDescription
  };


  xhr.open("delete", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("x-api-key", apiKey);

  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      // calls getTasks function
      getTasks();

    }
  }
    // turns responseText to JSON
    xhr.send(JSON.stringify(params));
}
window.onload = init;
