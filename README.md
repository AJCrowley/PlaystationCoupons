# Playstation Store Coupon Toy

## Idea
Enter a coupon code as a seed, then count down the number from there until a working coupon code is found.

## Reality
I'm pretty sure they have advanced checksums and such. Even going through thousands of codes, your odds of finding a working one are probably about that of a homeopathic remedy curing your cancer.

## So
This was just written for fun. As much to see if I could actually do it as anything else. Feel free to play with it as much as you like

## How
Go to the Playstation Store, throw something in your basket and go to the "Your Basket" page. You'll see that there's an area to enter a 10 digit coupon code. Throw any 10 digits in there, or just expand it down and leave it blank and the script will generate a random number, then open your Developer Tools. In the console, just paste the contents of the script.

## Update
Apparently by "10 digit", Sony means 10 character, as it can also contain letters. So rather than taking thousands of years to potentially work, this will never work. You can modify it to use letters as well if you choose, it shouldn't be very hard, but you're probably looking at millions of years to generate a code that works. I'll leave this here anyway, as it wasn't supposed to be something that actually works, so much as a fun little challenge and a proof of concept for brute forcing an API.