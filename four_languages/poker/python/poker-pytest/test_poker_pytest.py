'''
cd /Users/local-kieu/Exercism/python/poker/python/poker-pytest/poker-pytest
$ pytest
=> ...
test_poker_pytest.py .................                                                          [100%]

====================================== 17 passed in 1.17 seconds ======================================

'''
import pytest
from poker import Poker, bestHand

def test_nothing_vs_one_pair(): 
	hands = ['4S 5H 6S 8D JH','2S 4H 6S 4D JH']
	assert ['2S 4H 6S 4D JH'] == bestHand(hands) 

def test_two_pair():
	hands = ['4S 2H 6S 2D JH',
			'2S 4H 6S 4D JH']
	assert ['2S 4H 6S 4D JH'] ==  bestHand(hands)

def test_one_pair_vs_double_pair():
	hands = ['2S 8H 6S 8D JH',
			'4S 5H 4S 8D 5H']
	assert ['4S 5H 4S 8D 5H'] ==  bestHand(hands)

def test_two_double_pair():
	hands = ['2S 8H 2S 8D JH',
			'4S 5H 4S 8D 5H']
	assert ['2S 8H 2S 8D JH'] == bestHand(hands)

def test_double_pair_vs_three():
	hands = ['2S 8H 2S 8D JH',
			'4S 5H 4S 8D 4H']
	assert ['4S 5H 4S 8D 4H'] == bestHand(hands)

def test_two_three():
	hands = ['2S 2H 2S 8D JH',
			'4S AH AS 8D AH']
	assert ['4S AH AS 8D AH'] == bestHand(hands)

def test_three_vs_straight():
	hands = ['4S 5H 4S 8D 4H',
			'3S 4H 2S 6D 5H']
	assert ['3S 4H 2S 6D 5H'] == bestHand(hands)

def test_two_straight():
	hands = ['4S 6H 7S 8D 5H',
			'5S 7H 8S 9D 6H']
	assert ['5S 7H 8S 9D 6H'] == bestHand(hands)
	hands = ['AS QH KS TD JH',
			'4S AH 3S 2D 5H']
	assert ['AS QH KS TD JH'] == bestHand(hands)

def test_straight_vs_flush():
	hands = ['4S 6H 7S 8D 5H',
			'2S 4S 5S 6S 7S']
	assert ['2S 4S 5S 6S 7S'] == bestHand(hands)

def test_two_flush():
	hands = ['3H 6H 7H 8H 5H',
			'2S 4S 5S 6S 7S']
	assert ['3H 6H 7H 8H 5H'] == bestHand(hands)

def test_flush_vs_full():
	hands = ['3H 6H 7H 8H 5H',
			'4S 5H 4S 5D 4H']
	assert ['4S 5H 4S 5D 4H'] == bestHand(hands)

#@unittest.skip('error1')
def test_two_fulls():
	hands = ['4H 4S 4D 9S 9D',
			'5H 5S 5D 8S 8D']
	assert ['5H 5S 5D 8S 8D'] == bestHand(hands)

#@unittest.skip('error2')
def test_full_vs_square():
	hands = ['4S 5H 4S 5D 4H',
			'3S 3H 2S 3D 3H']
	assert ['3S 3H 2S 3D 3H'] == bestHand(hands)

def test_two_square():
	hands = ['2S 2H 2S 8D 2H',
			'4S 5H 5S 5D 5H']
	assert ['4S 5H 5S 5D 5H'] == bestHand(hands)

def test_square_vs_straight_flush():
	hands = ['4S 5H 5S 5D 5H',
			'5S 7S 8S 9S 6S']
	assert ['5S 7S 8S 9S 6S'] == bestHand(hands)

def test_ace_low_straight():
	hands = ['AH 2C 3S 4S 5S',
			'2H 3H 2C 3S 5D']
	assert ['AH 2C 3S 4S 5S'] == bestHand(hands)

def test_three_hand_with_tie():
    hands = ["9S 8S 7S 6S 5S",
            "9D 8D 7D 6D 5D",
            "4D 4S 4H QS KS"]
    assert ["9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D"] == bestHand(hands)
