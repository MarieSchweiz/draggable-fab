// Settings, available positions
var points = $("li").toArray();
var thisisit;

//var datenObjekte = $dieLIs.toArray().map(extrahiereDatenObjektausLi);

// unwrapp a jquery element into a html element
var myElement = $("div.fab").get(0);
// create a new Hammer element
var hammertime = new Hammer(myElement);

// window height and width for calculating a new position based on %
var getheight = $(window).height();
var getwidth = $(window).width();
var newpositionleft;
var newpositiontop;

// FAB initial positioning
$(document).ready(function(){
    $('div.fab').css(`top:${50 - ((getheight / 100) * 30)}%; left:${50 - ((getwidth / 100) * 30)}%; background:#fff;`);}
);

// activate Hammer press gesture

hammertime.get('press').set({ time: 500,threshold: 50, enable: true});
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL ,threshold: 0, velocity: 0 ,enable: false})

// Hammer für "press" erlauben

hammertime.on('press', function() {


    $('div.raster').removeClass('hide');
    $('div.raster').fadeIn();                
    $('div.fab').addClass('elevated');
    
    // generates an array and the data we need to catch the right div
    $(document).ready( function () {

        for (i = 0; i < points.length; i++ ){ 
            points[i].offset = $(`ul.layer li#${[i]}`).offset();
            points[i].width = $(`ul.layer li#${[i]}`).width();
            points[i].height = $(`ul.layer li#${[i]}`).height();
            
        };
    
    });

    console.log(points[6].offset.top);

    hammertime.get('pan').set({enable: true})
    // activate Hammer panmove (dragging)
    hammertime.on('panmove', function(event) {
    

        for(i = points.length - 1; i >= 1; i--){
            
            var topposition = points[i].offset.top;
            var leftposition = points[i].offset.left;

            // Check the top and left position
            if (    topposition <= event.pointers[0].pageY && 
                    leftposition <= event.pointers[0].pageX )
            {
            
            // calculate with width and height the match
              if (    event.pointers[0].pageX < leftposition + points[i].width && 
                            event.pointers[0].pageY < topposition + points[i].height)
                            {
                            
                            // check for active or inactive points
                            activestatus = $(`li#${points[i].id}`).hasClass('point-active');
                            if (activestatus === true){

                                // add a class for a hover effect
                                $(`li#${points[i].id}`).addClass('point-hover');
                                // set a variable used later to position the Button
                                thisisit = points[i].id;
                                
                                //console.log(`li#${points[i].id}`);}
                            }
                    
                    else { $(`li#${points[i].id}`).removeClass('point-hover'); }       
            }
            else { $(`li#${points[i].id}`).removeClass('point-hover');}
        }
        else { $(`li#${points[i].id}`).removeClass('point-hover');}
        }

        $('div.fab').css( "top", event.pointers[0].pageY -30 );
        $('div.fab').css( "left", event.pointers[0].pageX -30 );
    
    

    });
});

// Using Hammer for FAB release

hammertime.on('panend pressup', function() {

    var elementsizew = points[thisisit].width;
    var elementsizeh = points[thisisit].height;
    var elementpositiontop = points[thisisit].offset.top;
    var elementpositiontleft = points[thisisit].offset.left;
    
    newpositiontop = (elementsizeh / 2 + Math.round(elementpositiontop)) / (getheight / 100) - (30 / (getheight / 100));
    newpositionleft = (elementsizew / 2 + Math.round(elementpositiontleft)) / (getwidth / 100) - (30 / (getwidth / 100));
    // removing classes in jQuery
    $('div.fab').removeClass('highlight');
    $('div.fab').removeClass('elevated');    
    $('div.raster').fadeOut();

    

    $('div.fab').css( "top", (newpositiontop + "%") );
    $('div.fab').css( "left", (newpositionleft + "%") );

    

    hammertime.get('pan').set({enable: false})

});


