
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

  // Index col header
  var indexCell = row0.insertCell(0);
  indexCell.innerHTML = "<b></b>";

  // Data col headers
  for(var i = 0; i < headers.length; ++i){
        var newCell = row0.insertCell(i + 1);
        newCell.innerHTML = "<b>" + headers[i] + "</b>";
  }

  for (var i=1; i<allTextLines.length; i++) {
    var rowX  = newTable.insertRow(i);
    var data = allTextLines[i];

    for(var j = -1; j < headers.length; ++j){
      var newCell = rowX.insertCell(j+1);
      var insertString = i;
      // Index col
      if(j == -1){
        newCell.innerHTML = insertString;
        continue;
      }
      
      // Data cols
      insertString = data[j];
      if(j == headers.length - 1){
        insertString = getWebLinkString(data[j]);
      }
      // else if(j == headers.length - 1){
      //   insertString = getGoogleScholarLinkString(data[j]);
      // }
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

function getGoogleScholarLinkString(webString){
  if(webString == ""){
    return "NA";
  }
  return "<a href=\"" + 
          webString + 
          "\" target=\"_blank\">Link</a>";
}

function searchLookUp(searchIndex) {
  searchIndex = searchIndex;
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput" + searchIndex);
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[searchIndex + 1];
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