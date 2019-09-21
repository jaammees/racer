# racer
An entry in the [2019 js13kgames competition](https://js13kgames.com/)

Play here: []https://js13kgames.com/entries/racer


Game Summary

![game video](https://raw.githubusercontent.com/jaammees/racer/master/media/racer.gif)

The idea for Racer was to be a lap based racing game where the player can drive at the back of opponents to gain speed.
Each race the player would start at the back of the pack and need to finish first to go to the next race.
If the player made a mistake, they could press a button to go back in time. The amount they could go back in time would be limited each race.
The back in time function didn't make it in as I ran out of time.  
The game was made to be difficult so most players would need to use back in time feature. The difficulty of the game remained.


Track effect
In each race, the track is a straight line increasing in the z direction, with the start line at z = 0.
The track is split up into rectangular segments of equivalent length in the x-direction.

Each corner of a segment has (x,y,z) coordinates, these coordinates are transformed into screen space by a camera (camera.js). 
The camera's follows the player's car. The track was going to narrow and widen at certain points, but I didn't get to this in time, so though the x-coordinates are there, they aren't really needed.

The segments are drawn to screen from the camera's z position to the draw distance. Each segment has a 'curve' variable which indicates how much the track bends to the left or right. When a curved section is drawn, the camera's world x coordinate is shifted, faking the curve in the road. 
Segments are drawn using the canvas fill() function.
Opponent cars and trackside objects are drawn relative to the screen coordinates of the segments they exist on. 

Sprites
For cars and roadside objects, functions in graphics.js draw sprites to a scratch canvas, using canvas draw functions like lineTo, arc, moveTo, fill, fillRect, etc. Once a sprite is drawn, its bounds are worked out and the sprite is transferred to a sprite canvas.

Slipstream effect

Sound

![The Engine Sound](https://raw.githubusercontent.com/jaammees/racer/master/media/enginesound.png)

I searched for a long time how to make a simple car engine noise with a small amount of code. 
At first the game had a sawtooth wave which increased in frequency as the car accelerated. I found this noise quite annoying and it gave me a headache.
In the end the engine noise is made by linearly interpolating between a random set of points in a buffer with a small amount of extra randomness added to the linear interpolation.
At first the code was using AudioBufferSourceNodes and playbackRate, but this seemed to cause high CPU usage, so i switched it to use a ScriptProcessorNode.
For the turbo sound i wanted a square wave with noise added on top, but not with 50% duty cycle. A 'square' type OscillatorNode doesn't have control over the duty cycle. 
I saw some people had combined wave types to make square waves with different duty cycles, but this seemed to complicated, so the game generates a square wave into a buffer which is then also played by the ScriptProcessorNode.

Speed up - skip samples in the buffer

Sound was all done in a panic around 5hrs before the deadline.

![The Turbo Sound Before Noise Added](https://raw.githubusercontent.com/jaammees/racer/master/media/turbosound.png)


Opponent AI
Generally, the higher the position of the car in race, the faster its speed will be, this simplifies routine needed to .



