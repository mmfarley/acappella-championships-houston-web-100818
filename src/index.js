const tableBody = document.querySelector("#table-body");
const winnerBanner = document.querySelector("#winner");
const collegeHeader = document.querySelector("#college");
const nameHeader = document.querySelector("#group-name");
const membershipHeader = document.querySelector("#membership");
const divisionHeader = document.querySelector("#division");

let allGroups;
let winningGroup;
let removingGroup;
let sortValue;

// const sorter = function(attribute) {
//   allGroups.sort(function(a, b) {
//     var groupA = a.attribute.toUpperCase();
//     var groupB = b.attribute.toUpperCase();
//     return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
//   });
// };

collegeHeader.addEventListener("click", function() {
  // sortBy = college.name
  // sorter(sortBy);
  allGroups.sort(function(a, b) {
    var groupA = a.college.name.toUpperCase();
    var groupB = b.college.name.toUpperCase();
    return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
  });
  renderGroups(allGroups);
});

nameHeader.addEventListener("click", function() {
  allGroups.sort(function(a, b) {
    var groupA = a.name.toUpperCase();
    var groupB = b.name.toUpperCase();
    return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
  });
  renderGroups(allGroups);
});

membershipHeader.addEventListener("click", function() {
  allGroups.sort(function(a, b) {
    var groupA = a.membership.toUpperCase();
    var groupB = b.membership.toUpperCase();
    return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
  });
  renderGroups(allGroups);
});
divisionHeader.addEventListener("click", function() {
  allGroups.sort(function(a, b) {
    var groupA = a.college.division.toUpperCase();
    var groupB = b.college.division.toUpperCase();
    return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
  });
  renderGroups(allGroups);
});

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
