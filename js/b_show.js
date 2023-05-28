


var treeHTML;
var useCanvas = !!document.createElement('canvas').getContext;

tree.prototype.show = function (canvasId) {
    treeHTML = '\r\nfound: ' + this.found.toString() + '&nbsp;&nbsp;&nbsp;&nbsp;eof: ' + this.eof.toString().toUpperCase() + '\r\n';
    if (this.length > maxDisplay) {
        console.log("in show")

        treeHTML += '<br><br>\r\n' + 'Tree is very big (' + commas(this.length) + ' keys).';
        if (!this.eof) treeHTML += ' Current key: ' + this.leaf.keyval[this.item];
        treeHTML += '<br>\r\n';
        this.showoff(canvasId);
        return treeHTML;
    }
    if (useCanvas) {
        console.log("in show")
        console.log(this.drawInit(canvasId));
        console.log(this.drawNode(this.root, 0));
    } else {
        this.listNode(this.root, 0);
    }

    
    return treeHTML;


};

tree.prototype.showoff = function (canvasId) {
    if (useCanvas) {
        var canv = ge$(canvasId);
        canv.width = 1;
        canv.height = 1;
    }
};

// ---- List mode for older browsers ----

tree.prototype.listNode = function (ptr, lvl) {
    treeHTML += '<div class="trLvl" style="padding-left:' + (lvl * 40) + 'px;"><table class="';
    if (ptr.isLeaf()) treeHTML += 'trLeaf';
    else treeHTML += 'trNode';
    treeHTML += '"><tbody><tr>';
    for (var i = 0, len = this.maxkey; i < len; i++) {
        if (ptr == this.leaf && i == this.item) treeHTML += '<td class="here">';
        else treeHTML += '<td>';
        if (i < ptr.keyval.length) treeHTML += ptr.keyval[i] + '</td>';
        else treeHTML += '&nbsp;</td>';
    }
    treeHTML += '</tr></tbody></table></div>\r\n';
    if (ptr.isLeaf()) return;
    for (var i = 0, len = ptr.keyval.length; i <= len; i++) {
        this.listNode(ptr.nodptr[i], lvl + 1);
    }
};


// ---- Canvas mode ----

tree.prototype.drawInit = function (cId) {

    console.log("in drawInit")
    // Canvas
    this.canvas = ge$(cId);
    this.contex = this.canvas.getContext('2d');

    // Colours
    this.Nfill = '#D2B48C';
    this.Nline = '#8C6414';
    this.Pfill = '#880015';
    this.Pline = '#880015';
    this.Lfill = '#90EE90';
    this.Lline = '#008000';
    this.Cfill = '#FFAAAA';
    this.Cline = '#CC0000';
    this.Tline = '#000000';

    // Position and sizes
    this.Tfont = '15px arial';
    this.Tsize = 15;
    this.curLeft = 0;
    this.vPad = this.maxkey * 10;
    this.hPad = 15;

    var d = 0, w = 0;
    var ptr = this.root;
    while (!ptr.isLeaf()) {
        ptr = ptr.nodptr[0];
        d++;
    }
    this.contex.font = this.Tfont;
    while (true) {
        for (var i = 0, len = ptr.keyval.length; i < len; i++) {
            w += this.contex.measureText(ptr.keyval[i]).width + 4;
        }
        w += ((this.maxkey - ptr.keyval.length) * 9) + 1;
        if (ptr.nextLf === null) break;
        ptr = ptr.nextLf;
        w += this.hPad;
    }

    // Prep canvas
    this.canvas.width = w;
    this.canvas.height = this.ypos(d) + this.Tsize + 20;
    this.contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.contex.font = this.Tfont;
    this.contex.lineWidth = 1;
    this.contex.strokeStyle = this.Pline;
};

tree.prototype.ypos = function (lvl) {
    var oneRow = this.Tsize + 13 + this.vPad;
    return (10 + (lvl * oneRow));
};

