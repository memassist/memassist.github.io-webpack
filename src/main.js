import "./scss/_custom.scss";

// import { Tooltip, Toast, Popover } from 'bootstrap';
// import Collapse from 'bootstrap/js/dist/collapse';

// import * as mdb from 'mdb-ui-kit'; // lib
// import { Input } from 'mdb-ui-kit'; // module

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function(){
  // // // Show/Hide sth
  // // $('a.something').click(function () {
  // //   $(this).parent().parent().find(".something.hidden").toggleClass('open');
  // // });
  // var btn = document.querySelectorAll('a.something');
  // for (var i = 0; i < btn.length; i++) {
  //   btn[i].addEventListener('click', function(e) {
  //     e.currentTarget.parentNode.parentNode.querySelector('.something.hidden').classList.toggle('open');
  //   }, false);
  // }
});
