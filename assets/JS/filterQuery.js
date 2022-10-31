
// FUNCTION FOR FILTERING QUERIES AND SEARCHES OF THE TABLES 

function filterTable() {
  const input = document.getElementById('input');
  let rows = document.querySelectorAll('tbody tr');
  input.addEventListener('keyup', function (e) {
    const text = e.target.value.toLowerCase();
    rows.forEach((row) => {
      row.querySelector('td').textContent.toLowerCase().startsWith(text)
        ? (row.style.display = '')
        : (row.style.display = 'none');
    });
  });
}
$(filterTable());

// FUNCTION FOR SORTING OUR TABLE DATA !

function sortTable(n) {
  // INITALIZING EVERYTHING WITH 0
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;

  // GETTING THE TABLE BY ID AND MARKING SWITCHING AS BOOLEAN TRUE 

  table = document.getElementById('table');
  switching = true;

  // MAKING THE SORTING DIRECTION OF OUR TABLE TO BE IN ASCENDING ORDER 

  dir = 'asc';

  while (switching) {

// NOW MARKING SWITCHING TO FALSE & LOOPING THROUGHOUT THE ROWS LEAVING HEADERS 

    switching = false;
    rows = table.rows;


    for (i = 1; i < rows.length - 1; i++) {

      // SO INITIALLY THERE SHOULD BE NO SWITCHING SO MARKING IT FALSE 

      shouldSwitch = false;

      // COMPARING DATA FROM CURRENT AND THE NEXT ROW  

      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];

      // CONDITION FOR CHECKING IF THE DIRECTIONS SHOULD BE SWITCHED OR NOT !

      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {

      // IF SHOULDSWITCH IS TRUE THAN MAKE A SWITCH AND MARK AGAIN AS TRUE 

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      // INCREASING SWITCHCOUNT BY ONE EVERYTIME A SWITCH IS DONE 

      switchcount++;
    } else {

      // IF SHOULDSWITCH IS FALSE AND DIRECTION IS ASC MARK ITS DIRECTION AS DESC AND MAKE SWITCHING TRUE AGAIN 

      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

