var url = "https://api.allorigins.win/raw?url=https://www.bloomberght.com/piyasa/intradaydata/dolar";
var t_tablo = document.getElementById('t-tablo');
var t_button = document.getElementById('button');
var xhttp = new XMLHttpRequest();

var xhttfunc = function () {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var salt_data = myArr.SeriesData;
            if (t_tablo.childElementCount === 10) DeletChild()
            for (let index = 0; index < 10; index++) {
                var final_date = timeConverter(salt_data[index][0]);
                var finale_price = salt_data[index][1];
                var child = document.createElement('tr');
                var childHtml = tablehtml(final_date, finale_price, index);
                child.innerHTML = childHtml;
                t_tablo.appendChild(child);
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
};

xhttfunc();

function DeletChild() {
    while (t_tablo.firstChild) {
        t_tablo.removeChild(t_tablo.firstChild);
    }
    console.log("Tablo temizlendi Data Eklemeye Hazır")
}

function tablehtml(date, price, no) {
    var contend = "";
    contend += '<tr>'
    contend += '<th scope="row">' + no + '</th>';
    contend += '<td>' + date + '</td>';
    contend += '<td>' + price + ' TL' + '</td>';
    contend += '</tr>'
    return contend;
}


function timeConverter(timestamp) {
    var a = new Date(timestamp);
    var humantime = "";
    var months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    humantime.concat(date, ' ', month, ' ', year, ' ', hour, ' : ', min);
    return humantime;
}

t_button.addEventListener("click", function () {
    xhttfunc();
    console.log(" button tetiklendi");
})

var autopriceset = setInterval(function () {
    xhttfunc();
    console.log("interval  tetiklendi");
}, 60000)
