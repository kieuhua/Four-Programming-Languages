'''
cd /Users/local-kieu/programming_skills/four_languages/poker/python

python3 poker_unit_test.py
.................
----------------------------------------------------------------------
Ran 17 tests in 0.002s

OK
'''
import unittest

from poker import bestHand      #k from poker module import bestHand function

# define PokerTest class, then define each test 
# as a function with name "test_..."
class PokerTest(unittest.TestCase):
    #k def test_one_hand(self) skip

    def test_nothing_vs_one_pair(self):
        hands = ['4S 5H 6S 8D JH',
                '2S 4H 6S 4D JH']
        self.assertEqual(['2S 4H 6S 4D JH'], bestHand(hands)) 
    
    def test_two_pair(self):
        hands = ['4S 2H 6S 2D JH',
                '2S 4H 6S 4D JH']
        self.assertEqual(['2S 4H 6S 4D JH'], bestHand(hands))
    
    def test_one_pair_vs_double_pair(self):
        hands = ['2S 8H 6S 8D JH',
                '4S 5H 4S 8D 5H']
        self.assertEqual(['4S 5H 4S 8D 5H'], bestHand(hands))

    def test_two_double_pair(self):
        hands = ['2S 8H 2S 8D JH',
                '4S 5H 4S 8D 5H']
        self.assertEqual(['2S 8H 2S 8D JH'], bestHand(hands))

    def test_double_pair_vs_three(self):
        hands = ['2S 8H 2S 8D JH',
                '4S 5H 4S 8D 4H']
        self.assertEqual(['4S 5H 4S 8D 4H'], bestHand(hands))

    def test_two_three(self):
        hands = ['2S 2H 2S 8D JH',
                '4S AH AS 8D AH']
        self.assertEqual(['4S AH AS 8D AH'], bestHand(hands))

    def test_three_vs_straight(self):
        hands = ['4S 5H 4S 8D 4H',
                '3S 4H 2S 6D 5H']
        self.assertEqual(['3S 4H 2S 6D 5H'], bestHand(hands))

    def test_two_straight(self):
        hands = ['4S 6H 7S 8D 5H',
                '5S 7H 8S 9D 6H']
        self.assertEqual(['5S 7H 8S 9D 6H'], bestHand(hands))
        hands = ['AS QH KS TD JH',
                '4S AH 3S 2D 5H']
        self.assertEqual(['AS QH KS TD JH'], bestHand(hands))

    def test_straight_vs_flush(self):
        hands = ['4S 6H 7S 8D 5H',
                '2S 4S 5S 6S 7S']
        self.assertEqual(['2S 4S 5S 6S 7S'], bestHand(hands))
    
    def test_two_flush(self):
        hands = ['3H 6H 7H 8H 5H',
                '2S 4S 5S 6S 7S']
        self.assertEqual(['3H 6H 7H 8H 5H'], bestHand(hands))

    def test_flush_vs_full(self):
        hands = ['3H 6H 7H 8H 5H',
                '4S 5H 4S 5D 4H']
        self.assertEqual(['4S 5H 4S 5D 4H'], bestHand(hands))

    #@unittest.skip('error1')
    def test_two_fulls(self):
        hands = ['4H 4S 4D 9S 9D',
                '5H 5S 5D 8S 8D']
        self.assertEqual(['5H 5S 5D 8S 8D'], bestHand(hands))

    #@unittest.skip('error2')
    def test_full_vs_square(self):
        hands = ['4S 5H 4S 5D 4H',
                '3S 3H 2S 3D 3H']
        self.assertEqual(['3S 3H 2S 3D 3H'], bestHand(hands))

    def test_two_square(self):
        hands = ['2S 2H 2S 8D 2H',
                '4S 5H 5S 5D 5H']
        self.assertEqual(['4S 5H 5S 5D 5H'], bestHand(hands)) 

    def test_square_vs_straight_flush(self):
        hands = ['4S 5H 5S 5D 5H',
                '5S 7S 8S 9S 6S']
        self.assertEqual(['5S 7S 8S 9S 6S'], bestHand(hands))

    def test_ace_low_straight(self):
        hands = ['AH 2C 3S 4S 5S',
                '2H 3H 2C 3S 5D']
        self.assertEqual(['AH 2C 3S 4S 5S'], bestHand(hands))

    #@unittest.skip('error3')
    #def skip_three_hand_with_tie(self):
    def test_three_hand_with_tie(self):
        hands = ["9S 8S 7S 6S 5S",
                "9D 8D 7D 6D 5D",
                "4D 4S 4H QS KS"]
        self.assertEqual(["9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D"], bestHand(hands))

if __name__ == '__main__':
    unittest.main()

