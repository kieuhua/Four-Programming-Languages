# Four Languages - Javascript, Java, Python and Ruby
This is Kieu Hua demo programming project in four languages - Javascript, Java, Python and Ruby. 
These programs are tested in different frameworks - Jest, JUnit, pytest and RSpec.

## The purpose of the project
The purpose of this project is for Kieu Hua's potential employer to evaluate her works.

## Poker Game
This poker program will evaluate the input hands to find the winner hand of Poker Game.

## Design of Poker
The design of the poker game is very similar for four languages. 

## Poker program components

### best_hands component
```
	const bestHands = hands => {...}	// bestHands function in Javascript
	BestHand.java							// BestHand class in Java
	def bestHand(hands):			# besthand function in python
	def best_hands(hands)			# best_hands function in Ruby
```

### Poker class component
```
	class Poker	for four languages - Javascript, Java, python and Ruby							
```

#### Design of best_hands component
bestHands(hands) parses each hand with following steps
1. create poker object for each hand
2. call poker.scoreHand() to calculate score and a hash(key=rank, value=rank count)
3. compare the score to find winner. If same score compare ranks in the hash

#### Design of Poker class
Poker class process each hand in following steps
1. In constructor: parse hand to create suits array and ranks_hash(key=rank, value=rank count)
2. poker.score_hand		// calculate score 
	- check for flush:  ['S', 'S', 'S', 'S', 'S']
	- check for special straight [2,3,4,5,14]
	- check for straight
	- calculate score: 0-8
		- straight && flush	=>	score = 8
		- kinds [ 4,1]	=> 	score = 7		// square
		- kinds [ 3,2]	=> 	score = 6		// full house
		-	flush		=>	score = 5
		- straight	=>	score = 4
		- kinds [ 3,1,1]	=> 	score = 3		// three
		- kinds [ 2,2,1]	=> 	score = 2		// double pair
		- kinds [ 2,1,1,1]	=> 	score = 1		// one pair
		- else	=>  score = 0

	- create values_ranks hash by
		- first ranks_hash is sorted by reverse key(rank) 
		- then sorted that same ranks_hash with reverse value(rank count)


	
