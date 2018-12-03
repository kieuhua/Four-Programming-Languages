
=begin
use 'specify' or 'it'
rspec poker_spec.rb
.................
Finished in 0.00696 seconds (files took 0.12145 seconds to load)
17 examples, 0 failures
=end

require_relative "./poker"

RSpec.configure do |config|
    config.expect_with :rspec, :minitest
end

RSpec.describe 'find winner in Poker game' do
    specify "nothing vs one pair" do
        hands = ['4S 5H 6S 8D JH','2S 4H 6S 4D JH']
        assert_equal best_hands(hands), ['2S 4H 6S 4D JH']
    end

    specify "two pair" do
        hands = ['4S 2H 6S 2D JH','2S 4H 6S 4D JH']
        assert_equal best_hands(hands), ['2S 4H 6S 4D JH']
    end

    it "one pair vs double pair" do
        hands = ['2S 8H 6S 8D JH','4S 5H 4S 8D 5H']
        assert_equal best_hands(hands), ['4S 5H 4S 8D 5H']
    end

    it "two double pair" do
        hands = ['2S 8H 2S 8D JH', '4S 5H 4S 8D 5H']
        assert_equal best_hands(hands), ['2S 8H 2S 8D JH']
    end

    it "double pair vs thee" do
        hands = ['2S 8H 2S 8D JH','4S 5H 4S 8D 4H']
        assert_equal best_hands(hands), ['4S 5H 4S 8D 4H']
    end

    it "two three" do
        hands = ['2S 2H 2S 8D JH','4S AH AS 8D AH']
        assert_equal best_hands(hands), ['4S AH AS 8D AH']
    end

    it "three vs straight" do
        hands = ['4S 5H 4S 8D 4H', '3S 4H 2S 6D 5H']
        assert_equal best_hands(hands), ['3S 4H 2S 6D 5H']
    end

    it "two straight" do
        hands = ['4S 6H 7S 8D 5H','5S 7H 8S 9D 6H']
        assert_equal best_hands(hands), ['5S 7H 8S 9D 6H']
        hands = ['AS QH KS TD JH','4S AH 3S 2D 5H']
        assert_equal best_hands(hands), ['AS QH KS TD JH']
    end

    it "straight vs flush" do
        hands = ['4S 6H 7S 8D 5H','2S 4S 5S 6S 7S']
        assert_equal best_hands(hands), ['2S 4S 5S 6S 7S']
    end

    it "two flush" do
        hands = ['3H 6H 7H 8H 5H','2S 4S 5S 6S 7S']
        assert_equal best_hands(hands), ['3H 6H 7H 8H 5H']
    end

    it "flush vs full" do
        hands = ['3H 6H 7H 8H 5H','4S 5H 4S 5D 4H']
        assert_equal best_hands(hands), ['4S 5H 4S 5D 4H']
    end

    it "two fulls" do
        hands = ['4S 5H 4S 5D 4H','3S 3H 2S 3D 3H']
        assert_equal best_hands(hands), ['3S 3H 2S 3D 3H']
    end

    it "full vs square" do
        hands = ['4S 5H 4S 5D 4H', '3S 3H 2S 3D 3H']
        assert_equal best_hands(hands), ['3S 3H 2S 3D 3H']
    end

    it "two square" do
        hands = ['2S 2H 2S 8D 2H','4S 5H 5S 5D 5H']
        assert_equal best_hands(hands), ['4S 5H 5S 5D 5H']
    end

    it "square vs straight flush" do
        hands = ['4S 5H 5S 5D 5H','5S 7S 8S 9S 6S']
        assert_equal best_hands(hands), ['5S 7S 8S 9S 6S'] 
    end

    it "ace low straight" do
        hands = ['AH 2C 3S 4S 5S','2H 3H 2C 3S 5D']
        assert_equal best_hands(hands), ['AH 2C 3S 4S 5S']
    end

    it "three hand with tie" do
        hands = ["9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D", "4D 4S 4H QS KS"]
        assert_equal best_hands(hands), ["9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D"]
    end
end