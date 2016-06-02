/**
 * Created by Lukasz on 18.03.16.
 */

    var editting=false;

var product=new Object();
//var productTable=new Array();

var productTable=[];
var kosz=new Object();
function delRow(id){

    productTable.splice(id,1);
    drawTable(productTable);

}


function setCookie(name,obj)
{

    var objToCokie=obj;
    var stringObj=JSON.stringify(objToCokie);

    $.cookie(name,stringObj);

}



function ReadCookie(name) {

    if ($.cookie(name)) {


    var obj = JSON.parse($.cookie(name));

    productTable = obj;
    drawTable(productTable);
}

}



function editRow(id){

    editting=true;



    $('#modalForm').modal();
    $('#formAddProduct').find('[id="name"]').val(productTable[id].name);
    $('#formAddProduct').find('[id="code"]').val(productTable[id].code);
    $('#formAddProduct').find('[id="netto"]').val(productTable[id].netto);
    $('#formAddProduct').find('[id="vat"]').val(productTable[id].vat);
    $('#formAddProduct').find('[id="brutto"]').val(productTable[id].brutto);

    document.getElementById("sel1").value=(productTable[id].category);

    var i;
    for(i=0;i<5;i++){

        if(productTable[id].option[i]!=undefined)
        {
            if(productTable[id].option[i]==1) document.getElementById("c1").checked=true;
            if(productTable[id].option[i]==2) document.getElementById("c2").checked=true;
            if(productTable[id].option[i]==3) document.getElementById("c3").checked=true;
            if(productTable[id].option[i]==4) document.getElementById("c4").checked=true;
            if(productTable[id].option[i]==5) document.getElementById("c5").checked=true;

        }

    }

    editting=false;

}
function createRow(){


    var temp=jQuery.extend({}, product);
    productTable.push(temp);

    drawTable(productTable);
}


function drawKosz(index){



    $("#koszykTable").html(" ");


    var brutto=0;

    var dostawa= document.getElementById("sel2").value;
    var dostawaKoszt=0;

    switch (dostawa){
        case "Poczta Polska 12zl":
            dostawaKoszt=12;
            break;
        case "Kurier DPD 18zl":
            dostawaKoszt=18;
            break;
        case "Kurier UPS 19zl":
            dostawaKoszt=19;
            break;
        case "Odbior osobisty 0zl":
            dostawaKoszt=0;
            break;

    }




    for(var i=0;i<index.length;i++) {

        brutto=brutto+productTable[index[i]].brutto;

        $("#koszykTable").append(
            '<tr scope="row">' +
            '<th>' + productTable[index[i]].name + '</th>' +
            '<td>' + productTable[index[i]].brutto + '</td>' +
            '<td><input type="number" value="1">'+


            '</tr>');




    }

    $("#koszykSuma").html(" ");

    $("#koszykSuma").append(

        'Suma: '+(dostawaKoszt+brutto));

    $('#modalKosz').modal();



    $("#sel2").change(function(){
        drawKosz(index);
    });



    kosz.index=index;
    kosz.dostawa=dostawa;

    setCookie("koszyk",kosz);


    $("#buy").click(function(){


        $.removeCookie('koszyk');
        $('#modalKosz').modal('hide');

        alert("Zakupiono pomyslnie towary");

    });

}
function drawTable(productTable){

    $("#tableBody").html(" ");

    for(var i in productTable) {
        $("#tableBody").append(
            '<tr scope="row">'+
            '<td><input type="checkbox" id="'+i+'"></td>'+
            '<th>' + productTable[i].name + '</th>'+
            '<td>' + productTable[i].code + '</td>'+
            '<td>' + productTable[i].netto + '</td>'+
            '<td>' + productTable[i].vat + '</td>'+
            '<td>' + productTable[i].brutto + '</td>'+
            '<td>' + productTable[i].category + '</td>'+
            '<td>' + productTable[i].option + '</td>'+
            '<td>' + productTable[i].rate + '</td>'+
            '<td><button onclick="delRow(this.id)" class="del" id="'+i+'">usuń</button></td>'+
            '<td><button onclick="editRow(this.id)" class="del" id="'+i+'">edycja</button></td>'

+
            '</tr>');
    }

    setCookie("1",productTable);
}

