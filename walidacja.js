/**
 * Created by Lukasz on 18.03.16.
 */


var product=new Object();
//var productTable=new Array();

var productTable=[
    {
        name:'dupa',
        code:'83-23',
        netto:12,
        vat:22,
        brutto:12.64,
        category:'kategoria 1',
        option:'1',
        rate:1

    },

    {
        name:'zzzz',
        code:'83-23',
        netto:12,
        vat:22,
        brutto:77,
        category:'kategoria 1',
        option:'1',
        rate:2

    },
    {
        name:'gfgfgf',
        code:'83-23',
        netto:12,
        vat:22,
        brutto:98,
        category:'kategoria 1',
        option:'1',
        rate:4

    },

    {
        name:'dfdfd',
        code:'83-23',
        netto:12,
        vat:22,
        brutto:7798,
        category:'kategoria 1',
        option:'1',
        rate:5

    }


];



function createRow(){

    var temp=jQuery.extend({}, product);
    productTable.push(temp);

    drawTable();
}


function drawTable(){

    $("#tableBody").html(" ");

    for(var i in productTable) {
        $("#tableBody").append('<tr>'+'<th scope="row">' + productTable[i].name + '</th>'+
            '<td>' + productTable[i].code + '</td>'+
            '<td>' + productTable[i].netto + '</td>'+
            '<td>' + productTable[i].vat + '</td>'+
            '<td>' + productTable[i].brutto + '</td>'+
            '<td>' + productTable[i].category + '</td>'+
            '<td>' + productTable[i].option + '</td>'+
            '<td>' + productTable[i].rate + '</td>'+


            '</tr>');
    }
}

///buttony
$(document).ready(function(){
    ////buttony sort

    drawTable();

    $("#Nsort").click(function() {


        if(document.getElementById("Nsort").value=="OFF") {
            var byName = productTable.slice(0);
            byName.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            productTable = byName;
            drawTable();
            document.getElementById("Nsort").value="ON";
        } else if(document.getElementById("Nsort").value=="ON"){

            var byName = productTable.slice(0);
            byName.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? 1 : x > y ? -1 : 0;
            });
            productTable = byName;
            drawTable();
            document.getElementById("Nsort").value="OFF";
        }

    });


    $("#Bsort").click(function() {



        if(document.getElementById("Bsort").value=="OFF") {
            var byName = productTable.slice(0);
            byName.sort(function (a, b) {
                var x = a.brutto;
                var y = b.brutto;
                return x < y ? -1 : x > y ? 1 : 0;
            });
            productTable = byName;
            drawTable();
            document.getElementById("Bsort").value="ON";
        } else if(document.getElementById("Bsort").value=="ON"){

            var byName = productTable.slice(0);
            byName.sort(function (a, b) {
                var x = a.brutto;
                var y = b.brutto;
                return x < y ? 1 : x > y ? -1 : 0;
            });
            productTable = byName;
            drawTable();
            document.getElementById("Bsort").value="OFF";
        }

    });


    $("#Rsort").click(function() {




        if(document.getElementById("Rsort").value=="OFF") {
            var byName = productTable.slice(0);
            byName.sort(function (a, b) {
                var x = a.rate;
                var y = b.rate;
                return x < y ? -1 : x > y ? 1 : 0;
            });
            productTable = byName;
            drawTable();
            document.getElementById("Rsort").value="ON";
        } else if(document.getElementById("Rsort").value=="ON"){

            var byName = productTable.slice(0);
            byName.sort(function (a, b) {
                var x = a.rate;
                var y = b.rate;
                return x < y ? 1 : x > y ? -1 : 0;
            });
            productTable = byName;
            drawTable();
            document.getElementById("Rsort").value="OFF";
        }

    });
    /////

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
        ///name
        var name=$("#name").val();
        if(name=="" ||  name.length>10) {
            $("#name").css('border-color', 'red');
            $("#alertName").css('display','block');
            product.name=undefined;


        }else{
            $("#name").css('border-color', 'green');
            $("#alertName").css('display','none');

            product.name=name;
        }
        ///name


        ///code

        var code=$("#code").val();
        var kod_wzorzec =  /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$/;

        if(kod_wzorzec.test(code) && code.length>=5){
            $("#code").css('border-color', 'green');
            $("#alertCode").css('display','none')

            product.code=code;
        }
        else{
            $("#code").css('border-color', 'red');
            $("#alertCode").css('display','block');

            product.code=undefined;
        }


        //code


        ///netto

        netto=$("#netto").val();

        if($.isNumeric(netto) && netto.length>0){
            $("#netto").css('border-color', 'green');
            $("#alertNetto").css('display','none');
            nettoOk=true;
           var zeroes=addZeroes(netto)
            $("#netto").val(zeroes);

            product.netto=zeroes;

            bruttoCalc();

        }
        else{
            $("#netto").css('border-color', 'red');
            $("#alertNetto").css('display','block');
            nettoOk=false;
            product.netto=undefined;
            bruttoCalc();
        }

        ///netto

        ///


        ///

        ///vat

        vat=$("#vat").val();

        if($.isNumeric(vat) && vat.length>0){
            $("#vat").css('border-color', 'green');
            $("#alertVat").css('display','none');
            vatOk=true;

            product.vat=vat;

            bruttoCalc();


        }
        else{
            $("#vat").css('border-color', 'red');
            $("#alertVat").css('display','block');
            vatOk=false;

            product.vat=undefined;

            bruttoCalc();
        }
        ///vat
        ////select kategoria

        var sel=$("#sel1").val();
        product.category=sel;

        /////checkboxes opcja

        var checkboxlist=[];

        $("input[type=checkbox]:checked").each(function() {


            checkboxlist.push($(this).val() );

        });

        if(checkboxlist.length>=2)
        {
            $("#alertOpcja").css('display','none');

            product.option=checkboxlist;

        }
        else{

            $("#alertOpcja").css('display','block');

            product.option=undefined;

        }

        /////checkboxes


        ///radio

        product.rate=undefined;


        $("input[type=radio]:checked").each(function() {


           product.rate=$(this).val();


        });




        ////radio



        /////sprawdza czy w obiekcie jest jakis undefined

        var value=[];
        var formOk=false;

        for(var key in product) {


            value.push(product[key]);
            if(product[key]===undefined)
            {
                formOk=false;
                break;

            }
            else{
                formOk=true;
            }
        }

        if(formOk===true){
            alert("formularzok");

            createRow(product);
           // document.getElementById("formAddProduct").reset();
            $("#modalForm").modal("hide");


        }


        /////sprawdza czy w obiekcie jest jakis undefined end




    });



    ////onchange

    $("#name").change(function () {

        var name=$("#name").val();

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


