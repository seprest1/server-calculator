# Server-Side Calculator

Duration: 15 Hour Sprint


## Description

We were tasked with making a calculator, which did all the mathematical calculations on the server-side, in order to showcase our skills using new concepts such as running node, utilizing modules, building a server and setting routes. 

The base-model for this project was simple, using inputs and assuming user perfection. It  should also include a history of calculations. The basic layout can be seen through the wireframe provided below.


The more advanced version of this project, asked us to build out this calculator with a more robust interface, that would be intuitive to the user. It could also have a clear history as well as a feature to select certain calculations from the history and run them again. These were optional tasks that I decided to take on. The example for the "stretch" version of the project can be seen below. 

We were asked not to use the eval ( ) function for this assignment.

## Visuals

Basic Mode Calculator:

<img width="486" alt="baseMode" src="https://user-images.githubusercontent.com/105940054/188334050-16aa9929-fb8d-41d1-87e2-4e21629dbb2c.png">

Stretch Mode Calculator:

![stretchGoal_interface](https://user-images.githubusercontent.com/105940054/188334059-b8e40621-5011-4e40-ab08-25d0739d8a8e.gif)

Final Result:

<img width="1440" alt="Screen Shot 2022-09-04 at 3 56 54 PM" src="https://user-images.githubusercontent.com/105940054/188334084-79ea19dd-89c3-4e37-94e7-9d6a4da21f47.png">

<img width="1440" alt="Screen Shot 2022-09-04 at 3 57 10 PM" src="https://user-images.githubusercontent.com/105940054/188334095-a2e0bf5c-ab41-4924-a7be-bdadab178b1d.png">


## Challenges

I found it challenging to settle on a data object at first, knowing it would affect my calculations on the server-side. This was my first attempt of manipulating data to this extent, in order to be able to reference it. In the future, I expect I will be more familiar with the data( ) function in doing tasks like this. 

The most difficult part of this assignment, however, was following a series of logic stops, to prevent user error. I spent quite some time attempting to allow users to use the last-recent total in their next calculation, as well as be able to have unlimited operands. Alas, I had to put down these ideas due to time. 

Some of the aforementioned user errors include:
- Multiple operators in a row       
- Changing operators mid-way        
- Multiple decimals in a row         
- Missing fields                     
- Computing with negative numbers

I was also able to implement not only a delete history, or "clear all" button, but also a clear button, which deleted a digit/operator at a time, while updating the data structures alongside it.   

## Roadmap

If I were to revisit this project in the future, I would attempt the following:

- Play around with my display, Sp: text wrapping and perhaps responsive text size.
- Allow users to use unlimited operands.
- Allow users to utilize the last calculated total in their next calculation.
- Add in other supplementary functions, perhaps seen on more complicated calculators.
- Have a easter-egg game or display change after entering a secret code, similar to the graphing calculators used in secondary school. :) 

