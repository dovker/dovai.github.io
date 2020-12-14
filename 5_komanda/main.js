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

    },
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

function drawBubbles(index, array)
{
    var str = "";
    for (i = 0; i<(array.length >=5 ? 5 : array.length); i++)
    {
        str += `<img class="bubble" id="bub${i}" src="images/circle.svg">`;
    }
    $('body').append(`<div class="bubbles">${str}<\div>`);
}
function highlightBubbles(index, array)
{
    highlight = 0;
    if(array.length >=5)
    {
        if(index > 1 && index < array.length-2) highlight = 2;
        else if(index <= 1) highlight = index;
        else highlight = 5-(array.length - index)%5;
    }
    else
    {highlight = index;}
    for (i = 0; i<(array.length >=5 ? 5 : array.length); i++)
    {
        if(i === highlight)
        {
            $(`#bub${i}`).css('opacity', "50%");
        }
        else if ((i === 0 && highlight>=2 ) || ((i === (array.length >=5 ? 5 : array.length)-1)&&highlight <= 2))
        { 
            $(`#bub${i}`).css('opacity', "15%");
        }
        else
        {
            $(`#bub${i}`).css('opacity', "29%");
        }
    }
}

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
    $("body").css('background-color', array[index].color);
    highlightBubbles(index, array);
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
    drawBubbles(0, currentArray);
    highlightBubbles(0, currentArray);
    $(".photos").hScroll(40);
    $(".photos").scroll(function(){
        colorChange($(this).scrollLeft(), currentArray);
    });
});