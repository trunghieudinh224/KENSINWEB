$('#collapseOne').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseOne').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseTwo').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseTwo').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseThree').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseThree').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})