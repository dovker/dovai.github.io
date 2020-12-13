const balkonai = [
    {
        title: "LAAS BALAS SALAB SABAL",
        image: "images/siena2.jpg",
        color: "#ffaaff"
    },
    {
        title: "LABAS BALAS",
        image: "images/siena.jpg",
        color: "#ffffff"
    },
    {
        title: "LABAS SALAB SABAL",
        image: "images/siena2.jpg",
        color: "#ffaaaa"

    }
]
const laikrodziai = [
    {
        title: "LAS BALAS laikrodziai SABAL",
        image: "images/siena2.jpg",
        color: "#00aacc"
    },
    {
        title: "LABAS BALAS",
        image: "images/siena.jpg",
        color: "#ffffff"
    },
    {
        title: "LABAS SALAB SABAL",
        image: "images/siena2.jpg",
        color: "#ffaaaa"

    }
]

function drawGallery(name, array)
{
    $(name).append(`<div class="photos">${array.map(function(image){
        return `<div  class="photo"> <img src="${image.image}">
              <p>
                  ${image.title}
              </p>
          </div>`
    }).join('')}</div>`);
    
    $("body").css('background-color', array[0].color);
}
function colorChange(scroll, array)
{
    var index = Math.floor((scroll+$(document).width()/2) / $(".photos").width());
    console.log(index);
    $("body").css('background-color', array[index].color);
}

jQuery(function ($) {
    $.fn.hScroll = function (amount) {
        amount = amount || 120;
        $(this).bind("DOMMouseScroll mousewheel", function (event) {
            var oEvent = event.originalEvent, 
                direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta, 
                position = $(this).scrollLeft();
            position += direction > 0 ? -amount : amount;
            $(this).scrollLeft(position);
            event.preventDefault();
        })
    };
});

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
        }
    });
    drawGallery(className, currentArray);
    $(".photos").hScroll(40);
    $(".photos").scroll(function(){
        colorChange($(this).scrollLeft(), currentArray);
    });
});