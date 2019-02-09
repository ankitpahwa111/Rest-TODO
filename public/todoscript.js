$(() =>{
    let taskList = $('#tasklist')
    let newtask=$('#newtask')
    //let x = $('#list')
    let tasks = []
    // if (localStorage.list) {
    //   tasks = JSON.parse(localStorage.list)
    // }

   function refresh(){
    $.get('http://localhost:4567/tasks', (data) => {
      tasks = data
  //localStorage.list = JSON.stringify(tasks)
  $('#tasklist').empty()
  //taskList.innerHTML = ""
   for(let i in tasks){
    let task=tasks[i];
    //let newTaskListItem = document.createElement('li')
    taskList.append(  $('<li>') 
    .attr('class',"list-group-item")
    .append($('<div>')
    .attr('class',task.done ? "row done" : "row")
    .append($('<span>')
    .text(task.name)
    .attr('class',"col py-1")
    )
    .append($('<button>')
    .text("MOVE UP")
    .attr('class',"btn btn-warning col-1 mx-2")
    .click(function(){
      tasks.splice(i, 1, tasks.splice(i-1, 1, tasks[i])[0]);
          refresh();
    }))
    .append($('<button>')
    .text("MOVE DOWN")
    .attr('class',"btn btn-warning col-1 mx-2")
    .click(function(){
      // tasks.splice(i, 0, tasks.splice(i+1, 0, tasks[i])[0]);
          // tasks.splice(i,0,tasks.splice(i+1,0)[0])
         let temp = tasks.splice(i,1)[0]
         console.log(temp)
         i++;
         tasks.splice(i,0,temp)
         refresh();

    }))
    .append($('<button>')
    .text(task.done ? "Not done" : "Done")
    .attr('class',"btn btn-dark col-2 mx-4 my-2")
    .click(function(){
      task.done = !task.done;
        //DoneButton.innerText="NOT DONE"
        refresh();
    }))
    .append($('<button>')
    .text("DELETE")
    .attr('class',"btn btn-info col-2 mx-4 my-2")
    .click(function(){
      tasks.splice(i, 1)
        refresh();
    }))
    )
   




    )
    
    

   }
  })
  }
refresh();



//let sort=document.getElementById('sortbtn')
$('#sortbtn').click(function() {

  tasks.sort(function (a, b) {
    return a.done - b.done
  })
  refresh()
})







    function addNewTask () {
      
    

      // let taskName = newtask.value
      //let taskName=$('#newtask').val();
      //  tasks.push({
      //    name: taskName,
      //    done: false
      //  })
      
      console.log(tasks)
    let taskName = newtask.val()

    $.post('http://localhost:4567/tasks', {
      name: taskName,
      done: false
    }, (data) => {
      if (data.success) {
        newtask.val('')
        refresh()
      }

    }).fail(function (data) {
      alert(data.responseJSON.message)
    })
    }
  
    // newtask.addEventListener('keyup', function (ev) {
    //   if (ev.keyCode == 13) {
    //     addNewTask()
    //   }
    // })
  
  
    $('#addbtn').click( function () {
      addNewTask()
    })
    
  $('#clrbtn').click(function() {
    

    tasks = tasks.filter(function (t) {
      return !t.done
    })
    refresh()

    // x.removeChild(tasklist)
    // tasklist = document.createElement('ul')
    // tasklist.id='tasklist';
    // x.appendChild(tasklist);
   
  })

  })