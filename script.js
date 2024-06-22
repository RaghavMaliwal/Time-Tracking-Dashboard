document.addEventListener("DOMContentLoaded", () => {
  let currentTime = document.querySelectorAll("#current");
  let pastTime = document.querySelectorAll("#last");
  let daily = document.querySelector(".daily");
  let weekly = document.querySelector(".weekly");
  let monthly = document.querySelector(".monthly");

  let curr_daily = [];
  let prev_daily = [];
  let curr_weekly = [];
  let prev_weekly = [];
  let curr_monthly = [];
  let prev_monthly = [];

  if (daily && weekly && monthly) {
    daily.addEventListener("click", showDailyStats);
    weekly.addEventListener("click", showWeeklyStats);
    monthly.addEventListener("click", showMonthlyStats);

    fetch("./data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        curr_daily = data.map((item) => item.timeframes.daily.current);
        prev_daily = data.map((item) => item.timeframes.daily.previous);
        curr_weekly = data.map((item) => item.timeframes.weekly.current);
        prev_weekly = data.map((item) => item.timeframes.weekly.previous);
        curr_monthly = data.map((item) => item.timeframes.monthly.current);
        prev_monthly = data.map((item) => item.timeframes.monthly.previous);

        // Show daily stats by default after data is fetched
        showDailyStats();
      });
  }

  function resetColors() {
    daily.childNodes[0].style.color = "";
    weekly.childNodes[0].style.color = "";
    monthly.childNodes[0].style.color = "";
  }

  function showDailyStats() {
    for (let i = 0; i < curr_daily.length; i++) {
      currentTime[i].innerHTML = curr_daily[i] + "hrs";
      pastTime[i].innerHTML = "Last Day - " + prev_daily[i] + "hrs";
    }
    resetColors();
    daily.childNodes[0].style.color = "white";
  }

  function showWeeklyStats() {
    for (let i = 0; i < curr_weekly.length; i++) {
      currentTime[i].innerHTML = curr_weekly[i] + "hrs";
      pastTime[i].innerHTML = "Last Week - " + prev_weekly[i] + "hrs";
    }
    resetColors();
    weekly.childNodes[0].style.color = "white";
  }

  function showMonthlyStats() {
    for (let i = 0; i < curr_monthly.length; i++) {
      currentTime[i].innerHTML = curr_monthly[i] + "hrs";
      pastTime[i].innerHTML = "Last Month - " + prev_monthly[i] + "hrs";
    }
    resetColors();
    monthly.childNodes[0].style.color = "white";
  }
});
