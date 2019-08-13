import React from 'react'
import './index.scss'
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("btn-to-top").style.display = "block";
  } else {
    document.getElementById("btn-to-top").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
}

const BackToTop = () => {
  return (
    <div>
      <button onClick={() => topFunction()} id='btn-to-top' className="btn-to-top">Top</button>
    </div>
  )
}

export default BackToTop
