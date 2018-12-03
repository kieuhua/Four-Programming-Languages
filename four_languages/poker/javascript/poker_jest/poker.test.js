
/* 
    cd /Users/local-kieu/programming_skills/four_languages/poker/javascript/poker_jest
    jest poker.test.js
    => 
    All 17 tests are pass, 
    Test Suites: 1 passed, 1 total
    Tests:       17 passed, 17 total
    Snapshots:   0 total
*/
import {bestHands} from "./poker.js"

test('nothing_vs_one_pair', () => {
    const hands = ['4S 5H 6S 8D JH','2S 4H 6S 4D JH']
    expect(bestHands(hands)).toBe('2S 4H 6S 4D JH')
})
test('two_pairs', () => {
    const hands = ['4S 2H 6S 2D JH', '2S 4H 6S 4D JH']
    expect(bestHands(hands)).toBe('2S 4H 6S 4D JH')
})
test('one_pair_vs_double_pair', () =>{
    const hands = ['2S 8H 6S 8D JH', '4S 5H 4S 8D 5H']
    expect(bestHands(hands)).toBe('4S 5H 4S 8D 5H')
})
test('two_double_pair', () => {
    const hands = ['2S 8H 2S 8D JH', '4S 5H 4S 8D 5H']
    expect(bestHands(hands)).toBe('2S 8H 2S 8D JH')
})
test('double_pair_vs_three', () => {
    const hands = ['2S 8H 2S 8D JH', '4S 5H 4S 8D 4H']
    expect(bestHands(hands)).toBe('4S 5H 4S 8D 4H')
})
test('two_three', () => {
    const hands = ['2S 2H 2S 8D JH', '4S AH AS 8D AH']
    expect(bestHands(hands)).toBe('4S AH AS 8D AH')
})
test('three_vs_straight', () => {
    const hands = ['4S 5H 4S 8D 4H', '3S 4H 2S 6D 5H']
    expect(bestHands(hands)).toBe('3S 4H 2S 6D 5H')
})
//test.skip(...) to skip test
test('two_straight', () => {        // this count as 1 test, even there are two expect
    let hands = ['4S 6H 7S 8D 5H', '5S 7H 8S 9D 6H']
    expect(bestHands(hands)).toBe('5S 7H 8S 9D 6H')
    hands = ['AS QH KS TD JH', '4S AH 3S 2D 5H']
    expect(bestHands(hands)).toBe('AS QH KS TD JH')
})
test('straight_vs_flush', () => {
    const hands = ['4S 6H 7S 8D 5H', '2S 4S 5S 6S 7S']
    expect(bestHands(hands)).toBe('2S 4S 5S 6S 7S')
})
test('two_flush', () => {
    const hands = ['3H 6H 7H 8H 5H', '2S 4S 5S 6S 7S']
    expect(bestHands(hands)).toBe('3H 6H 7H 8H 5H')
})
test('flush_vs_full', () => {
    const hands = ['3H 6H 7H 8H 5H','4S 5H 4S 5D 4H']
    expect(bestHands(hands)).toBe('4S 5H 4S 5D 4H')
})
test('two_full', () => {
    const hands = ['4H 4S 4D 9S 9D', '5H 5S 5D 8S 8D']
    expect(bestHands(hands)).toBe('5H 5S 5D 8S 8D')
})
test('full_vs_square', () => {
    const hands = ['4S 5H 4S 5D 4H', '3S 3H 2S 3D 3H']
    expect(bestHands(hands)).toBe('3S 3H 2S 3D 3H')
})
test('two_square', () => {
    const hands = ['2S 2H 2S 8D 2H', '4S 5H 5S 5D 5H' ]
    expect(bestHands(hands)).toBe('4S 5H 5S 5D 5H')
})
test('square_vs_straigth_flush', () => {
    const hands = ['4S 5H 5S 5D 5H', '5S 7S 8S 9S 6S']
    expect(bestHands(hands)).toBe('5S 7S 8S 9S 6S')
})
test('ace_low_straight', () => {
    const hands = ['AH 2C 3S 4S 5S', '2H 3H 2C 3S 5D']
    expect(bestHands(hands)).toBe('AH 2C 3S 4S 5S')
})
test('three_hand_with_tie', () => {
    const  hands = ["9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D", "4D 4S 4H QS KS"]
    expect(bestHands(hands)).toHaveLength(2)
})