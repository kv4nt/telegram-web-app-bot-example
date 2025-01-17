var match3 = new Object();
// informando quais images devem ser usadas
match3.images = [
    'images/match/1.png',
    'images/match/2.png',
    'images/match/3.png',
    'images/match/4.png',
    'images/match/5.png',
    'images/match/6.png',
    'images/match/7.png',
];
match3.selected = '';
match3.scoreBoard = new Object();
match3.scoreBoard.points = 0;
match3.scoreBoard.movements = 0;
match3.scoreBoard.combinations = 0;
match3.scoreBoard.luck = 0;
match3.scoreBoard.threes = 0;
match3.scoreBoard.fours = 0;
match3.scoreBoard.fives = 0;
//objeto anição possui variáveis para configurar as animações de transição
match3.animation = new Object();
match3.animation.speed = 500;
//objeto célula possui variáveis para a montagem do board
match3.cell = new Object();
match3.cell.width = 80;
//cria o array para a montagem do board
match3.createBoard = function (lines, columns) {
    match3.lines = lines;
    match3.columns = columns;
    match3.board = new Object();
    match3.parts = match3.images.length;
    match3.board.lines = new Array();
    for (i = 0; i < columns; i++) {
        var column = new Array();
        for (i2 = 0; i2 < lines; i2++) {
            var part = (Math.floor(Math.random() * match3.parts));
            column.push(part);
        }
        match3.board.lines.push(column);
    }
};
//monta uma part do board
match3.mountPart = function (l, c, nPart) {
    var tempId = String(l) + '-' + String(c);
    var title = ''; //"id=' + tempId + ' part=' + nPart + ' ";
    //$('.yourdiv').toggleClass('magictime swashIn');
    var part = '<div class="casa part' + nPart + '" id="' + l + '-' + c + '" data-line="' + l + '" data-column="' + c + '" data-part="' + nPart + '" ' + title + '><img src="' + match3.images[nPart] + '" /></div>';
    return part;
};

//monta a representação gráfica do board
match3.mountBoard = function (container) {
    match3.container = container;
    //percorrendo as lines do board
    $(container).html('<div id="board"></div>');
    $.each(match3.board.lines, function (index, line) {
        //percorrendo columns do board

        $.each(line, function (ind2, column) {
            var l = index;
            var c = ind2;
            var nPart = column;
            $("#board").append(match3.mountPart(l, c, nPart));
        });
        $("#board").append('</br>');
    });

    $(container).append('<div id="scoreBoard">SCORE: <span id="nPoints">0</span><br>matches: <span id="nCombinations">0</span><br>match 3: <span id="nThree">0</span><br>match 4: <span id="nFour">0</span><br>match 5: <span id="nFive">0</span><br>lucky: <span id="nLuck">0</span><br><br>moves: <span id="nMovements">0</span></div>');

    var widthContainer = match3.cell.width * match3.board.lines[0].length + 250;
    var widthBoard = match3.cell.width * match3.board.lines[0].length;
    var height = match3.cell.height * match3.board.lines.length;

    $(container).addClass('match3').css('width', widthContainer + 'px').css('height', height + 'px');
    $('#board').css('width', widthBoard + 'px').css('height', height + 'px');

    match3.checkAll2('luck');
};

