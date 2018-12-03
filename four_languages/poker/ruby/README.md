# Poker Game in Ruby
## Design summary
Poker Ruby has similar design in Poker Design doc
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

## Some technical hightlights
- Use '--23456789TJQKA'.index(e) to convert rank character to rank values
- Use ternary operator,  and check for existing key to create ransk_hash, 
	ranks_hsh.key?(e) ? ranks_hsh[e] += 1 : ranks_hsh[e] = 1
- Use each_cons to check for straight = [1, 2,3,4,5]
	- ranks_keys.each_cons(2).all? { |a,b| b == a + 1 }
- Use case, when to compare score
- reverse values sort in hash => ranks_values hash
	- ranks_hsh.sort {|a1, a2| a2[1] <=> a1[1] }.to_h

## Testing
There are a lot more features RSpec 3.8, RSpec is getting too big and there will be RSpec 4 soon, 
I will use more RSpec features in future project.
For this project, I only need simple assert_equal in :minitest for this project

17 tests compare different combination of hands: flush vs straight, square vs full house, two squares,….

rspec poker_spec.rb
.................
Finished in 0.00696 seconds (files took 0.12145 seconds to load)
17 examples, 0 failures
