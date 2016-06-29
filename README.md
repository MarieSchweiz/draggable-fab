# draggable-fab

a UX demo for a single action button, developed by Marie Schweiz. Try it out or enjoy a briefly description.

Single action buttons seem to be in the wrong place for at least 50% of your users. Complex menu settings are offered to solve it. In order to deliver a better and more ergonomic FAB i like to invite developers adapting this concept to their platform.

## How it works

Press the button and drag it around. You'll see the button snaps to the closest raster point available.

## UX demo's aren't ready for usage

I try to code as good as possible but as designer i have my limits. I'like to invite everyone figuring out a better search and matching algorithm for my pointer and raster layout.

```

hammertime.on('panmove', function(event) {
    

        for(i = points.length - 1; i >= 1; i--){
            
            var topposition = points[i].offset.top;
            var leftposition = points[i].offset.left;

            //sollte der mauszeiger auf der y achse größer sein als die top position eines li's 
            if (    topposition <= event.pointers[0].pageY && 
                    leftposition <= event.pointers[0].pageX )
            {
            
            // Schauen ob die position kleiner is als die breite des lis
              if (    event.pointers[0].pageX < leftposition + points[i].width && 
                            event.pointers[0].pageY < topposition + points[i].height)
                            {
                            
                            activestatus = $(`li#${points[i].id}`).hasClass('point-active');
                            if (activestatus === true){
                            $(`li#${points[i].id}`).addClass('point-hover');
                            thisisit = points[i].id;
                            console.log(`li#${points[i].id}`);}
   
                            }
                    else {
                            $(`li#${points[i].id}`).removeClass('point-hover');
                         }       
            }
            else {
                            $(`li#${points[i].id}`).removeClass('point-hover');
                         }
        };

        $('div.fab').css( "top", event.pointers[0].pageY -30 );
        $('div.fab').css( "left", event.pointers[0].pageX -30 );
    
    });
});


```