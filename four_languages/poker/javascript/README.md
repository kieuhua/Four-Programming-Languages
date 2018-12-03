# Poker Game in Javascript
## Design summary
Poker Javascript has similar design in Poker Design doc
```
def best_hands(hands)	
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
- use ES6 syntax: =>, const, let, spread operater
- use Map class to creat ranks_map object, use Map.get, Map.set, Map.entries
- use map() function for array
- use String.indexOf to convert character array to integer array 
	- ranks_ary.push(RANKS_INDEX.indexOf(e))
- reverse sort array:	ranks_ary.sort( (a,b) => b - a )
- use Array.from in compare two Map objects by their keys
	- const keys1_iterator = map1.keys()
	- const keys1 = Array.from(keys1_iterator)
- sort reverse Map values : 
	- const ranks_values = new Map([...this.ranks_map.entries()].sort((a,b) => b[1] - a[1]) )

- I have to write three compare functions: 
	- compArray(a,b)	=> -1, 0 , 1		to compare two arrays
	- compKind(a,b)	=> true, false		to compare two arrays
	- compMap(map1, map2)  => -1, 0, 1 to compare two Map objects

## Testing
17 tests compare different combination of hands: flush vs straight, square vs full house, two squares,….

- Use jest to do Poker unit tests. Jest is newer and better than jasmine. jest designs to test web application
- It has asynchronous testing – Callbacks, Promises(resolve/reject) or (Async/await), 
- Some features are similar to RSpec: Setup(beforeEach, beforeAll), Teardown(afterEach, afterAll). 
	- Grouping test with “describe()”, some Matchers like toBe, toContain, toMartch,
	- toBeDefined, toHaveLength, toBeGreateThan, toThrow, toBeInstanceOf, …
- Snapshot testing: compare html tags of two views.

### create poker_jest project
```
cd ./four_languages/poker/javascript/poker_jest
$ jest poker.test.js
...
Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
```

