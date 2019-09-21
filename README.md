# racer
An entry in the [2019 js13kgames competition](https://js13kgames.com/)

Play it here: https://js13kgames.com/entries/racer

Below is the post-mortem. For other entry post-mortems, see https://js13kgames.github.io/resources/

## Game Summary

![game video](https://raw.githubusercontent.com/jaammees/racer/master/media/racer.gif)

The idea for Racer was to be a lap based racing game where the player can drive at the back of an opponent to gain speed. Kind of an exaggerated slipstream effect.

In each race the player would start at the back of the pack and need to finish first to go to the next race. 

Part of the game would be recognising the different types of corners and how to approach them.

If the player made a mistake, they could press a button to go back in time. The amount they could go back in time would be limited each race.

The back in time function didn't make it into the game as I ran out of time.  

The player would have a limited turbo per race. I really liked the turbo/jet in the Gameboy game F1 Race and how the sound kept going up in frequency the longer you held it (even tho speed would reach a limit).

Players could enter a pitstop where they could trade time for recharging turbo/back in time function (this didn't make it either).

The game was intended to be difficult so most players would need to use back in time feature. The difficulty remained in the game, but the back in time feature didn't make it.

The aim was to have six tracks. Two countryside tracks, two city tracks, two beach sunset tracks. Beach sunset didn't make it.

Another idea was to have a backseat driver. After race one, "Bob" would ask if he can ride with you on the next race with the promise you wouldn't notice him, but he then ends up talking through the whole race. Bob's backstory would be that he was an ex-driver who is now a mechanic. After a race, if you could remember a specific fact from him, he'd be so impressed he would upgrade your car. I wrote a whole lot of dialog for Bob, as well as some code. It took up too much space.

## The road effect

In each race, the road is a straight line increasing in the z direction, with the start line at z = 0.

The road is split into rectangular segments. (tracks are built in track.js). Each corner of a rectangular segment has world coordinates (x,y,z). These coordinates are transformed into screen space by a camera which follows the players' car. (implemented in camera.js). 

A Picture of Rectangles:

![An interesting picture of rectangles](https://raw.githubusercontent.com/jaammees/racer/master/media/rectangles.png)


The track was going to narrow and widen at certain points and allow for a pitstop lane, but I didn't get to that in time. As a result of the track remaining the same width, the x coordinates of the segments seem unneccesary.

The segments are drawn to the screen from the camera's z position to the camera's draw distance (in render.js). Each segment has a 'curve' variable which indicates how much the track bends to the left or right. When a curved section is drawn, the camera's world x coordinate is shifted by an offset, faking the curve in the road. 

Segments are drawn using the canvas fill() function.

Opponent cars and trackside objects are drawn relative to the screen coordinates of the segments they exist on.

The following link contains descriptions of pseudo 3d road methods:
[Lou's Pseudo 3d Page] (http://www.extentofthejam.com/pseudo/)

Code inComplete has an implementation of a road effect in JavaScript: https://codeincomplete.com/posts/javascript-racer-v1-straight/

## Sprites

The cars sprites started as PNGs, but they were taking up too many bytes (3.4K) at the resolution I wanted. So instead, the cars are made up of a collection of 2d polygons which are drawn with lineTo and fill canvas functions (in graphics.js) onto a sprite sheet. One advantage of this was it was going to be easy to have different coloured cars, this got left out in trying to finish other things before the deadline.

Generated Spritesheet:

![Spritesheet](https://raw.githubusercontent.com/jaammees/racer/master/media/spritesheet.png)


For the roadside objects, functions in graphics.js draw sprites to a scratch canvas, using canvas draw functions like lineTo, arc, moveTo, fill, fillRect, etc. Once a sprite is drawn to the scratch canvas, its bounds are worked out and the sprite is transferred to a sprite canvas and its coordinates saved in the sprite canvas.

## Graphics Inspiration

The title screen was inspired by the Pitstop II title screen for C64.

![Title](https://raw.githubusercontent.com/jaammees/racer/master/media/title.png)

![Title](https://raw.githubusercontent.com/jaammees/racer/master/media/pitstop2.gif)

The race titles were inspired by Mindhunter/Killing Eve/Control. I tried combining italic and normal fonts as in Mindhunter and it looked weird. 

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/racetitle.png)

The mountains and trees in the first race were trying to emulate various NES racing games. Just kept hacking with Math.random() and lineTo until it looked kindof right.

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/mountains.png)

The flowers in race two were inspired by the tulips stage in Outrun 2006. There were supposed to be different coloured flowers. The petals were going to be reused to make bushes, but the bushes got dropped.

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/tulips.png)


The night race was inspired by the Chicago stage of Turbo Outrun (without the sexist imagery).

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/night.png)


## Sound 

I searched for a long time how to make a simple car engine sound with a small amount of code. In the end I couldn't find much and the final sound in the game was done in a panic about 5 hrs before the deadline.

For most of the development, the car engine sound was a sawtooth wave which increased in frequency as the car accelerated. I found this noise quite annoying and it gave me a headache.

The engine noise in the relased version is made by linearly interpolating between a random set of points in a buffer with a small amount of extra randomness added to the linear interpolation.

The Player Car Engine Sound, wiggly lines between random points:

![The Engine Sound](https://raw.githubusercontent.com/jaammees/racer/master/media/enginesound.png)

At first the code was used AudioBufferSourceNodes and altered the playbackRate relative to the player's speed, but this seemed to cause high CPU usage, so I switched it to use a ScriptProcessorNode, skipping samples as the speed increased.

For the turbo sound I wanted a square wave with noise added on top. However, I didn't want a square wave with 50% duty cycle. The OscillatorNode doesn't seem to have parameter to control the duty cycle of square waves. I saw some people had combined different wave types to make square waves with different duty cycles, but this seemed to complicated, so the game generates a square wave into a buffer which is then also played by the ScriptProcessorNode.

The Turbo Sound Before Noise is Added, skinny squares:

![The Turbo Sound Before Noise Added](https://raw.githubusercontent.com/jaammees/racer/master/media/turbosound.png)

## Opponent AI
Generally, the higher the position of the car in race, the faster its speed will be. This reduces the amount of overtaking opponent cars need to do and so simplifies the code. Opponent cars will first look ahead to find the closest car within a certain distance. If they find a car, they will try to shift to a side where there is enough room to pass. If no cars are found, some opponents will look for turns ahead and try to move to the inside lane. Originally, all cars tried to move to the inside lane, but this lead to all the cars in the same lane in both curves and straights, making overtaking boring.


## Some things that went wrong

Race Four, the race no one will likely see:

![race four](https://raw.githubusercontent.com/jaammees/racer/master/media/race4.gif)

### Ran out of time

Last year for the js13kgames competition I spent most of the month trying to think of an idea and then only a few days making it. A comment on the entry was that the game was fun, but the graphics were quite simplistic. So this year I went with my first idea and spent the whole month making it, but most of the month was spent on graphics and the engine. So again, not much playtesting happened and the game seems too difficult as a result. 

Race two is really too difficult. Race three should be before race two.

### No one reads instructions

I had someone try the game after the submission date, he totally missed that players need to drive behind other cars to gain speed. (and that the inside of corners are faster than the outside). He couldn't get past race one.

### Started using Closure Compiler too late

I intended to always use closure compiler, but only started using it the day before. The code compiled but wouldn't run with the browser complaining about undefined variables. Instead of trying to fix this, I hacked together my own build script which replaced variables with shortened versions and then passed the whole thing through uglify.
Getting the code down in size involved moving a lot of things into the global scope, which didn't feel great.

## Some things that went right

I think it looks nicer than my entry last year. The road effect is smooth and car controls smoothly. I like the car engine sound, think was quite lucky to get it on the second attempt.