tree.prototype.drawNode = function (ptr, lvl) {
    console.log("in drawnode")
    var ret = [];
    var y = this.ypos(lvl);
    if (ptr.isLeaf()) {
        ret[0] = this.curLeft;
        ret[1] = this.drawLeaf(ptr, y);
        return ret;
    }
    var KL = [], KR = [];
    for (var i = 0, len = ptr.nodptr.length; i < len; i++) {
        ret = this.drawNode(ptr.nodptr[i], lvl + 1);
        KL[i] = ret[0];
        KR[i] = ret[1];
    }

    var cA = this.contex;
    var h = this.Tsize;
    var x, p, xb, yb, w = 0;
    for (var i = 0, len = ptr.keyval.length; i < len; i++) {
        w += cA.measureText(ptr.keyval[i]).width + 4;
    }
    w += ((this.maxkey - ptr.keyval.length) * 10) + 1;
    x = Math.floor((KR[KR.length - 1] - KL[0] - w) / 2) + KL[0];
    ret[0] = x;
    ret[1] = x + w;

    yb = this.ypos(lvl + 1);
    cA.beginPath();
    for (var i = 0, len = this.maxkey + 1; i < len; i++) {
        w = (i >= ptr.keyval.length) ? 6 : cA.measureText(ptr.keyval[i]).width;
        cA.fillStyle = this.Nline;
        if (i < this.maxkey)
            cA.fillRect(x, y, w + 5, h + 13);
        else
            cA.fillRect(x, y + h + 5, w + 5, 8);
        cA.fillStyle = this.Nfill;
        if (i < this.maxkey)
            cA.fillRect(x + 1, y + 1, w + 3, h + 4);
        cA.fillRect(x + 1, y + h + 6, w + 3, 6);
        if (i < ptr.keyval.length) {
            cA.fillStyle = this.Tline;
            cA.fillText(ptr.keyval[i], x + 2, y + h + 2);
        }
        if (i < ptr.nodptr.length) {
            cA.fillStyle = this.Pfill;
            p = Math.floor((w - 4) / 2);
            cA.fillRect(x + p + 2, y + h + 8, 4, 4);
            xb = Math.floor((KR[i] - KL[i]) / 2) + KL[i];
            cA.moveTo(x + p + 4, y + h + 13);
            cA.lineTo(xb, yb);
        }
        x += w + 4;
    }
    cA.stroke();
    return ret;
};

tree.prototype.drawLeaf = function (ptr, y) {
    console.log("in drawleaf")
    var cA = this.contex;
    var x = this.curLeft;
    var h = this.Tsize;
    var w;
    var sx = -1;
    for (var i = 0, len = this.maxkey; i < len; i++) {
        if (ptr !== null && ptr == this.leaf && i == this.item) sx = x;
        w = (i >= ptr.keyval.length) ? 5 : cA.measureText(ptr.keyval[i]).width;
        cA.fillStyle = this.Lline;
        cA.fillRect(x, y, w + 5, h + 10);
        cA.fillStyle = this.Lfill;
        cA.fillRect(x + 1, y + 1, w + 3, h + 8);
        x += w + 4;
    }
    if (sx != -1) {
        w = cA.measureText(ptr.keyval[this.item]).width;
        cA.fillStyle = this.Cline;
        cA.fillRect(sx, y, w + 5, h + 10);
        cA.fillStyle = this.Cfill;
        cA.fillRect(sx + 1, y + 1, w + 3, h + 8);
    }
    cA.fillStyle = this.Tline;
    sx = this.curLeft;
    for (var i = 0, len = ptr.keyval.length; i < len; i++) {
        w = cA.measureText(ptr.keyval[i]).width;
        cA.fillText(ptr.keyval[i], sx + 2, y + h + 4);
        sx += w + 4;
    }
    this.curLeft = x + this.hPad;
    return x;
};











var myTree = null;
var hist = [];
var pool = [];
var maxDisplay;
var isBusy = false;

