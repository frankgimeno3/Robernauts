# colornauts

Developed as the first project of my our fullstack development bootcamp at Ironhack Barcelona.

## About me

Hi! We are colorto, Mario and Frank. We are web developers. This project is platform game, in which an astronaut (colornaut) has to survive an alien attack, flying with his jetpack.

## Deployment

You can play the game [here](#).

## Work structure

We developed this project alone and used [Trello](https://trello.com/b/jXrH2KZw/colornauts) to organize our workflow.

## About the game

In this game you can control the colornaut using the arrows; up to fly up, down to fly down, left and right to swap color.
You will have to dodge obstacles, or turn your color red or blue to be able to fly through alien rays without receiving damamge.

Survive for some minutes and you will be able to scape with your space ship. Loose all your lifes and you will die and fail.

## Controls

Arrow up. Fly up.
Arrow down. Fly down.
Arrow left. Red flag.
Arrow right. Blue flag.

## Win condition

Arrive until the end without dying.

## Lose condition

Loose all your lives.

## Classes

|   Class   | Properties                                                                 | Methods                                           |
| :-------: | ---------------------------------------------------------------------------|---------------------------------------------------|
| colornaut | x, y, w, h, propulsion, IMG, astronautColor, isTransparent                 | print(ctx), jetpackUp, jetpackDown, changeColorRed|
| Obstacule | x, y, w, h, vel, obstacleImg                                               | print(ctx), move()                                |
| Juego     | canvas, ctx, fondoImg, astronaut, obstaculos, score, intervalId, Iteracion |start, stop, clear, print, recalculate             |
---

Any doubts? Contact us!
<a href="https://www.linkedin.com/in/frank-gimeno-ruiz-02082b141/">   