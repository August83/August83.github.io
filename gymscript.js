const exerciseListElement = document.getElementById("exerciseList");
const modal = document.getElementById("modal");
const newExerciseNameSpan = document.getElementById("newExerciseName");
let newExerciseToAdd = "";

let logs = JSON.parse(localStorage.getItem("trainingLogs")) || [];

let exerciseCategories = JSON.parse(localStorage.getItem("exerciseCategories")) || {
  "Push": [
    "Incline press",
    "Bench",
    "Incline bench",
    "Incline dumbbell",
    "Shoulder dumbbell",
    "Cable lateral raise",
    "Dumbbell lateral raise",
    "Cuffed lateral raise",
    "Bar pushdown",
    "Unilateral pushdown",
    "Cuffed pushdown",
    "Shoulder press",
    "Chest press",
    "JM press",
    "Smith JM",
    "Smith incline",
    "Skullcrushers",
    "Pec deck",
    "Cable fly",
    "Incline cable fly"
  ],
  "Pull": [
    "Pullups",
    "Bent-over row",
    "Pendlay row",
    "T-bar row",
    "Low row",
    "Upper row",
    "Lat pulldown",
    "Mag pulldown",
    "Face pulls",
    "Reverse pec deck",
    "Reverse cable fly",
    "Seated row",
    "Kelso shrug",
    "Bar pullover",
    "Rope pullover",
    "Lying face pulls",
    "Preacher curl",
    "Preacher machine",
    "Cable curl",
    "Bayesian curl",
    "Cable hammer curl",
    "Dumbbell curl",
    "Dumbbell hammer curl",
    "Lying dumbbell curl"
  ],
  "Legs": [
    "SLDL",
    "Deadlift",
    "Romanian DL",
    "Backsquats",
    "Frontsquats",
    "Hip thrusts",
    "Machine hip thrust",
    "Seated leg curl",
    "Leg extension",
    "Lying leg curl",
    "Machine leg press",
    "Leg press",
    "Hacksquat",
    "Standing calf raises",
    "Seated calf raises",
    "Adductors",
    "Abductors",
    "Pendulum squat"
  ],
  "Övrigt": [
    "Leg raises",
    "Cable crunches",
    "Sit-ups"
  ]
};


function updateExerciseList() {
  exerciseListElement.innerHTML = "";
  Object.values(exerciseCategories).flat().forEach(ex => {
    const option = document.createElement("option");
    option.value = ex;
    exerciseListElement.appendChild(option);
  });
}

function exerciseExists(name) {
  return Object.values(exerciseCategories).flat().includes(name);
}

function getExerciseCategory(name) {
  for (const cat in exerciseCategories) {
    if (exerciseCategories[cat].includes(name)) return cat;
  }
  return null;
}

document.getElementById("logForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const exercise = document.getElementById("exercise").value.trim();

  if (!exerciseExists(exercise)) {
    newExerciseToAdd = exercise;
    newExerciseNameSpan.textContent = exercise;
    modal.classList.remove("hidden");
    return;
  }

  addLog(exercise);
});

function addLog(exercise) {
  const log = {
    id: Date.now(),
    exercise,
    weight: document.getElementById("weight").value,
    reps: document.getElementById("reps").value,
    rpe: document.getElementById("rpe").value,
    comments: document.getElementById("comments").value,
    date: new Date().toISOString().split("T")[0]
  };

  logs.push(log);
  localStorage.setItem("trainingLogs", JSON.stringify(logs));
  document.getElementById("logForm").reset();
  renderLogs();
}

document.querySelectorAll(".modal-buttons button[data-cat]").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-cat");
    exerciseCategories[category].push(newExerciseToAdd);
    localStorage.setItem("exerciseCategories", JSON.stringify(exerciseCategories));
    updateExerciseList();
    modal.classList.add("hidden");
    addLog(newExerciseToAdd);
  });
});

document.getElementById("cancelAdd").addEventListener("click", () => {
  modal.classList.add("hidden");
});

function deleteLog(id) {
  logs = logs.filter(log => log.id !== id);
  localStorage.setItem("trainingLogs", JSON.stringify(logs));
  renderLogs();
}

function renderLogs() {
  updateExerciseList();
  const logList = document.getElementById("logList");
  logList.innerHTML = "";

  const grouped = {};

  logs.forEach((log) => {
    const cat = getExerciseCategory(log.exercise) || "Övrigt";
    if (!grouped[cat]) grouped[cat] = {};
    if (!grouped[cat][log.exercise]) grouped[cat][log.exercise] = [];
    grouped[cat][log.exercise].push(log);
  });

  const orderedCats = ["Push", "Pull", "Legs", "Övrigt"];
  orderedCats.forEach(category => {
    if (!grouped[category]) return;

    const catDiv = document.createElement("div");
    catDiv.className = "exercise-container";

    const catHeader = document.createElement("h2");
    catHeader.textContent = category;
    catHeader.style.width = "100%";
    catHeader.style.textAlign = "center";
    catHeader.style.color = "cadetblue";
    catDiv.appendChild(catHeader);

    Object.keys(grouped[category]).forEach((exercise) => {
      const column = document.createElement("div");
      column.className = "exercise-column";

      const header = document.createElement("div");
      header.className = "exercise-header";
      header.textContent = exercise;
      column.appendChild(header);

      const table = document.createElement("table");
      table.className = "log-table";

      table.innerHTML = `
        <thead>
          <tr>
            <th>Datum</th><th>Vikt</th><th>Reps</th><th>RPE</th><th>Kommentar</th><th>Ta bort</th>
          </tr>
        </thead>
      `;

      const tbody = document.createElement("tbody");
      grouped[category][exercise]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((log) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${log.date}</td>
            <td>${log.weight}</td>
            <td>${log.reps}</td>
            <td>${log.rpe}</td>
            <td>${log.comments}</td>
            <td><button class="delete-btn" data-id="${log.id}">🗑️</button></td>
          `;
          tbody.appendChild(row);
        });

      table.appendChild(tbody);
      column.appendChild(table);
      catDiv.appendChild(column);
    });

    logList.appendChild(catDiv);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteLog(Number(btn.getAttribute("data-id")));
    });
  });
}

updateExerciseList();
renderLogs();