modAct = function (act) {
    var txt, dis = false, num = '';
    switch (act) {
        case 'bld':
            txt = 'Order';
            break;
        case 'add':
        case 'del':
        case 'seek':
        case 'near':
            txt = 'Key value';
            break;
        case 'goto':
            txt = 'Key number';
            break;
        case 'top':
        case 'bot':
        case 'pack':
        case 'hist':
        case 'run':
        case 'hide':
        case 'show':
            txt = '';
            dis = true;
            break;
        case 'rand':
            num = pool.length;
        case 'skip':
        case 'init':
        case 'time':
            txt = 'No of keys';
            break;
    }
    ge$('labl').innerHTML = txt;
    ge$('num').value = num;
    ge$('num').disabled = dis;
    if (dis) ge$('btn').focus();
    else endCursor(ge$('num'));
}

runAct = function (act, num) {
    if (isBusy) return;

    num = parseInt(num, 10);
    if (isNaN(num)) num = 0;

    if (act == 'hide') {
        ge$('frDiv').style.display = 'none';
        ge$('act').focus();
        return;
    }
    if (act == 'show') {
        ge$('frDiv').style.display = '';
        ge$('act').focus();
        return;
    }

    var txt = '';
    if (myTree !== null) txt = myTree.show('frCanvas');
    ge$('frMsg').innerHTML = txt;

    txt = '';
    if ('bld~init~hide~show'.search(act) == -1 && myTree === null) {
        txt = 'Error: you have to build the tree first.';
    } else
        if (act == 'bld' && num < 3) {
            txt = 'Error: the tree must have Order of at least 3.';
        } else
            if ('add~seek~init~rand~time'.search(act) != -1 && num <= 0) {
                txt = 'Error: invalid number given. Must be greater than zero.';
            }
    if (txt.length > 0) act = 'error';

    var foc = 'act';
    switch (act) {
        case 'error':
            break;
        case 'bld':
            myTree = new tree(num);
            maxDisplay = num * 50;
            hist = [];
            hist[0] = 'myTree = new tree(' + num + ');';
            break;
        case 'add':
            myTree.insert(num, num);
            hist.push('myTree.insert(' + num + ',' + num + ');');
            foc = 'num';
            ge$('num').value = '';
            break;
        case 'del':
            if (num == 0) {
                myTree.remove();
                hist.push('myTree.remove();');
            } else {
                myTree.remove(num);
                hist.push('myTree.remove(' + num + ');');
            }
            foc = 'num';
            ge$('num').value = '';
            break;
        case 'seek':
            myTree.seek(num);
            hist.push('myTree.seek(' + num + ');');
            foc = 'num';
            break;
        case 'near':
            myTree.seek(num, true);
            hist.push('myTree.seek(' + num + ',true);');
            foc = 'num';
            break;
        case 'goto':
            myTree.goto(num);
            hist.push('myTree.goto(' + num + ');');
            break;
        case 'top':
            myTree.goTop();
            hist.push('myTree.goTop();');
            break;
        case 'bot':
            myTree.goBottom();
            hist.push('myTree.goBottom();');
            break;
        case 'pack':
            myTree.pack();
            hist.push('myTree.pack();');
            break;
        case 'skip':
            if (num == 0 || num == 1) {
                myTree.skip();
                hist.push('myTree.skip();');
            } else {
                myTree.skip(num);
                hist.push('myTree.skip(' + num + ');');
            }
            foc = 'btn';
            break;
        case 'init':
            pool = [];
            for (i = 0; i < num; i++) {
                pool[i] = i + 1;
            }
            pool.shuffle();
            txt = 'Pool set up with ' + commas(num) + ' keys.<br>\r\n';
            break;
        case 'rand':
            var i = 0;
            while (i < num && pool.length > 0) {
                myTree.insert(pool.pop(), '');
                if (!myTree.found) i++;
            }
            if (i < num) txt = 'Error: ran out of unique keys in the pool. Only ' + commas(i) + ' added.';
            hist.push('// ' + i + ' random keys added to tree');
            break;
        case 'time':
            var ord = myTree.maxkey + 1;
            myTree = null;
            pool = [];
            for (i = 0; i < num; i++) {
                pool[i] = i + 1;
            }
            pool.shuffle();
            if (num <= 2000000) {
                var start = new Date().getTime();
                myTree = new tree(ord);
                for (var i = num; i > 0; i--) {
                    myTree.insert(pool.pop(), '');
                }
                var end = new Date().getTime();
                txt = 'Tree rebuilt and ' + commas(myTree.length) + ' random keys added in ' + commas(end - start) + 'ms<br><br>\r\n';
                start = new Date().getTime();
                for (var i = num; i > 0; i--) {
                    myTree.seek(i, false);
                    // if (myTree.keyval != i) {
                    //	alert('Key '+i+' missing!');
                    //	break;
                    // }
                }
                end = new Date().getTime();
                txt += 'Seek for every key completed in ' + commas(end - start) + 'ms\r\n';
            } else {
                isBusy = true;
                var start = new Date().getTime();
                myTree = new tree(ord);
                addLots(start, num, num);
                txt = 'Working... Please wait';
            }
            hist = [];
            hist[0] = 'myTree = new tree(' + ord + ');';
            hist.push('// ' + num + ' random keys added to tree');
            break;
        case 'run':
            Hardcoded();
            hist.push('// Hardcoded script run');
            break;
        case 'hist':
            for (var i = 0, len = hist.length; i < len; i++) {
                txt += hist[i] + '<br>\r\n';
            }
    }

    if (myTree !== null) {
        if (txt.length == 0) txt = myTree.show('toCanvas');
        else myTree.showoff('toCanvas');
    }
    
    ge$('toMsg').innerHTML = txt;
    if (foc != 'num') ge$(foc).focus();
    else endCursor(ge$('num'));
}

