
$(document).ready(function() {
  $.ajax({
      type: "GET",
      url: "https://us-women-in-robotics-research.github.io/list.csv",
      dataType: "text",
      success: function(data) {processData(data);}
   });
});

function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};

function processData(allText){
  var newTable = document.createElement("TABLE");
  newTable.setAttribute("id", "myTable");
  document.body.appendChild(newTable);

  var allTextLines = csvToArray(allText);
  var headers = allTextLines[0];
  
  var header = newTable.createTHead();
  var row0 = header.insertRow(0);

  var numColumns = 5;
  for(var i = 0; i < numColumns; ++i){
        var newCell = row0.insertCell(i);
        newCell.innerHTML = "<b>" + headers[i] + "</b>";
  }

  for (var i=1; i<allTextLines.length; i++) {
    var rowX  = newTable.insertRow(i);
    var data = allTextLines[i];

    for(var j = 0; j < numColumns; ++j){
      var newCell = rowX.insertCell(j);
      var insertString = data[j];

      if(j == numColumns - 1){
        insertString = getWebLinkString(data[numColumns - 1]);
      }

      newCell.innerHTML = insertString;
    }
  }
}

function getWebLinkString(webString){
  if(webString == ""){
    return "NA";
  }
  return "<a href=\"" + 
          webString + 
          "\" target=\"_blank\">Visit</a>";
}

function searchLookUp(searchIndex) {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput" + searchIndex);
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[searchIndex];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  }