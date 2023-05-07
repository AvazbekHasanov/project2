window.addEventListener("DOMContentLoaded", () => {
  //Navbar
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = "none";
    });

    tabs.forEach(item => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i) {
    tabsContent[i].style.display = "flex";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent(0);

  tabsParent.addEventListener("click", event => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // deadline
  const deadline = new Date("2023-4-25");
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / 1000 / 60 / 60 / 24),
      hours = Math.floor(days % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // //Modal

  // const modalTrigger = document.getElementById("modal-show"),
  //   modal = document.querySelector(".modal"),
  //   modalCloseBtn = document.querySelector("[data-close]");

  // modalTrigger.addEventListener("click", () => {
  //   alert("frfrfr");
  //   modal.classList.add("show");
  //   modal.classList.remove("hide");
  // });

  // modalCloseBtn.addEventListener("click", () => {
  //   modal.classList.add("hide");
  //   modal.classList.remove("show");
  // });

  //form

  const form = document.querySelectorAll("form");

  const message = {
    loading: "Loading",
    success: "Thank you for share your information",
    failure: "Error"
  };

  form.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const statusMessege = document.createElement("div");
      statusMessege.classList.add("status");
      statusMessege.textContent = message.loading;
      form.append(statusMessege);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");

      request.setRequestHeader("Content-type", "multipart/form-data");
      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessege.textContent = message.success;
        } else {
          statusMessege.textContent = message.failure;
        }
      });
    });
  }
});
