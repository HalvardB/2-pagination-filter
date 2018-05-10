/* Summary
- The student list is divided into pages of 10 students.
- The page count is divided by the total number of students, so this
  works on any amount of students.
- A search bar is added, with both keyup and click feature.
- The search works also for email. Try searching for ".com".
- When a search is made, a new arrey is created and pagination is
  reset.
- The pagination will not show when there is less than 11 students.
- If JavaScript in disabeled or not working correctly, the search
  bar and pagination will not show and all students will be shown
  in one long list.
- An error message will show if there are no students in the search
  result.
*/

let studentList = document.querySelectorAll(".student-list li h3");
let searchArray = [];
let searchUsed = false;

// Hide all students
$(studentList).parent().parent().hide();

// Show only relevant students
function showStudents(pageNum, studList){
  let studentsToShow = 10;
  let firstStudent = (pageNum * studentsToShow) - studentsToShow;

  // Settings for the last page
  if((firstStudent + studentsToShow) > studList.length){
    studentsToShow = studList.length - firstStudent;
  };

  // Looping through the students
  for(var i = firstStudent; i < (firstStudent + studentsToShow); i += 1){
    let e = studList[i];
    $(e).parent().parent().show();
  };
}

// To show the first 10 students when first loading the page
showStudents(1, studentList);

// Add pagination to HTML (if more than 10 students)
function showPagination(studNum){
  pagesToShow = Math.ceil(studNum / 10);
  let pages = '<li><a class="active" href="#">1</a></li>';
  for(var i = 2; i < (pagesToShow + 1); i += 1){
    pages += '<li><a href="#">' + i + '</a></li>';
    $(".pagination").html(pages);
  }
}

// To show pagination when first loading the page
showPagination(studentList.length);

// Click event on pagination
$(".pagination").on("click", function(){
  // Removing and adding "active" class
  $(".pagination li a.active").removeClass("active");
  $(event.target).addClass("active");

  // New pagenumber equals button number
  pageNumber = event.target.innerHTML;

  if(searchUsed === true){
    // Hiding all students
    $(studentArray).parent().parent().hide();

    // Adding students
    showStudents(pageNumber,studentArray);
  } else {
    // Hiding all students
    $(studentList).parent().parent().hide();

    // Adding students
    showStudents(pageNumber,studentList);
  };
});

// Adding the search function to the HTML
$(".student-search").html('<input id="search" placeholder="Search for students..."><button> Search </button>');

// Click event on search button
$(".student-search button").on("click", function() {
  search();
});

// Click event on "keyup"
$("#search").on("keyup", function() {
  search();
});

// Search logic
function search(){
  searchUsed = true; // For correct pagination
  $(".sorry").hide(); // Just incase there is a new search after error message
  searchInput = document.getElementById('search');
  let filter = searchInput.value.toUpperCase();
  let name = document.querySelectorAll(".student-list h3");
  let email = document.querySelectorAll(".student-list .email");
  studentArray = [] // Emptying the array before adding new students

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < name.length; i++) {
      a = name[i].textContent;
      e = name[i];
      o = email[i].textContent;

      if (a.toUpperCase().indexOf(filter) > -1 || o.toUpperCase().indexOf(filter) > -1 ) {
          studentArray.push(e)
      } else {
          let index = studentArray.indexOf(e);
          if(index > -1){
            studentArray.splice(index, 1);
          }
      }
  }

  // Hide old students
  $(studentList).parent().parent().hide();

  // Adding an error message if there are no students matching the search.
  if(studentArray.length === 0) {
    $(".sorry").show();
  };

  // Add new students
  showStudents(1, studentArray);

  // Remove old pagination
  $(".pagination li").remove();

  // Show new pagination
  showPagination(studentArray.length);
};

// Adding the error message to the HTML
$(".sorry").html('<h1> Sorry, there are no students with that name.. </h1><img src="https://tinyurl.com/y8stclgh">');
$(".sorry").hide();
