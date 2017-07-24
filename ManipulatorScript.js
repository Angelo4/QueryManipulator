function transformQuery(rawPaste) {
    //console.log(rawPaste);
    var a = rawPaste;

    var lineSplit = a.split("\n");

    var statement = "SELECT\n";
    //var statement2 = "SELECT\n";

    for (i =0; i < lineSplit.length; i++){
        //console.log("line " + (i + 1) + ": " + lineSplit[i])
        if (i == 0){
            var columns = lineSplit[i].split("\t");
        }else {
            var columnSplit = lineSplit[i].split("\t");

            for (j = 0; j < columnSplit.length; j++){
                //console.log("column" + (j + 1) + ": " + columnSplit[j])

                if (j != (columnSplit.length - 1)){
                    var selectLine = "\'" +  columnSplit[j] + "\' as \'" + columns[j] + "\',\n";
                    statement = statement.concat(selectLine);
                } else if (i != (lineSplit.length - 1) && j == (columnSplit.length -1)) {
                    var selectLine = "\'" +  columnSplit[j] + "\' as \'" + columns[j] + "\'\nUNION ALL\n";
                    statement = statement.concat(selectLine);
                }else {
                    var selectLine = "\'" +  columnSplit[j] + "\' as \'" + columns[j] + "\'\n";
                    statement = statement.concat(selectLine);
                }
            }
        }
    }
    console.log(statement)
    return statement;
};

function executeTranform() {
    var contents = document.getElementById('QueryPaste').value;
    document.getElementById('QueryPaste').value = transformQuery(contents);
}
