const tableBody = document.querySelector("#table-body");
const winnerBanner = document.querySelector("#winner");
const allHeaders = document.querySelectorAll("#header");

let allGroups;
let winningGroup;
let removingGroup;
let sortValue;

allHeaders.forEach(function(header) {
  header.addEventListener("click", function(e) {
    sortBy = e.target.innerText;
    sortAndRender(sortBy);
  });
});

const sortAndRender = function(attribute) {
  allGroups.sort(function(a, b) {
    let groupA;
    let groupB;
    switch (attribute) {
      case "College":
        groupA = a.college.name;
        groupB = b.college.name;
        break;
      case "Group Name":
        groupA = a.name;
        groupB = b.name;
        break;
      case "Membership":
        groupA = a.college.name;
        groupB = b.college.name;
        break;
      case "Division":
        groupA = a.college.division;
        groupB = b.college.division;
    }
    return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
  });
  renderGroups(allGroups);
};

const fetchFunc = function() {
  fetch("http://localhost:3000/a_cappella_groups")
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      allGroups = response;
      renderGroups(allGroups);
    });
};

const renderGroups = function(aCgroups) {
  tableBody.innerHTML = "";
  aCgroups.forEach(function(group) {
    if (group != winningGroup) {
      const groupRow = document.createElement("tr");
      tableBody.append(groupRow);
      groupRow.innerHTML = `
      <td>${group.college.name}</td>
      <td>${group.name}</td>
      <td>${group.membership}</td>
      <td>${group.college.division}</td>
      `;
      const trophyCell = document.createElement("td");
      groupRow.append(trophyCell);
      const trophyButton = document.createElement("img");
      trophyButton.src = "./assets/trophy.png";
      trophyButton.setAttribute("data", `id: ${group.id}`);
      trophyCell.append(trophyButton);
      trophyButton.addEventListener("click", function(e) {
        winningGroup = group;
        alert(`The winner is ${group.name}!`);
        moveWinningGroup();
      });
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      trophyCell.append(deleteButton);
      deleteButton.addEventListener("click", function(e) {
        removingGroup = group;
        deleteGroup();
      });
    }
  });
};

const moveWinningGroup = function() {
  if (winningGroup) {
    winnerBanner.innerHTML = `Winner: ${winningGroup.name}`;
  }
  renderGroups(allGroups);
};

const deleteGroup = function() {
  fetch(`http://localhost:3000/a_cappella_groups/${removingGroup.id}`, {
    method: "DELETE"
  }).then(function() {
    alert(`${removingGroup.name} has been deleted!`);
    fetchFunc();
  });
};

fetchFunc();
