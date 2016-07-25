"use strict";

var db = {};

function clearRows(group) {
    $(`.group-${group}`).empty();
}

function addRow(group, code, key) {
    $(`.group-${group}`).append(
        $('<tr>').append($('<td>').text(code)).append($('<td>').text(key))
    );
}

function cmpNumeric(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if (a === b) return 0;
    else if (a < b) return -1;
    else return 1;
}

function printDb() {
    clearRows('entry-all');
    var textLines = [];
    textLines.push('{');
    for (let code of Object.keys(db).sort(cmpNumeric)) {
        let key = db[code];
        addRow('entry-all', code, key);
        textLines.push(`    ${("   " + code).slice(-3)}: "${key}",`);
    }
    textLines.push('}');

    $('.db-json').text(textLines.join('\n'));
}

function addToDb(code, key) {
    clearRows('entry-last');
    addRow('entry-last', code, key);
    db[code] = key;
    printDb();
}

$(() => {
    var $recv = $('.recv');
    $recv.on('keydown', (e) => {
        addToDb(e.keyCode, e.key);
        // e.key;
        // console.log(e.key);
        // console.log(e.keyCode);
        // setTimeout(() => {
        //     var val = $recv.val();
        //     if (val === '') {
        //         val = prompt("I didn't get a character for that. Please tell me what you typed");
        //         if (val == null) return;
        //     }
        //     db[e.keyCode] = val;
        //     $recv.val('');
        // }, 0);
    });
    // $recv.on('keypress', () => {
    // });
});
