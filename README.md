# racer
An entry in the [2019 js13kgames competition](https://js13kgames.com/)

Play here: https://js13kgames.com/entries/racer


## Game Summary

![game video](https://raw.githubusercontent.com/jaammees/racer/master/media/racer.gif)

The idea for Racer was to be a lap based racing game where the player can drive at the back of an opponent to gain speed. Kind of an exaggerated slipstream effect.

In each race the player would start at the back of the pack and need to finish first to go to the next race.

If the player made a mistake, they could press a button to go back in time. The amount they could go back in time would be limited each race.

The back in time function didn't make it into the game as I ran out of time.  

The game was intended to be difficult so most players would need to use back in time feature. The difficulty of the game remained though the back in time feature didn't make it.


## The Track effect

In each race, the track is a straight line increasing in the z direction, with the start line at z = 0.

The track is split up into rectangular segments. (tracks are built in track.js). Each corner of a rectangular segment has world (x,y,z) coordinates. These coordinates are transformed into screen space by a camera which follows the players' car. (implemented in camera.js). 


![An interesting picture of rectangles](https://raw.githubusercontent.com/jaammees/racer/master/media/rectangles.png)


The track was going to narrow and widen at certain points and allow for a pitstop lane, but I didn't get to that in time. As a result of the track remaining the same width, the x coordinates of the segments seem unneccesary.

The segments are drawn to screen from the camera's z position to the camera's draw distance. Each segment has a 'curve' variable which indicates how much the track bends to the left or right. When a curved section is drawn, the camera's world x coordinate is shifted by and offset, faking the curve in the road. 

Segments are drawn using the canvas fill() function.
Opponent cars and trackside objects are drawn relative to the screen coordinates of the segments they exist on. 

The following link contains descriptions of pseudo 3d road methods:
[Lou's Pseudo 3d Page] http://www.extentofthejam.com/pseudo/

## Sprites
For cars and roadside objects, functions in graphics.js draw sprites to a scratch canvas, using canvas draw functions like lineTo, arc, moveTo, fill, fillRect, etc. Once a sprite is drawn to the scratch canvas, its bounds are worked out and the sprite is transferred to a sprite canvas and its coordinates saved in the sprite canvas.

## Sound 


I searched for a long time how to make a simple car engine noise with a small amount of code. In the end I couldn't find much and the final sound in the game was done in a panic about 5 hrs before the deadline.

For most of the development, the car engine sound was a sawtooth wave which increased in frequency as the car accelerated. I found this noise quite annoying and it gave me a headache.

The engine noise in the relased version is made by linearly interpolating between a random set of points in a buffer with a small amount of extra randomness added to the linear interpolation.

![The Engine Sound](https://raw.githubusercontent.com/jaammees/racer/master/media/enginesound.png)

At first the code was used AudioBufferSourceNodes and altered the playbackRate relative to the player's speed, but this seemed to cause high CPU usage, so I switched it to use a ScriptProcessorNode, skipping samples as the speed increased.

For the turbo sound I wanted a square wave with noise added on top. However, I didn't want a square wave with 50% duty cycle. The OscillatorNode doesn't seem to have parameter to control the duty cycle of square waves. I saw some people had combined different wave types to make square waves with different duty cycles, but this seemed to complicated, so the game generates a square wave into a buffer which is then also played by the ScriptProcessorNode.

![The Turbo Sound Before Noise Added](https://raw.githubusercontent.com/jaammees/racer/master/media/turbosound.png)

## Opponent AI
Generally, the higher the position of the car in race, the faster its speed will be, this reduces the amount of overtaking opponent cars do and so simplifies the code. Opponent cars will first look ahead to find the closest car within a certain distance. If they find a car, they will try to shift to a side where there is enough room to pass. If no cars are found, some opponents will look for turns ahead and try to move to the inside lane. Originally, all cars tried to move to the inside lane, but this lead to all the cars in the same lane in both curves and straights, making overtaking boring.


Race Four, the race no one will likely see:
![race four](https://raw.githubusercontent.com/jaammees/racer/master/media/racer.gif)




