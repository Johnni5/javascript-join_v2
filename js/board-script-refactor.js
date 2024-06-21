
// this calls the board-data -> summaryInit : loading the data from firebase */
summaryInit();


/** - STARTING THE BOARD-DATA -
 * Initializes the board.
 * Loads the tasks data from Firebase.
 * Deciding, if data -> loads them , if not, loads dummyCards.
 */
function startBoard(tasks) {
  if (true) {
    // load dummy card
    // renderDummyCard();
    renderLive(tasks);
  } else {
    // data in firebase, loading respective data 
    // renderLive();
  }
}

//#region LIVE displaying card from Firebase
/** - RENDER LIVE CARDS
 * This function renders the cards with live-data from firebase.
 * @param {array} taskList - The list of tasks from firebase.
 */
function renderLive(tasks) {
  const cardLiveDiv2 = document.getElementById('column-2');
  const cardLiveDiv3 = document.getElementById('column-3');
  const cardLiveDiv4 = document.getElementById('column-4');
  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    if (element[1].board == 'progress') {
      cardLiveDiv2.innerHTML += renderLiveProgressCard(element,i);
    } if (element[1].board == 'feedback') {
      cardLiveDiv3.innerHTML += renderLiveFeedbackCard(element,i);
    } if (element[1].board == 'done') {
      cardLiveDiv4.innerHTML += renderLiveDoneCard(element,i);
  }
}


/** - MAIN CONTROL LOADING THE OVERLAY FUNCTION
 * This function decides/loads the respective sub-function as per param.
 * @param {string} param - the respective category: progress, feedback, done 
 */
function renderLiveOverlayCard(param, tasks,i) {
  document.getElementById('overlay-card').classList.remove('d-none');
  const content = document.getElementById('overlay-card');
  content.innerHTML = '';

  if (param == 'progress') {
    content.innerHTML = renderLiveOverlayCardProgress(tasks,i);
  } if (param == 'done') {
    content.innerHTML = renderLiveOverlayCardDone(tasks,i);
  } else if (param == 'feedback') {
    content.innerHTML = renderLiveOverlayCardFeedback(tasks,i);
  } 
}
//#endregion

//#region EVENT-LISTENER
/*
** Event-Listener - drag-n-drop 
*/
document.addEventListener('DOMContentLoaded', function () {
  const columns = document.querySelectorAll('.all-columns');
  columns.forEach(function (column) {
      new Sortable(column, {
          group: 'shared',
          animation: 150
      });
  });
});
//#endregion


//#region SUBTASK-COUNT
let total = 0;

function showSubTaskCount(sumTotal) {
  total = sumTotal; 
  // for (let i = 0; i < taskList.length; i++) {
  //   console.log('showSubCount - start FOR');
  //   const task = taskList[i];
  //   const subtasks = task[1]['subtasks'];
  //   total = subtasks.length;
  //   console.log('showSubCount - total - ',total);
  //   console.log('showSubCount - totalTasks - ',subtasks);
  // }
  const sumSubTaskElements = document.getElementsByClassName('subtask-sum');
  for (let elem of sumSubTaskElements) {
    elem.innerHTML = total;
  }
}
//#endregion

//#region PROGRESS-BAR
/**
 * This function updates the progress-bar with the sub-tasks.
 * @param {*} type 
 */
function updateBar(type) {
  const checkboxes = document.querySelectorAll('.ol-sub-task-checkbox');
  const total = checkboxes.length;
  showSubTaskCount(total);
  let completed = 0;
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      completed++;
    }
  });

  const progressPercentage = (completed / total) * 100;

  if (type === 'progress') {
    document.getElementById('progress-bar-fill').setAttribute('width', `${progressPercentage}%`);
  } else if (type === 'done') {
    document.getElementById('done-bar-fill').setAttribute('width', `${progressPercentage}%`);
  } else {
    console.error('Invalid type parameter');
  }
}
//#endregion


function searchCards() {
  const searchInput = document
    .getElementById('search-task')
    .value.toLowerCase();
  const cardContent = document.getElementById('board-overview');
  cardContent.innerHTML = '';

  if (taskList.length > 0) {
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i];
      const taskName = task[1]['title'].toLowerCase();

      if (taskName.startsWith(searchInput)) {

       // load the result
        cardContent.innerHTML += renderTaskCard(taskList[i]);
      }
    }
  }
}
}