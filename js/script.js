/**================Typing animation============== */
var typed = new Typed(".typing__span",{
  strings:["","Frontend Developer","Web Designer","UI/UX Designer"],
  typeSpeed:70,
  BackSpeed:60,
  loop:true
  })

/**=======Loader Page============= */
window.addEventListener("load",()=>{
  document.getElementById("loader").classList.toggle("load-complete");
})

/**=======Toggle style switcher============= */
const styleSwitcherToggle = document.querySelector(".style__switcher-toggler");
styleSwitcherToggle.addEventListener("click",()=>{
  document.querySelector(".style__switcher").classList.toggle("open");
})

/**=======Theme Colors=========== */
const alternateStyles = document.querySelectorAll(".alternate__style");
function setActiveStyle(color){
  for (const style of alternateStyles) {
    style.disabled = color !== style.title;
  }
}

/**===========Theme light and dark mode============ */
const dayNight=document.querySelector(".day__night");
const dayNightIcon = dayNight.querySelector("i");
dayNight.addEventListener("click",()=>{
  dayNightIcon.classList.toggle("fa-sun");  
  dayNightIcon.classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
})
window.addEventListener("load",()=>{
  dayNightIcon.classList.toggle("fa-moon", !document.body.classList.contains("dark"));
  dayNightIcon.classList.toggle("fa-sun", document.body.classList.contains("dark"));
})
  /**=============Aside================= */
  const nav = document.querySelector(".aside__nav"),
  navList = nav.getElementsByTagName("li"),
  totalNavList = navList.length,
  allSection= document.querySelectorAll(".section"),
  totalSection = allSection.length;

  nav.addEventListener('click',e=>{
    const target = e.target;
    if(target.tagName === "A"){
      removeBackSection();
      for(let j=0; j<totalNavList; j++){
        if(navList[j].querySelector("a").classList.contains("nav__a--active")){
          addBackSection(j);
        }
        navList[j].querySelector("a").classList.remove("nav__a--active");
      }
      target.classList.add("nav__a--active")
      showSection(target);
      if(window.innerWidth < 1200){
        asideSectionTogglerBtn();
      }
    }
  });

  function removeBackSection(){
    for(let i=0; i<totalSection; i++){ allSection[i].classList.remove("back-section")}
  }
  function addBackSection(num){ allSection[num].classList.add("back-section");}
  function showSection(element){
      for(let i=0; i<totalSection; i++){ allSection[i].classList.remove("section--active")}
      const target = element.getAttribute("href").split("#")[1];
      document.querySelector("#" + target).classList.add("section--active")
  }
  function updateNav(element){
    for(let i=0; i<totalNavList; i++){
      navList[i].querySelector("a").classList.remove("nav__a--active");
      const target = element.getAttribute("href").split("#")[1];
      if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
        navList[i].querySelector("a").classList.add("nav__a--active");
      }
    }
  };

  document.querySelector(".last-works").addEventListener("click", function(){
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
  });

  const navTogglerBtn= document.querySelector(".aside__toggler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click", ()=>{
          asideSectionTogglerBtn();
        })
        function asideSectionTogglerBtn(){
          aside.classList.toggle("open");
          navTogglerBtn.classList.toggle("open");
          for(let i=0; i<totalSection; i++){
            allSection[i].classList.toggle("open");
          }
        };

  /*********Changing language********/
  const check = document.querySelector(".language__check");
  check.addEventListener("click", idioma);

  const textsToChange = document.querySelectorAll("[data-section]");

  const changeLanguage = async language =>{
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();
    for (let textToChange of textsToChange){
      const section = textToChange.dataset.section;
      const value = textToChange.dataset.value;
      textToChange.innerHTML = texts[section][value];
    };
  };

  function idioma(){
    let id = check.checked;
    if(id == true){
      let language = "es";
      changeLanguage(language);
    }
    else{
      let language = "en";
      changeLanguage(language);
    }
  }

/*===============About=================== */
/*========About - skills__tabs=========== */

const tabs = document.querySelectorAll('[data-target]'),
tabContent = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
        tab.addEventListener("click", () =>{
          const target = document.querySelector(tab.dataset.target)
          tabContent.forEach(tabContents =>{
            tabContents.classList.remove('skills__active')
          })
          target.classList.add('skills__active')
          tabs.forEach(tab =>{
            tab.classList.remove('skill__active')
          })
          tab.classList.add('skill__active')
        })
      });
      
/*============Portfolio============= */
/*=======Portfolio - mixitup-filter-portfolio========= */
let mixerPortfolio = mixitup('.work__container', {
  selectors: {target: '.work__card'},
  animation: {duration: 300}
});

const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
  linkWork.forEach(l => l.classList.remove('active-work'))
  this.classList.add('active-work')
}
linkWork.forEach(l => l.addEventListener("click", activeWork))


/**=========work Popup========== */
document.addEventListener("click", (e) =>{
  if(e.target.classList.contains("work__button")){
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
})

function togglePortfolioPopup(){
  document.querySelector(".portfolio__popup").classList.toggle("open");
}
document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup)
function portfolioItemDetails(portfolioItem){
  document.querySelector(".pp__thumbnail  img").src = portfolioItem.querySelector(".work__img").src;
  document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".work__title").innerHTML;
  document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}


/**===========Services modal============= */
const modalViews = document.querySelectorAll('.services__modal'),
      modelBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')
let modal = function(modalClick){
  modalViews[modalClick].classList.add('active-modal')
}
modelBtns.forEach((modelBtn, i) =>{
  modelBtn.addEventListener("click", ()=>{
    modal(i)
  })
})
modalCloses.forEach((modalClose)=>{
  modalClose.addEventListener("click", ()=>{
    modalViews.forEach((modalView)=>{
      modalView.classList.remove('active-modal')
    })
  })
})

/**========= Swiper Testimonial========== */
let swiper = new Swiper(".testimonials__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    560: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

/*********formulaio********/
const btn = document.getElementById('button');
document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();
   btn.value = 'Sending...';
   const serviceID = 'default_service';
   const templateID = 'template_p7cncjz';
   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      Swal.fire(
        'Excelent!',
        'Message sent successfully!',
        'success'
      )
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