///buttony
$(document).ready(function(){
    ////buttony sort

   // drawTable(productTable);
    ReadCookie("1");



    $("#KoszykButton").click(function(){

        if ($.cookie("koszyk")) {

            var obj = JSON.parse($.cookie("koszyk"));

            kosz=obj;

            drawKosz(kosz.index);
        }

    });


    $("#selKat").change(function(){


       var choice= document.getElementById("selKat").value;



        switch (choice){
            case "cena od najniższej":
               ByPriceUp();

                break;
            case "cena od najwyższej":
                ByPriceDown();
                break;
            case "ocena od najniższej":
                    ByRateUp();

                break;
            case "ocena od najwyższej":
                    ByRateDown();
                break;
            case "nazwa od A":
                    ByNameA();
                break;
            case "nazwa od Z":
                ByNameZ();
                break;

        }





    });


    function ByNameA(){
        var byName = productTable.slice(0);
        byName.sort(function (a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        productTable = byName;
        drawTable(productTable);
        document.getElementById("Nsort").value="ON";

    }

    function ByNameZ(){
        var byName = productTable.slice(0);
        byName.sort(function (a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? 1 : x > y ? -1 : 0;
        });
        productTable = byName;
        drawTable(productTable);
        document.getElementById("Nsort").value="OFF";
    }


    function ByPriceUp(){

        var byName = productTable.slice(0);
        byName.sort(function (a, b) {
            var x = a.brutto;
            var y = b.brutto;
            return x < y ? -1 : x > y ? 1 : 0;
        });
        productTable = byName;
        drawTable(productTable);
        document.getElementById("Bsort").value="ON";

    }

    function ByPriceDown(){

        var byName = productTable.slice(0);
        byName.sort(function (a, b) {
            var x = a.brutto;
            var y = b.brutto;
            return x < y ? 1 : x > y ? -1 : 0;
        });
        productTable = byName;
        drawTable(productTable);
        document.getElementById("Bsort").value="OFF";

    }


    function ByRateUp(){

        var byName = productTable.slice(0);
        byName.sort(function (a, b) {
            var x = a.rate;
            var y = b.rate;
            return x < y ? -1 : x > y ? 1 : 0;
        });
        productTable = byName;
        drawTable(productTable);
        document.getElementById("Rsort").value="ON";

    }


    function ByRateDown(){

        var byName = productTable.slice(0);
        byName.sort(function (a, b) {
            var x = a.rate;
            var y = b.rate;
            return x < y ? 1 : x > y ? -1 : 0;
        });
        productTable = byName;
        drawTable(productTable);
        document.getElementById("Rsort").value="OFF";

    }




    $("#Nsort").click(function() {


        if(document.getElementById("Nsort").value=="OFF") {
            ByNameA();

        } else if(document.getElementById("Nsort").value=="ON"){
            ByNameZ();

        }

    });


    $("#Bsort").click(function() {



        if(document.getElementById("Bsort").value=="OFF") {
            ByPriceUp();

        } else if(document.getElementById("Bsort").value=="ON"){

            ByPriceDown();

        }

    });


    $("#Rsort").click(function() {




        if(document.getElementById("Rsort").value=="OFF") {
            ByRateUp();

        } else if(document.getElementById("Rsort").value=="ON"){

           ByRateDown();
        }

    });
    /////

    $('#cookButton').click(function(){

    });

    $('#del').click(function(){

        alert($('.del').val);


    });


    $("#delButton").click(function(){



        var id=new Array()

        $('input:checked ').each(function(){


            id.push(parseInt(this.id));

        });

        var length=id.length;

        for(var i=0;i<length;i++)
        {
            productTable.splice(id.pop(),1);

        }

        drawTable(productTable);

    });




    $("#koszButton").click(function(){



        var id=new Array()

        $('input:checked ').each(function(){


            id.push(parseInt(this.id));

        });

        var length=id.length;

        for(var i=0;i<length;i++)
        {
           // productTable.splice(id.pop(),1);


        }

        if(length>0)
        {
            drawKosz(id);

        }



    });

});



////walidacja
$(document).ready(function() {


    var netto=$("#netto").val();
    var vat=$("#vat").val();
    var nettoOk=false;
    var vatOk=false;





    function bruttoCalc(){
        if(vatOk==true && nettoOk==true)
        {
            netto=parseFloat($("#netto").val());
            vat=parseFloat($("#vat").val());

            var wynik=netto+netto*(vat/100);

            $("#brutto").val(wynik);

            ///ustawianie objektu produkt

            product.brutto=wynik;

        }
        else{
            $("#brutto").val("");

            product.brutto=undefined;
        }
    }

    function addZeroes( num ) {
        var value = Number(num);
        var res = num.split(".");
        if(num.indexOf('.') === -1) {
            value = value.toFixed(2);
            num = value.toString();
        } else if (res[1].length < 3) {
            value = value.toFixed(2);
            num = value.toString();
        }
        return num
    }


    /////submit button

    $("#submit").click(function(){

        if(editting!=true) {
            ///name
            var name = $("#name").val();
            if (name == "" || name.length > 10) {
                $("#name").css('border-color', 'red');
                $("#alertName").css('display', 'block');
                product.name = undefined;


            } else {
                $("#name").css('border-color', 'green');
                $("#alertName").css('display', 'none');

                product.name = name;
            }
            ///name


            ///code

            var code = $("#code").val();
            var kod_wzorzec = /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$/;

            if (kod_wzorzec.test(code) && code.length >= 5) {
                $("#code").css('border-color', 'green');
                $("#alertCode").css('display', 'none')

                product.code = code;
            }
            else {
                $("#code").css('border-color', 'red');
                $("#alertCode").css('display', 'block');

                product.code = undefined;
            }


            //code


            ///netto

            netto = $("#netto").val();

            if ($.isNumeric(netto) && netto.length > 0) {
                $("#netto").css('border-color', 'green');
                $("#alertNetto").css('display', 'none');
                nettoOk = true;
                var zeroes = addZeroes(netto)
                $("#netto").val(zeroes);

                product.netto = zeroes;

                bruttoCalc();

            }
            else {
                $("#netto").css('border-color', 'red');
                $("#alertNetto").css('display', 'block');
                nettoOk = false;
                product.netto = undefined;
                bruttoCalc();
            }

            ///netto

            ///


            ///

            ///vat

            vat = $("#vat").val();

            if ($.isNumeric(vat) && vat.length > 0) {
                $("#vat").css('border-color', 'green');
                $("#alertVat").css('display', 'none');
                vatOk = true;

                product.vat = vat;

                bruttoCalc();


            }
            else {
                $("#vat").css('border-color', 'red');
                $("#alertVat").css('display', 'block');
                vatOk = false;

                product.vat = undefined;

                bruttoCalc();
            }
            ///vat
            ////select kategoria

            var sel = $("#sel1").val();
            product.category = sel;

            /////checkboxes opcja

            var checkboxlist = [];

            $("input[type=checkbox]:checked").each(function () {


                checkboxlist.push($(this).val());

            });

            if (checkboxlist.length >= 2) {
                $("#alertOpcja").css('display', 'none');

                product.option = checkboxlist;

            }
            else {

                $("#alertOpcja").css('display', 'block');

                product.option = undefined;

            }

            /////checkboxes


            ///radio

            product.rate = undefined;


            $("input[type=radio]:checked").each(function () {


                product.rate = $(this).val();


            });


            ////radio


            /////sprawdza czy w obiekcie jest jakis undefined

            var value = [];
            var formOk = false;

            for (var key in product) {


                value.push(product[key]);
                if (product[key] === undefined) {
                    formOk = false;
                    break;

                }
                else {
                    formOk = true;
                }
            }

            if (formOk === true) {
                alert("formularzok");

                createRow(product);
                // document.getElementById("formAddProduct").reset();
                $("#modalForm").modal("hide");


            }


            /////sprawdza czy w obiekcie jest jakis undefined end


        }
    });



    ////onchange

    $("#name").change(function () {

        var name=$("#name").val();

        for(var i in productTable) {

           if(productTable[i].name===name)
           {
               alert("Nazwa zajeta");
               $("#name").val("");
           }


        }

        if(name=="" ||  name.length>10) {
            $("#name").css('border-color', 'red');
            $("#alertName").css('display','block');
        }else{
            $("#name").css('border-color', 'green');
            $("#alertName").css('display','none');
        }


    });


    $("#sel1").change(function(){

    });


    $("#code").change(function () {

        var code=$("#code").val();
        var kod_wzorzec =  /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$/;

        if(kod_wzorzec.test(code)){
            $("#code").css('border-color', 'green');
            $("#alertCode").css('display','none')
        }
        else{
            $("#code").css('border-color', 'red');
            $("#alertCode").css('display','block');
        }


    });


    $("#netto").change(function () {

        netto=$("#netto").val();

        if($.isNumeric(netto)){
            $("#netto").css('border-color', 'green');
            $("#alertNetto").css('display','none');
            nettoOk=true;

            $("#netto").val(addZeroes(netto));
            bruttoCalc();

        }
        else{
            $("#netto").css('border-color', 'red');
            $("#alertNetto").css('display','block');
            nettoOk=false;
            bruttoCalc();
        }

    });



    $("#vat").change(function () {

        vat=$("#vat").val();

        if($.isNumeric(vat) && vat.length>0){
            $("#vat").css('border-color', 'green');
            $("#alertVat").css('display','none');
            vatOk=true;

            bruttoCalc();


        }
        else{
            $("#vat").css('border-color', 'red');
            $("#alertVat").css('display','block');
            vatOk=false;
            bruttoCalc();
        }

    });


    $("input[type=checkbox]").change(function(){
        var checkboxlist=[];

        $("input[type=checkbox]:checked").each(function() {


            checkboxlist.push($(this).val() );

        });

        if(checkboxlist.length>=2)
        {
            $("#alertOpcja").css('display','none');

        }
        else{

            $("#alertOpcja").css('display','block');

        }
    });


    ////onchange
});


