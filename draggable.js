// Settings, available positions
var points = $("li").toArray();
var thisisit;

//var datenObjekte = $dieLIs.toArray().map(extrahiereDatenObjektausLi);

// unwrapp a jquery element into a html element
var myElement = $("button.fab").get(0);
// create a new Hammer element
var hammertime = new Hammer(myElement);

// window height and width for calculating a new position based on %
var getheight = $(window).height();
var getwidth = $(window).width();
var newpositionleft;
var newpositiontop;

document.ontouchmove = function(event){
    event.preventDefault();
}

// FAB initial positioning
var fabheight = 50 -(30 / (getheight / 100));
var fableft = 50 -(30 / (getwidth / 100));

$('button.fab').css({
    "top": fabheight+"%",
    "left": fableft+"%"
});


// activate Hammer press gesture

hammertime.get('press').set({ time: 500,threshold: 50, enable: true});
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL ,threshold: 0, velocity: 0 ,enable: false})
//hammertime.get('tap').set({})

// Hammer für "press" erlauben

hammertime.on('tap', function() {
    $('button.fab').animate({
        background: "rgb(255,255,255)"
    }, 500 );
    console.log("this is a tap");
});


// positioning the button

function where(pointerleft,pointertop) {

    for(i = points.length - 1; i >= 1; i--){
            
            var topposition = points[i].offset.top;
            var leftposition = points[i].offset.left;

            // Check the top and left position
            if (    topposition <= pointertop && 
                    leftposition <= pointerleft)
            {
            
            // calculate with width and height the match
              if (    pointerleft < leftposition + points[i].width && 
                      pointertop < topposition + points[i].height)
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
    }


// generates an array and the data we need to catch the right div
    function generate() {
        for (i = 0; i < points.length; i++ ){ 
            points[i].offset = $(`ul.layer li#${[i]}`).offset();
            points[i].width = $(`ul.layer li#${[i]}`).width();
            points[i].height = $(`ul.layer li#${[i]}`).height();
        };
    }




hammertime.on('press', function(event) {

    // fade in layer with rasterpoints (the layer can be designed via css. Use classes to activate or deactivate the points)
    $('div.raster').removeClass('hide');
    $('div.raster').fadeIn();                
    $('button.fab').addClass('elevated');

    // call function to fill an array
    generate();

    //position the pointer and FAB, call the posioning function
    pointerleft = event.pointers[0].pageX;
    pointertop = event.pointers[0].pageY;
    where(pointerleft,pointertop);
    
    

    hammertime.get('pan').set({enable: true})
    // activate Hammer panmove (dragging)
    hammertime.on('panmove', function(event) {
        
        //position the pointer and FAB, call the posioning function
        pointertop = event.pointers[0].pageY;
        pointerleft = event.pointers[0].pageX;

        $('button.fab').css( "top", event.pointers[0].pageY -30 );
        $('button.fab').css( "left", event.pointers[0].pageX -30 );

        //call the hover function
        where(pointerleft,pointertop);
    
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
    $('button.fab').removeClass('highlight');
    $('button.fab').removeClass('elevated');    
    $('div.raster').fadeOut();

    

    $('button.fab').css( "top", (newpositiontop + "%") );
    $('button.fab').css( "left", (newpositionleft + "%") );
    $('button.fab').css( "transition", "top 100ms ease-in 0" );

    

    hammertime.get('pan').set({enable: false})

});