match3.scoreBoard.increment = function (scoreBoard) {
    switch (scoreBoard) {
        case 'combination' :
            match3.scoreBoard.combinations++;
            $("#nCombinations").html(match3.scoreBoard.combinations);
            break;
        case 'luck' :
            match3.scoreBoard.luck++;
            $("#nLuck").html(match3.scoreBoard.luck);
            match3.scoreBoard.points += 2;
            $("#nPoints").html(match3.scoreBoard.points);
            break;
        case 'three' :
            match3.scoreBoard.threes++;
            $("#nThree").html(match3.scoreBoard.threes);
            match3.scoreBoard.points += 3;
            $("#nPoints").html(match3.scoreBoard.points);
            break;
        case 'four' :
            match3.scoreBoard.fours++;
            $("#nFour").html(match3.scoreBoard.fours);
            match3.scoreBoard.points += 4;
            $("#nPoints").html(match3.scoreBoard.points);
            break;
        case 'five' :
            match3.scoreBoard.fives++;
            $("#nFive").html(match3.scoreBoard.fives);
            match3.scoreBoard.points += 5;
            $("#nPoints").html(match3.scoreBoard.points);
            break;
        case 'movement' :
            match3.scoreBoard.movements++;
            $("#nMovements").html(match3.scoreBoard.movements);
            break;

    }

}
match3.askExchange = function (id) {
    if (match3.selected === '') {
        match3.selected = id;
        $("#" + id).addClass("selected");
    } else {
        var line = $("#" + match3.selected).data("line");
        var column = $("#" + match3.selected).data("column");

        if (
            //id === (String(line - 1) + '-' + String(column-1)) || diagonal
            id === (String(line - 1) + '-' + String(column)) ||
            //id === (String(line - 1) + '-' + String(column+1)) || diagonal
            id === (String(line) + '-' + String(column - 1)) ||
            id === (String(line) + '-' + String(column + 1)) ||
            //id === (String(line + 1) + '-' + String(column-1)) || diagonal
            id === (String(line + 1) + '-' + String(column)) //||
            //id === (String(line + 1) + '-' + String(column+1)) diagonal
        ) {
            $("#" + match3.selected).removeClass("selected");
            match3.swap(match3.selected, id);
            match3.selected = '';
        } else {
            $("#" + match3.selected).removeClass("selected");
            match3.selected = id;
            $("#" + match3.selected).addClass("selected");
        }

    }
}
match3.swap = function (id1, id2) {
    var part1 = match3.board.lines[$("#" + id1).data('line')][$("#" + id1).data('column')];
    var part2 = match3.board.lines[$("#" + id2).data('line')][$("#" + id2).data('column')];
    var title1 = $("#" + id1).attr('title');
    var title2 = $("#" + id2).attr('title');
    var class1 = 'part' + part1;
    var class2 = 'part' + part2;
    // var c1 = match3.checkMatch($("#" + id1).data('line'),$("#" + id1).data('column'));
    // var c2 = match3.checkMatch($("#" + id2).data('line'),$("#" + id2).data('column'));
    // console.log('match c1',c1);
    // console.log('match c2',c2);
    // $("#" + id1).addClass('magictime puffOut').after(function () {
    //   setTimeout(function () {
    //     $("#" + id1).removeClass('magictime puffOut');
    //   },300);
    // });
    // $("#" + id2).addClass('magictime swashIn').after(function () {
    //   setTimeout(function () {
    //     $("#" + id2).removeClass('magictime swashIn');
    //   },500);
    // });
    // console.log('swap');
    // console.log($("#" + id1).data('line')-$("#" + id2).data('line'));
    // console.log($("#" + id2).data('line')-$("#" + id1).data('line'));
    // console.log($("#" + id1).data('column')-$("#" + id2).data('column') );
    // console.log($("#" + id2).data('column')-$("#" + id1).data('column'));
    // if($("#" + id1).data('line')-$("#" + id2).data('line') > 1) {
    //   console.log('Ячейки слишком далеко');
    //   return;
    // }
    // if($("#" + id2).data('line')-$("#" + id1).data('line') > 1) {
    //   console.log('Ячейки слишком далеко');
    //   return;
    // }
    // if($("#" + id1).data('column')-$("#" + id2).data('column') > 1) {
    //   console.log('Ячейки слишком далеко');
    //   return;
    // }
    // if($("#" + id2).data('column')-$("#" + id1).data('column') > 1) {
    //   console.log('Ячейки слишком далеко');
    //   return;
    // }
    //match3.askExchange()
    match3.board.lines[$("#" + id1).data('line')][$("#" + id1).data('column')] = part2;
    match3.board.lines[$("#" + id2).data('line')][$("#" + id2).data('column')] = part1;
    $("#" + id1).data('part', part2);
    $("#" + id2).data('part', part1);
    $("#" + id1).attr('title', title2);
    $("#" + id2).attr('title', title1);
    $("#" + id1).removeClass(class1).addClass(class2);
    $("#" + id2).removeClass(class2).addClass(class1);

    var distance = match3.cell.width;
    match3.scoreBoard.increment('movement');
    if ($("#" + id1).data('line') === $("#" + id2).data('line')) {
        var top1 = '';
        var top2 = '';
    } else if ($("#" + id1).data('line') > $("#" + id2).data('line')) {
        var top1 = "-=" + distance;
        var top2 = "+=" + distance;
    } else if ($("#" + id1).data('line') < $("#" + id2).data('line')) {
        var top1 = "+=" + distance;
        var top2 = "-=" + distance;
    }
    if ($("#" + id1).data('column') === $("#" + id2).data('column')) {
        var left1 = '';
        var left2 = '';
    } else if ($("#" + id1).data('column') > $("#" + id2).data('column')) {
        var left1 = "-=" + distance;
        var left2 = "+=" + distance;
    } else if ($("#" + id1).data('column') < $("#" + id2).data('column')) {
        var left1 = "+=" + distance;
        var left2 = "-=" + distance;
    }

    $("#" + id1).animate({
        top: top1,
        left: left1

    }, match3.animation.speed, function () {
        $("#" + id1).css("top", 0).css("left", 0);
        $("#" + id1 + ' img').attr('src', match3.images[part2]);
    });
    $("#" + id2).animate({
        top: top2,
        left: left2

    }, match3.animation.speed, function () {
        $("#" + id2).css("top", 0).css("left", 0);
        $("#" + id2 + ' img').attr('src', match3.images[part1]);
        match3.checkAll2();
    });
};

