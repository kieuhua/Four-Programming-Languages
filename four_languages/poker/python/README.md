# Poker Game in Python
## Design summary
Poker Python has similar design in Poker Design doc
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
Python is similar to Ruby.
- python3 with comprehensive List in for loop is very powerful.
	- flush = all( self.suits[0] == s for s in self.suits )
	- straight = all( ranksSorted[0]+i == ranksSorted[i] for i in range(len1) )
- python list is ruby array
- python Dictionary is unordered of collection of data, Ruby Hash is ordered as insertion of data.
- python3 remove has_key(), now use if i in ranksDict
- python3 has lambda function similar to Ruby
	- findex = lambda c: '--23456789TJQKA'.index(c) # convert ranks to values
- python can use compare operator (<,>,==) to compare two Lists (with Dictionary elements), that simplifies the code a lot compare to Java.
_ many python functions are destructive not like Ruby need to has ‘!’ function for destructive
	- ex: python array.reverse() => modify the array, ruby array.reverse, but array.reverse! will 
	
## Testing
17 tests compare different combination of hands: flush vs straight, square vs full house, two squares,….
- Use umittest module, poker_uint_test.py

```
cd /Users/local-kieu/programming_skills/four_languages/poker/python
$ python3 poker_unit_test.py 
.................
----------------------------------------------------------------------
Ran 17 tests in 0.002s
OK
----------------  
```

- Use pytest:
	To create and activate a virtual environment for this project, let's run the following commands:
	
```
Create a virtual environment
mkdir kieu-pytest
cd kieu-pytest
python3 -m venv kieu-pytest
```

As long as the virtualenv is active, any packages we install will be installed in our virtual environment, rather than in the global Python installation.

```
To get started, let's install pytest in our virtualenv.
$ pip install pytest		# look good

cd /Users/local-kieu/programming_skills/four_languages/poker/python/poker-pytest
$ pytest
============================================== test session starts ===============================================
platform darwin -- Python 3.7.0, pytest-3.8.2, py-1.7.0, pluggy-0.7.1
rootdir: /Users/local-kieu/programming_skills/four_languages/poker/python/poker-pytest, inifile:
plugins: mock-1.10.0, cov-2.6.0
collected 17 items                                                                                               
test_poker_pytest.py .................                                                                     [100%]
=========================================== 17 passed in 1.16 seconds 
```

