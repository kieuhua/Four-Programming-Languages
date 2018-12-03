require "pp"

def compare_ary(ary1, ary2)
	ary1.each_with_index do |e, idx|
		return -1 if e < ary2[idx]
		return 1 if e > ary2[idx]
	end
	0
end

def best_hands(hands)
	besthand = hands.shift
	pk1 = Poker.new(besthand)
	best_score, best_ranks = pk1.score_hand	 	# score_hand => integer, hash
	hands.each_with_index do |hand, idx |
		pk = Poker.new(hand)
		score, cur_ranks = pk.score_hand
		if score > best_score
			best_score = score
			besthand = hand
		elsif score == best_score
			# compare ranks(keys) between best_ranks and cur_ranks
			best_keys = best_ranks.keys
			ranks_keys = cur_ranks.keys
			result = compare_ary(best_keys, ranks_keys)
			if result < 0
				best_score = score
				besthand = hand
			elsif result == 0
				besthand = [besthand]		# change besthad from String to Array
				besthand << hand	
			end		
		end
	end
	besthand.kind_of?(String) ? [besthand] : besthand

end

class Poker
	RANKS_INDEX = '--23456789TJQKA' 
	attr_accessor :suits, 				# array of suit chars
	:ranks_hsh, 			# hash: key = rank, value = rank count, is sorted with ranks value DESC
	:hand					# current hand
	
	def initialize(hand)
		@hand = hand
		# @suits = array of suit
		# @ranKs_hsh = sorted ranks hash: value is count, ranks to RANKS_INDEX
		@suits, @ranks_hsh = get_suit_and_ranks(@hand)
	end
	
	### 1 convert hand to suit and ranks hash with count
	def get_suit_and_ranks(hand)
		# change 10 to T
		hand1 = hand.gsub('10', 'T')
		hand2 = hand1.gsub(' ','')
		suits = []
		hand2.each_char.with_index { |e, idx| suits << e unless idx.even? }		#=> ["S", "H", "S", "D", "H"]
		
		ranks = []
		hand2.each_char.with_index { |e, idx| ranks << e unless idx.odd? }		#=> ["2", "4", "6", "4", "J"]
		ranks2 = []
		ranks.each { |e|	ranks2 << '--23456789TJQKA'.index(e) }		# => [2, 4, 6, 4, 11]
		
		rsorted_ranks = ranks2.sort.reverse		# => [11,6,4,2,2]
		
		ranks_hsh = {}		# => {11=>1, 6=>1, 4=>1, 2=>2}
		rsorted_ranks.each {|e| ranks_hsh.key?(e) ? ranks_hsh[e] += 1 : ranks_hsh[e] = 1 }
		return suits, ranks_hsh
	end
	
	def score_hand()
		kinds = @ranks_hsh.values.sort.reverse			# [2, 1, 1, 1]
		ranks_keys = @ranks_hsh.keys.sort				# [2, 4, 6, 11] sorted, but no reverse
		
		# check for flush
		flush = @suits.all? { |e| suits[0] == e }		
		
		# check special straight case [2,3,4,5,14]: then modify ranks_hsh
		if ranks_keys.eql?([2, 3, 4, 5, 14])
			@ranks_hsh = {1=> 1, 2=> 1, 3=> 1, 4=> 1, 5=> 1}
			ranks_keys = @ranks_hsh.keys
		end

		# check for straight
		straight = ranks_keys.each_cons(2).all? { |a,b| b == a + 1 }

		score = 0
		case
		when straight && flush
			score = 8
		when kinds.eql?([4,1])
			score = 7
		when kinds.eql?([3,2])
			score = 6
		when flush
			score = 5
		when straight
			score = 4
		when kinds.eql?([3,1,1])
			score = 3
		when kinds.eql?([2,2,1])
			score = 2
		when kinds.eql?([2,1,1,1])
			score = 1
		else 
			score = 0
		end

		# ranks_hsh = {11=>1, 6=>1, 4=>1, 2=>2} = sort reverse key 
		# create ranks_values hash with ranks key is sorted DESC, then values is sorted DESC
		ranks_values = ranks_hsh.sort {|a1, a2| a2[1] <=> a1[1] }.to_h
		# => {2=>2, 11=>1, 6=>1, 4=>1}
		[score, ranks_values]
	end 
end

=begin
hands = [
	"4D 5S 6S 8D 3C",
	"2S 4C 7S 9H 10H",		
	"3S 4S 5D 6H JH",		
]		# expected = ["3S 4S 5D 6H JH"]  highest rank J work
best_hands(hands)

hands = [
	"4D 5S 6S 8D 3C",
	"2S 4C 7S 9H 10H",
	"3S 4S 5D 6H JH",
	"3H 4H 5C 6C JD",
]
best_hands(hands)
expected = [		tie work
	"3S 4S 5D 6H JH",
	"3H 4H 5C 6C JD",
]
=end
#hands =	['4S 5H 6S 8D JH','2S 4H 6S 4D JH']
#hands = ['4S 2H 6S 2D JH','2S 4H 6S 4D JH']	# two pair
#hands = ['2S 8H 2S 8D JH', '4S 5H 4S 8D 5H'] # two double pair
hands = ['2H 3H 2C 3S 5D','AH 2C 3S 4S 5S']		# ace low straight

best_hands(hands)
#expected = ["2S 4H 6S 4D JH"]	work
