

$(document).ready(function(){
    var currentArray;
    var className;
    var classList = $('body').attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
        switch(item){
            case 'balkonai': 
                currentArray = balkonai;
                className = '.balkonai';
                break;
            case 'vietos_be_siuskliadeziu':
                currentArray = balkonai;
                className = '.vietos_be_siuksliadeziu';
                break;
            case 'laikrodziai':
                currentArray = laikrodziai;
                className = '.laikrodziai';
                break;
            case 'aboutPage':
                break;
        }
    });
});