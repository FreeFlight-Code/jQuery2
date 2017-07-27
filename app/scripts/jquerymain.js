$(document).ready(function(){
$('#newTaskForm').hide();// *********************task form
var listo = []
var Task = function (task){
      this.task = task
      this.id = 'new'
    }

//********************************clear form**************************
var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};
    //********************************   add task   ***************************
    var addTask = function(task) {
    	if(task) {
    		task = new Task(task);
    		listo.push(task);

//*******************New Items add HTML to self populate*********************
		$('#newItemInput').val('');
		  $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + task.task + '</h3>'+
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>'
                    );
	}

  //*****************************fade out
	 $('#newTaskForm').slideToggle('fast', 'linear');

};
// **************call add task when we click saveNewItem********************
$('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
});

//*********** calls the addTask function when we click the saveNewItem button.

$('#saveNewItem').on('click', function (e) {
    e.preventDefault();              // function 'e'?????????**QUESTIOn?????
    var task = $('#newItemInput').val().trim();
    addTask(task);
});
// *********************      F    O     R    M     *********

//Opens form
  $('#add-todo').on('click', function () {
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });
//              **************** move items to in progress
$(document).on('click', '#item', function(e) {
	e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
});
//****************************move items to archive
$(document).on('click', '#inProgress', function (e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

//****************************delete items
$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});
//                     *******************













})//end jquery tag