match3.somePart = function (id) {
    var line = $("#" + id).data('line');
    var column = $("#" + id).data('column');
    var partOld = match3.board.lines[line][column];
    if (line === 0) {
        var newPart = (Math.floor(Math.random() * match3.parts));
    } else {
        var newPart = match3.board.lines[line - 1][column];
    }
    match3.board.lines[line][column] = newPart;

    for (i = line - 1; i >= 0; i--) {
        var idAtual = String(i) + '-' + String(column);
        match3.fallPart(idAtual);
    }
    match3.somePartVisual(id, newPart, partOld);
};

match3.fallPart = function (id) {
    var line = $("#" + id).data('line');
    var column = $("#" + id).data('column');
    var partOld = match3.board.lines[line][column];
    if (line === 0) {
        var newPart = (Math.floor(Math.random() * match3.parts));
    } else {
        var newPart = match3.board.lines[line - 1][column];
    }
    match3.board.lines[line][column] = newPart;
    match3.fallPartVisual(id, newPart, partOld);
};
match3.somePartVisual = function (id, newPart, partOld) {
    $("#" + id).animate({
        //opacity: 0
    }, match3.animation.speed, function () {
        //$("#" + id).css('opacity', '1');
        $("#" + id).data('part', newPart);
        $("#" + id).attr('title', 'id = ' + id + ' part = ' + newPart);
        $("#" + id).removeClass('part' + partOld);
        $("#" + id).addClass('part' + newPart);
        // $("#" + id).toggleClass('magictime swashIn');
        $("#" + id + ' img').attr('src', match3.images[newPart]);
        $("#" + id).addClass('animate__animated animate__zoomIn').after(function () {
            setTimeout(function () {
                $("#" + id).removeClass('animate__animated animate__zoomIn');
            }, 1000);

        });
    });
};
match3.fallPartVisual = function (id, newPart, partOld) {
    $("#" + id).addClass('animate__animated animate__zoomInDown').after(function () {
          setTimeout(function () {
            $("#" + id).removeClass('animate__animated animate__zoomInDown');
          },1300);
        $("#" + id).css('top', 0);
        $("#" + id).data('part', newPart);
        $("#" + id).attr('title', 'id = ' + id + ' part = ' + newPart);
        $("#" + id).removeClass('part' + partOld);
        $("#" + id).addClass('part' + newPart);
        $("#" + id + ' img').attr('src', match3.images[newPart]);

        });
    /*$("#" + id).animate({
        top: match3.cell.width
    }, match3.animation.speed, function () {
        // $("#" + id).addClass('magictime tinUpIn').after(function () {
        //   setTimeout(function () {
        //     $("#" + id).removeClass('magictime tinUpIn');
        //   },300);
        //
        // });
        $("#" + id).css('top', 0);
        $("#" + id).data('part', newPart);
        $("#" + id).attr('title', 'id = ' + id + ' part = ' + newPart);
        $("#" + id).removeClass('part' + partOld);
        $("#" + id).addClass('part' + newPart);
        $("#" + id + ' img').attr('src', match3.images[newPart]);
    });*/
};

