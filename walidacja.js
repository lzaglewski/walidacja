/**
 * Created by Lukasz on 18.03.16.
 */
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

        }
        else{
            $("#brutto").val("");
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
        }else{
            $("#name").css('border-color', 'green');
            $("#alertName").css('display','none');
        }
        ///name


        ///code

        var code=$("#code").val();
        var kod_wzorzec =  /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$/;

        if(kod_wzorzec.test(code) && code.length>=5){
            $("#code").css('border-color', 'green');
            $("#alertCode").css('display','none')
        }
        else{
            $("#code").css('border-color', 'red');
            $("#alertCode").css('display','block');
        }


        //code


        ///netto

        netto=$("#netto").val();

        if($.isNumeric(netto) && netto.length>0){
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

        ///netto


        ///vat

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
        ///vat

        /////checkboxes

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

        /////checkboxes


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

        if(checkboxlist.length>=3)
        {
            $("#alertOpcja").css('display','none');

        }
        else{

            $("#alertOpcja").css('display','block');

        }
    });



    ////onchange
});


