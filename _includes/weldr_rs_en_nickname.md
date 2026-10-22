Now that you have WELDR, you only need an arbitrary Pokemon with a specific nickname to use it.
My recommendation is to just catch a random Pokemon on the nearest route and giving it this nickname after catching:
```
Nickname: ♀ 7 V C       [♀7VC]
```

Lastly you have to put WELDR and the nicknamed Pokemon into Box 14, Slot 28 and 29, like this:
```
Box 14:
- - - - - -
- - - - - -
- - - - - -
- - - - - -
- - - W N -
```
Where `W` stands for WELDR, and `N` stands for the nicknamed Pokemon. The last slot should be kept free, this is where generated Pokemons will spawn.
Now you can test whether everything worked by entering this test code:
```
Box  1:    A Q D ? P w _ _    [AQD?Pw  ]
```
Save and execute ACE like normally, and a Bulbasaur should have spawned in Box 14 Slot 30.
Congratulations! You now have successfully set up WELDR, and can inject any Pokemon or payload with base64 codes.

If you didn't get a Bulbasaur, or the game even crashed:
- If you didn't get a Bulbasaur, but a bad egg: Make sure that you typed the spaces at the end of Box 1; they matter in this case
- If it crashed, you got a bad egg even with the spaces, or some other unwanted result occurred: You likely messed up some small part either with the nickname, at the end of Code 1 or Code 3. You can move WELDR and the nicknamed Pokemon back to Box 10 Slot 22 again, and execute Code 1 and 3 over it, to fix it.

While WELDR and the nicknamed Pokemon are inside Box 14, everytime you execute ACE, it will be interpreted as a base64 code.
If you want to execute a normal box name ACE code again, move WELDR and the nicknamed Pokemon to a different box, like Box 1-10, or at the start of Box 11.

