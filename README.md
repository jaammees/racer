# racer
An entry in the [2019 js13kgames competition](https://js13kgames.com/)

Play it here: https://js13kgames.com/entries/racer

Below is the post-mortem. For other entry post-mortems, see https://js13kgames.github.io/resources/

## Game Summary

![game video](https://raw.githubusercontent.com/jaammees/racer/master/media/racer.gif)

The idea for Racer was to be a lap based racing game where the player can drive at the back of an opponent to gain speed - kind of an exaggerated slipstream effect.

In each race the player would start at the back of the pack and need to finish first after two laps to go to the next race. 

Part of the game would be recognising the different types of corners and how to approach them.

If the player made a mistake, they could press a button to go back in time. The amount they could go back in time would be limited each race.

The back in time function didn't make it into the game as I ran out of time.  

The player would have a limited turbo per race. 

Players could enter a pitstop where they could trade time for recharging turbo/back in time function (this didn't make it either).

The game was intended to be difficult so most players would need to use back in time feature. The difficulty remained in the game, but the back in time feature didn't make it.

The aim was to have six tracks. Two countryside tracks, two city tracks, two beach sunset tracks. Beach sunset didn't make it.

Another idea was to have a backseat driver. After race one, "Bob" would ask if he can ride with you on the next race with the promise you wouldn't notice him, but he then ends up talking through the whole race. Bob's backstory was going to be that he used to be a race driver but is now a mechanic. After a race, if you could remember a specific fact from him, he'd be so impressed he would upgrade your car. I wrote a whole lot of dialog for Bob, as well as some code. It took up too much space.

## The road effect

In each race, the road is a stored as straight line increasing in the z direction, with the start line at z = 0.

The road is split into rectangular segments. (tracks are built in track.js). Each corner of a rectangular segment has world coordinates (x,y,z). These coordinates are transformed into screen space by a camera which follows the players' car. (implemented in camera.js). 

A Picture of Rectangles:

![A picture of rectangles](https://raw.githubusercontent.com/jaammees/racer/master/media/rectangles.png)


The track was going to narrow and widen at certain points and allow for a pitstop lane, but I didn't get to that in time. As a result of the track remaining the same width, the x coordinates of the segments seem unneccesary.

The segments are drawn to the screen from the camera's z position to the camera's draw distance (in render.js). Each segment has a 'curve' variable which indicates how much the track bends to the left or right. When a curved section is drawn, the camera's world x coordinate is shifted by an offset, faking the curve in the road. 

Segments are drawn using the canvas fill() function.

Opponent cars and trackside objects are drawn relative to the screen coordinates of the segments they exist on.

The following link contains descriptions of some pseudo 3d road methods:
http://www.extentofthejam.com/pseudo/

Code inComplete has an implementation of a road effect in JavaScript: https://codeincomplete.com/posts/javascript-racer-v1-straight/

## Sprites

The cars sprites started as PNGs, but they were taking up too many bytes (3.4K) at the resolution I wanted. So instead, the cars are made up of a collection of 2d polygons which are drawn with lineTo and fill canvas functions (in graphics.js) onto a scratch canvas and then drawn to a sprite sheet. One advantage of this was it was going to be easy to have different coloured cars (this got left out in trying to finish other things before the deadline).

Only half of the image of the car going straight is drawn and the other half is created by flipping the first half. Similarly, only the turning left car image is drawn and the turning right car image is created by flipping it.

Part of a Generated Spritesheet:

![Spritesheet](https://raw.githubusercontent.com/jaammees/racer/master/media/spritesheet.png)

For the roadside objects, functions in graphics.js draw sprites to a scratch canvas, using canvas draw functions like lineTo, arc, moveTo, fill, fillRect, etc. Once a sprite is drawn to the scratch canvas, its bounds are worked out and the sprite is transferred to a sprite canvas and its coordinates in the sprite canvas are stored. For roadside objects, collision boxes are determined using the lower pixels of the objects. This is so collisions with things like trees would be based only of the trunks of the trees.

## Graphics Inspiration

The title screen was inspired by the Pitstop II title screen for C64.

![Title](https://raw.githubusercontent.com/jaammees/racer/master/media/title.png)

![Title](https://raw.githubusercontent.com/jaammees/racer/master/media/pitstop2.gif)

The race titles were inspired by the trend of large titles in things like Mindhunter/Killing Eve/Control. I tried combining italic and normal fonts as in Mindhunter, but it looked weird. 

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/racetitle.png)

The mountains and trees in the first race were trying to emulate various NES racing games. Just kept hacking with Math.random() and lineTo until it looked kindof right.

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/mountains.png)

The flowers in race two were inspired by the tulips stage in Outrun 2006. There were supposed to be different coloured flowers. The petals were going to be reused to make bushes, but the bushes got dropped.

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/tulips.png)


The night race was inspired by the Chicago stage of Turbo Outrun.
For the streetlights i wanted to try something with canvas blur and composite operations.

![Race Title](https://raw.githubusercontent.com/jaammees/racer/master/media/night.png)

I tried different variations of layout for the HUD, but in the end went with something similar to Horizon Chase Turbo. The text was going to have a dark outline or shadow, but that was far down on the list of things to finish. Also, still needed to tweak the positioning of text.

## Sound 

I searched for a long time how to make a simple car engine sound with a small amount of code. In the end I couldn't find much and the final sound in the game was done in a panic about 5 hrs before the deadline.

For most of the development, the car engine sound was a sawtooth wave which increased in frequency as the car accelerated. I found this noise quite annoying and it gave me a headache.

The engine sound in the released version is made by linearly interpolating between a random set of points in a buffer with a small amount of extra randomness added to the linear interpolation.

The Player Car Engine Sound, wiggly lines between random points:

![The Engine Sound](https://raw.githubusercontent.com/jaammees/racer/master/media/enginesound.png)

At first the code used AudioBufferSourceNodes and altered the playbackRate relative to the player's speed, but this seemed to cause high CPU usage, so I switched it to use a ScriptProcessorNode, skipping samples as the speed increased.

For the turbo sound I wanted a square wave with noise added on top. However, I didn't want a square wave with 50% duty cycle. The OscillatorNode doesn't seem to have parameter to control the duty cycle of square waves. I saw some people had combined different wave types to make square waves with different duty cycles, but this seemed complicated, so the game generates a square wave into a buffer which is then also played by the ScriptProcessorNode. I really like the turbo/jet sound in the Gameboy game F1 Race, where the frequency of the sound keeps increasing the longer the turbo is on, even when the car's speed stops increasing, so the game does something similar to this.

The Turbo Sound Before Noise is Added, skinny squares:

![The Turbo Sound Before Noise Added](https://raw.githubusercontent.com/jaammees/racer/master/media/turbosound.png)

For the speech, the game uses the Web Speech API. For some reason, an English accent sounded right for it, so in speech.js the code searches for an en-gb voice and uses that. If no voice is found, it uses the default voice. The game uses a limited amount of speech as too much got annoying.

## Opponent AI

Generally, the higher the position of the car in race, the faster its speed will be. This reduces the amount of overtaking opponent cars need to do and so simplifies the code. Opponent cars will first look ahead to find the closest car within a certain distance. If they find a car, they will try to shift to a side where there is enough room to pass. If no cars are found, some opponents will look for turns ahead and try to move to the inside lane. Originally, all cars tried to move to the inside lane, but this lead to all the cars in the same lane in both curves and straights, making overtaking boring.


## Some things that went wrong

Race Four, the race no one will likely see:

![race four](https://raw.githubusercontent.com/jaammees/racer/master/media/race4.gif)

### Ran out of time

Last year for the js13kgames competition I spent most of the month trying to think of an idea and then only a few days making it. One comment on the entry was that the game was fun, but the graphics were quite simplistic. So this year I went with my first idea so i would have the the whole month month to make it, but a large part of the month was spent on graphics and the game engine. 

My entry in the 2018 js13kgames competition: http://js13kgames.com/entries/stay-off-the-red-line

I'm also not a big player of racing games, so another large portion of the month was spent on "research" (ie playing games). I thought the back in time feature might be a novel idea to race games, but then found a few games have had this for years.

So again, not much playtesting happened and the game seems too difficult as a result. Possibly there is not enough reward in the game for the player to persist with the difficulty.


Race two is too difficult. Race three should be before race two. It has sharper corners, but is easier. Also, race three is in the city. A change of location in race two may have caused the player to wonder what else the game might have and so provide incentive to keep playing.

Using the drift mechanic makes race two easier, but there is not enough visual/audio feedback for it to let the player know they are drifting. Didn't spend enough time on the compromise of tighter corners with drifting and speed reduction when drifting.

### No one reads instructions

I had someone try the game after the submission date, he totally missed that players need to drive behind other cars to gain speed. (and also that the inside of corners are faster than the outside and also how to drift). He couldn't get past race one. The game really needs a way of teaching the player the mechanics, or some type of demo/attract mode (which woudln't have taken that much space)

### Started using Closure Compiler too late

I intended to always use Closure Compiler, but only started using it the night before the competition ended. My code compiled, but wouldn't run without the browser complaining about undefined variables. Instead of trying to fix this, I hacked together my own build script (build.php) which replaced variables with shortened versions and then passed the whole thing through uglify. The code produced by the closure compiler was smaller than the code produced by my script by around 1 to 1.5 KB.

Getting the code down in size involved moving a lot of things into the global scope, which didn't feel great. 

Some things I tried in my build script made the code smaller in size, but then made the resulting zip file bigger.  This reminded me of last year where I thought an hour before the deadline I could outdo PNG compression  by encoding the graphics using bits for pixels rather than bytes, but the result was my entry went from around 10kb zipped to over 13kb.

## Some things that went right

It's not the best looking entry, but I think it looks better than my entry last year, so that aim was achieved. The road effect is smooth and car controls nicely. I like the car engine sound, think was quite lucky to get it on the second attempt. I like the look and sound of the slipstream effect and when it is performed against the faster cars in the race, I think it feels right (with the slower cars the slipstream can be more difficult to achieve and then overtake smoothly). I think at times the game can produce some feelings of 'fun'.