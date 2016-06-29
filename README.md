# draggable-fab

a [UX demo for a single action button](https://marieschweiz.github.io/draggable-fab/), developed by [Marie Schweiz](http://dvsty.com). Try it out or enjoy a briefly description.

Single action buttons seem to be in the wrong place for at least 50% of your users. Complex menu settings are offered to move them. In order to deliver a better and more ergonomic FAB I developed a Button you can drag to preconfigured areas.

The demo is using [Hammer.js](http://hammerjs.github.io/)for touch support and jQuery.

## How it works

Press the button and drag it around. You'll see the button snaps to the closest raster point available.

## UX demo's aren't ready for usage

I try to code as good as possible but as a designer I have my limits. I'like to invite everyone figuring out a better search and matching algorithm for my pointer and raster layout.

Unfortunatly there is no mouseover available. So I had to create my own. It searches while you move the button. I admit its not a very performance friendly solution.

```

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
                    else {
                            //making sure other li's will not show a hover class
                            $(`li#${points[i].id}`).removeClass('point-hover');
                         }       
            }
            else {
                            $(`li#${points[i].id}`).removeClass('point-hover');
                         }
        };


```