# Poker Game in Java
## Design summary
Poker Java has similar design in Poker Design doc
```
class BestHand
```	

- create Poker object for each hand
- then compare each to find the winner

```
class Poker
```	
- parse hand
- check for flush, straight
- create kinds 
- call score_hand() => [ score, ranks_values(Map object)]

see four_languages/README.md
four_languages/poker/doc/Poker_Design.docs 

## Some technical highlights
- Java is strong style language, so it is more complicated to write specially dealing with Hash data structures, converting between HashMap, TreeMap, ArrayList,  …
I tried a few ways to sort HashMap like TreeMap; however, it is not trivial to convert TreeMap back to HashMap; 

- Finally, I use unordered HashMap for ranks_hash to store (key, value) pair for ranks and ranks counts.

- Then, I use ordered ArralyList<Map.Entry> for valuesList, 
	- first valuesList is reverse sorted by keys(ranks),
	- then reverse sorted by values(ranks count).

- I use Arrays.sort(list, Collections.reverseOrder()) and use entriesSortedByValues(..) to reverse sort values on List with HashMap.Entry. These sort processes simplify the sorting process and easy to understand the code.

- PokerResult class contains data structure for return from poker.scoreHand() function
```
	{ Integer score; ArrayList valuesRanks }
```

### BestHand class
- create Poker object for each hand
- call poker.scoreHand() => PokerResult object
- to find the winner compare score in PokerResult 
	- if same score, then compare ArrayList in PokerResult  by comparePokerResult(..)
		- comparePokerResult() call compareList()
		
### Poker class
- parses each hand into char[] suits, and HashMap ranks_hand
- convert rank “10” to “T”
- convert rank to index int using RANKS_INDEX = "--23456789TJQKA";  to 2,3,4,5,6,7,8,9,10,11,12,13,14
- ranks_hand: key is rank, and value is rank count

- scoreHand()
	- check for flush, straight
		- create kinds 
		- find score
		- create ArrayList<Map.Entry> valuesRanks
			- first reverse sort on ranks into an ordered ArrayList= a List with Map.Entry
			- second reverse sort on value of Map.Entry in this ArrayList valuesRanks

	- return PolerResult = { Integer score; ArrayList valuesRanks }

### Use Eclipse for Java Poker porject
I create Eclipse Poker project with three classes – Poker, PokerResult and BestHand

## Testing
- Using Junit 
- create Poker_test class 

17 tests compare different combination of hands: flush vs straight, square vs full house, two squares, …



