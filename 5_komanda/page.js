function drawPalette(array){
    $('.color').append(`${array.map(function(data){
        return `<div  class="rect" style="background: ${data.color};"></div>`
    }).join('')}`);
}

$(document).ready(function(){
    var request = $.ajax({
        url: 'data.json',
        dataType:'text',
        type: 'get',
        cache: false,
        async: false //CHANGE SOME DAY
    });
    var json = JSON.parse(request.responseText);
    var currentArray;
    var className;
    var classList = $('body').attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
        switch(item){
            case 'balkonai': 
                currentArray = json.data.balkonai;
                className = '.balkonai';
                break;
            case 'vietos_be_siuksliadeziu':
                currentArray = json.data.vietos_be_siuksliadeziu;
                className = '.vietos_be_siuksliadeziu';
                break;
            case 'laikrodziai':
                currentArray = json.data.laikrodziai;
                className = '.laikrodziai';
                break;
            default:
                console.log("ERROR, NO JSON FOR THIS CLASS");
        }
    });
    drawPalette(currentArray);
});