match3.checkAll2 = function (luck) {
    luck = (luck === undefined) ? false : true;
    var totalLines = match3.board.lines.length - 1;
    var totalFromColumns = match3.board.lines[0].length - 1;
    var match = false;
    for (line = totalLines; line > -1 && match === false; line--) {
        for (column = totalFromColumns; column > -1 && match === false; column--) {
            match = match3.checkMatch(line, column);
        }
    }
    if (match === true) {
        match3.checkAll2(true);
        if (luck === true) {
            match3.scoreBoard.increment('luck');
        }
    }
};
match3.checkMatch = function (line, column) {
    var part = match3.board.lines[line][column];
    var tempPart = part;
    var tempLine = line;
    var tempColumn = column;
    var matchLine = 0;
    var matchColumn = 0;
    var elementLine = new Array();
    var elementColumn = new Array();
    elementLine.push(line + '-' + column);
    elementColumn.push(line + '-' + column);
    //checkndo line

    while ((tempPart === part) && (tempLine > -1)) {
        tempLine--;
        matchColumn++;
        if (tempLine !== -1) {
            tempPart = match3.board.lines[String(tempLine)][String(column)];
            //console.log(tempLine + '-' + column);
            //colocando o id num array que será usado para elementr as peças caso façam match
            if (part === tempPart) {
                elementColumn.push(String(tempLine) + '-' + String(column));
            }
        }
    }
    tempPart = part;
    while ((tempPart === part) && (tempColumn > -1)) {
        tempColumn--;
        matchLine++;
        tempPart = match3.board.lines[line][tempColumn];
        //colocando o id num array que será usado para elementr as peças caso façam match
        if (part === tempPart) {
            elementLine.push(line + '-' + tempColumn);
        }

    }
    if ((matchLine > 2) || (matchColumn > 2)) {
        if (matchColumn > 2) {
            var totalElementColumn = elementColumn.length - 1;
            while (totalElementColumn > -1) {
                match3.somePart(elementColumn[totalElementColumn]);
                totalElementColumn--;
            }
            ;
            match3.scoreBoard.increment('combination');
        }
        if (matchLine > 2) {
            $.each(elementLine, function (index, id) {
                match3.somePart(id);
            });
            match3.scoreBoard.increment('combination');
            switch (elementLine.length) {
                case 3 :
                    match3.scoreBoard.increment('three');
                    break;
                case 4 :
                    match3.scoreBoard.increment('four');
                    break;
                case 5 :
                    match3.scoreBoard.increment('five');
                    break;
            }
        }
        return true;
    } else {
        return false;
    }
};

function gotoMain() {
    window.location.href = 'index.html'
}

$("body").ready(function () {
    match3.createBoard(8, 10);
    match3.mountBoard('#gameBoard');

    $(".casa").on("click", function () {
        match3.askExchange($(this).attr('id'));
    });
    $("button").on("click", function () {
        match3.checkAll2();
    });

});