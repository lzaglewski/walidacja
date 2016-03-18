/**
 * Created by Lukasz on 18.03.16.
 */


var product=new Object();

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

        $("input[type=radio]:checked").each(function() {


            alert($(this).val() );

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
            alert(value);

            document.getElementById("formAddProduct").reset();
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


