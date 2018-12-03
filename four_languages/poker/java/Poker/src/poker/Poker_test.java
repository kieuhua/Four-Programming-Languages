package poker;

import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.*;			// solve @Ignore problem

public class Poker_test {

	@Test
	public void test_nothing_vs_one_pair() {
		//k it gives me error when I use single quote
		String[] hands = new String[]{"4S 5H 6S 8D JH","2S 4H 6S 4D JH"};
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "2S 4H 6S 4D JH", result);
	}
	
	//@Ignore
	@Test
	public void test_two_pair(){
		String[] hands = new String[]{ "4S 2H 6S 2D JH", "2S 4H 6S 4D JH"};
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "2S 4H 6S 4D JH", result);
	}
	
	@Test
	public void test_one_pair_vs_double_pair(){
		String[] hands = new String[]{ "2S 8H 6S 8D JH", "4S 5H 4S 8D 5H"};	
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "4S 5H 4S 8D 5H", result);
	}
	
	//@Ignore
	@Test
	public void test_two_double_pair(){
		String[] hands = new String[]{ "2S 8H 2S 8D JH", "4S 5H 4S 8D 5H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "2S 8H 2S 8D JH", result);
	}
	
	@Test
	public void test_double_pair_vs_three(){
		String[] hands = new String[]{ "2S 8H 2S 8D JH", "4S 5H 4S 8D 4H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "4S 5H 4S 8D 4H", result);
	}
	
	@Test
	public void test_two_three(){
		String[] hands = new String[]{ "2S 2H 2S 8D JH", "4S AH AS 8D AH"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "4S AH AS 8D AH", result);
	}
	
	@Test
	public void test_three_vs_straight(){
		String[] hands = new String[]{ "4S 5H 4S 8D 4H", "3S 4H 2S 6D 5H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "3S 4H 2S 6D 5H", result);
	}
	
	@Test
	public void test_two_straight(){
		String[] hands = new String[]{ "4S 6H 7S 8D 5H", "5S 7H 8S 9D 6H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "5S 7H 8S 9D 6H", result);
		hands = new String[]{ "AS QH KS TD JH","4S AH 3S 2D 5H"};		
		result1 = BestHand.bestHand(hands);
		result = result1[0];
		assertEquals( "AS QH KS TD JH", result);
	}
	
	@Test
	public void test_straight_vs_flush(){
		String[] hands = new String[]{ "4S 6H 7S 8D 5H", "2S 4S 5S 6S 7S"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "2S 4S 5S 6S 7S", result);
	}
	
	@Test
	public void test_two_flush(){
		String[] hands = new String[]{ "3H 6H 7H 8H 5H", "2S 4S 5S 6S 7S"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "3H 6H 7H 8H 5H", result);
	}

	@Test
	public void test_flush_vs_full(){
		String[] hands = new String[]{ "3H 6H 7H 8H 5H", "4S 5H 4S 5D 4H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "4S 5H 4S 5D 4H", result);
	}
	
	@Test
	public void test_two_full(){
		String[] hands = new String[]{ "4H 4S 4D 9S 9D", "5H 5S 5D 8S 8D"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "5H 5S 5D 8S 8D", result);
	}
	
	@Test
	public void test_full_vs_square(){
		String[] hands = new String[]{ "4S 5H 4S 5D 4H", "3S 3H 2S 3D 3H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "3S 3H 2S 3D 3H", result);
	}
	
	@Test
	public void test_two_square(){
		String[] hands = new String[]{ "2S 2H 2S 8D 2H", "4S 5H 5S 5D 5H"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "4S 5H 5S 5D 5H", result);
	}
	
	//@Ignore
	@Test
	// straight_flushes = 8; square = 7
	public void test_square_vs_straight_flushes(){
		String[] hands = new String[]{ "4S 5H 5S 5D 5H", "5S 7S 8S 9S 6S"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "5S 7S 8S 9S 6S", result);
	}
	
	@Test
	public void test_ace_low_straight(){
		String[] hands = new String[]{ "AH 2C 3S 4S 5S", "2H 3H 2C 3S 5D"};		
		String[] result1 = BestHand.bestHand(hands);
		String result = result1[0];
		assertEquals( "AH 2C 3S 4S 5S", result);
	}
	
	//@Ignore
	@Test
	public void test_three_hand_with_tie(){
		String[] hands = new String[]{ "9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D", "4D 4S 4H QS KS"};		
		String[] result1 = BestHand.bestHand(hands);
		assertEquals( new String[]{"9S 8S 7S 6S 5S", "9D 8D 7D 6D 5D"}, result1);
	}
	
}