Hardcoded = function () {
    myTree.insert(1, '');
    myTree.insert(15, '');
    myTree.insert(4, '');
    myTree.insert(10, '');
    myTree.insert(16, '');
    myTree.insert(11, '');
    myTree.insert(13, '');
    myTree.insert(12, '');
    myTree.insert(20, '');
    myTree.insert(9, '');
    myTree.insert(25, '');
}

function addLots(strTim, totnum, remain) {
    var doNow = Math.min(remain, 1000000);
    for (var i = doNow; i > 0; i--) {
        myTree.insert(pool.pop(), '');
    }
    remain = remain - doNow;
    if (remain > 0) {
        setTimeout(function () { addLots(strTim, totnum, remain); }, 0);
    } else {
        var endTim = new Date().getTime();
        txt = 'Tree rebuilt and ' + commas(myTree.length) + ' random keys added in ' + commas(endTim - strTim) + 'ms<br><br>\r\n';
        strTim = new Date().getTime();
        for (var i = totnum; i > 0; i--) {
            myTree.seek(i, false);
        }
        endTim = new Date().getTime();
        txt += 'Seek for every key completed in ' + commas(endTim - strTim) + 'ms\r\n';
        ge$('toMsg').innerHTML = txt;
        isBusy = false;
    }
}

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
    }
    return this;
}

/* General JS */

commas = function (x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

enterToTab = function (obj, e) {
    var e = (typeof event != 'undefined') ? window.event : e;	// IE : Mozilla 
    if (e.keyCode == 13) {
        var q;
        var ele = document.forms[0].elements;
        for (var i = 0, len = ele.length; i < len; i++) {
            q = (i == ele.length - 1) ? 0 : i + 1;
            if (obj == ele[i]) {
                ele[q].focus();
                break;
            }
        }
        return false;
    }
}

function ge$(d) {
    var x = document.getElementById(d);
    if (!x) {
        var y = document.getElementsByName(d);
        if (y.length > 0) x = y[0];
    }
    return x;
}

function endCursor(el) {
    el.focus();
    if (el.setSelectionRange) {
        var endPos = el.value.length;
        el.setSelectionRange(endPos, endPos);
    }
}

function debug(txt) { window.console && console.log(txt); }