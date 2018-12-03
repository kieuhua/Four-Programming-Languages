package poker;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.TreeMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;


/* Poker in java, 
  input one hand parse the hand for score and a List 
	poker.scoreHand() => PokerResult object
	PokerResult = { int score, List valuesRanks  }

	BestHand will compare two PokerResult objects 
	=> return a1 < a2 => -1, a1==a2 => 0; a1>a2 => 1
*/
/*
  A big logic mistake in scoreHand(), it has to be if else, if else
  not just if statement, then the score (straight && flushes) = 8 
  then be modified in later if statement to score = 4 (straight)
*/
public class Poker {
	public static final String RANKS_INDEX = "--23456789TJQKA";
	public static final Integer[] SPECIAL_STRAIGHT = new Integer[]{ 2,3,4,5,14};
	
	String hand;
	private char suits[];	

	// it creates in createRanksHash()
	private Integer[] ranksSorted = new Integer[5];	

	// store rank as key, value is count of rank
	private HashMap<Integer, Integer> ranks_hash = new HashMap<>();

	// use to create PokerResult object, this should be reset to 0 in scoreHand()
	int score = 0;	

	Poker(String handStr) {
		// BestHand class will pass in each hand	
		hand = handStr.replace("10", "T");	// replace 10 to 'T'
		suits = parseHand(hand, true);		// get suits
		createRanksHash(hand);	// create ranks_hash
		// scoreHand(); //for testing Poker.java by itself
	}

	// parse hand to create  suits and ranks char[], 
	// but only returns one of them
	// if argument flag = true => suits char[], flag = false => ranks char[]
	private char[] parseHand(String handStr, boolean flag) {
		char[] suits = new char[5];
		char[] ranks = new char[5];

		// take out spaces
		String str = handStr.replaceAll(" ", "");
		
		// create two char[], one for suits and one for ranks
		char[] handAry = str.toCharArray();
		int idx1 = 0;
		int idx2 = 0;
		for( int i=0; i < handAry.length ; i++ ) {
			if ( (i % 2) != 0) {
				suits[idx1++] = handAry[i];
			} else {
				ranks[idx2++] = handAry[i];
			}
		}
		// depend on flag return suits char[] or ranks char[]
		if (flag) {
			return suits;
		} else {
			return ranks;		
		}
	}

	// create ranks_hash, key is rank, and value is count of the rank
	private void createRanksHash(String handStr) {

		char[] ranks = parseHand(handStr, false);		// [ 6,5,K,5,T]
		
		// convert ranks 'T', 'J', 'Q', 'A' into values 
		for( int i=0; i < ranks.length; i++) {
			ranksSorted[i] = RANKS_INDEX.indexOf(ranks[i]);
		}	
		Arrays.sort(ranksSorted);	//[ 5,5,6,10,13]

		// create ranks hash with key= rank , value = count of rank
		for(int i=0; i < ranksSorted.length; i++) {
			if (ranks_hash.containsKey(ranksSorted[i])) {
				ranks_hash.put(ranksSorted[i], ranks_hash.get(ranksSorted[i]) + 1);
				//System.out.println(ranks_hash.get(ranksSorted[i]));	// => 2
			} else {
				ranks_hash.put(ranksSorted[i], 1);
			}
		}
	}

	/*
	poker.scoreHand() uses hand, suits, ranks_hash
	it calculate score by
	- check for flush, special straight, straight, kinds
	- get int score 0 - 8

	create HashMap ranks_hash
	- with key= rank and value= rank's count

	creates List valuesRanks 
	- ranks_hash reverse sort by ranks
	- then reverse sort by values
	=> List valuesRanks

	create PokerResult object
	return PokerResult = { int score, List valuesRanks }
	*/
	public PokerResult scoreHand() {
		score = 0;	// should be reset for each hand

		// check for flush, work => false
		boolean flush = true;
		for(int i=1; i< suits.length; i++) {
			if (suits[i] != suits[i-1]) {
				flush = false;
				break;
			}
		}

		// check for special straight [ 2,3,4,5,14];
		// so we can modify ranks_hash
		if ( Arrays.equals(ranksSorted, SPECIAL_STRAIGHT)) {
			// then change 14 to 1, change ranks_hash => {1: 1, 2:2, 3:3, 4:4, 5:5}
			ranks_hash.clear();		//k I forgot to clear the hash 
			ranks_hash.put(1,1);
			ranks_hash.put(2,2);
			ranks_hash.put(3,3);
			ranks_hash.put(4,4);
			ranks_hash.put(5,5);

			// need to change ranksSorted from
			//[ 2,3,4,5,14]; to [1,2,3,4,5]
			ranksSorted = new Integer[]{1, 2, 3, 4, 5}; 
		}

		// check for straight
		boolean straight = true;
		for(int i=1; i < ranksSorted.length; i++) {
			if (ranksSorted[i] != ranksSorted[i-1] + 1) {
				straight = false;
				break;
			}
		}
		
		// create kinds = values of ranks_hash, sort in reverse
		Collection<Integer> kinds_col = new ArrayList<>();
		kinds_col = ranks_hash.values();
		//System.out.println(Arrays.asList(ranks_hash));
		Integer[] kinds = new Integer[kinds_col.size()];
		Object[] kinds2 = kinds_col.toArray();
		
		// cast Object into int
		for(int i=0; i<kinds2.length; i++) {
			kinds[i] = (int) kinds2[i];
			//System.out.println(kinds[i]);
		}
		Arrays.sort(kinds, Collections.reverseOrder());	// reverse array order, [2,1,1,1]
		//System.out.println(Arrays.toString(kinds));

		Integer[] score_7 = new Integer[]{4,1};
		Integer[] score_6 = new Integer[]{3,2};
		Integer[] score_3 = new Integer[]{3,1,1};
		Integer[] score_2 = new Integer[]{2,2,1,};
		Integer[] score_1 = new Integer[]{2,1,1,1};

		// calculate score: kinds, flush, straight
		if (flush && straight) { 
			score = 8;
		} else if (Arrays.equals(kinds, score_7)) { 
			score = 7;
		} else if (Arrays.equals(kinds, score_6)) { 
			score = 6;
		} else if (flush) { 
			score = 5;
		} else if (straight) { 
			score = 4;
		} else if (Arrays.equals(kinds, score_3)) { 
			score = 3;
		} else if (Arrays.equals(kinds, score_2)) { 
			score = 2;
		} else if (Arrays.equals(kinds, score_1)) { 
			score = 1;
		} else {
			score = 0;
		}

		//k need to reverse ranks sort on ranks_hash 
		// then sort by values 

		// reverse sort on ranks => ordered List result1 on ranks
		List result1 = entriesSortedByValues(ranks_hash, true);
		//System.out.println(result1);	// [11=1, 8=2, 2=2]

		// sort the ordered List by value => List valuesRanks
		List valuesRanks = new ArrayList<Map.Entry<Integer, Integer>>();
	
		Map.Entry<Integer, Integer> entry1;
		Map.Entry<Integer, Integer> cur_entry;
		Integer  cur_value, value1;

		entry1 = (Map.Entry<Integer, Integer>) result1.get(0);
		value1 = entry1.getValue();
		valuesRanks.add(0, entry1);

		for (int i=1; i< result1.size(); i++) {
			cur_entry = (Map.Entry<Integer, Integer>) result1.get(i);
			cur_value = cur_entry.getValue();
			if ( cur_value >= value1 ) {
				// insert this Map.Entry before entry1, set valu1 = cur_value
				valuesRanks.add(i-1, cur_entry);
				value1 = cur_value;
			} else  {
				valuesRanks.add(i, cur_entry);
			}
		}
		System.out.println(valuesRanks);	// [8=2, 2=2, 11=1], [5=2, 4=2, 8=1]
		System.out.println("score: " + score);
		PokerResult result = new PokerResult(score, valuesRanks);

		return result;	
	}
	
	public static void main(String[] args) {
		String hand = "2S 8H 2S 8D JH";
		new Poker(hand);
	} 
	
	// compare two map with duplicated values == values are not unique 
	// flag = true sort reverse key, flag = false sort reverse value 
	static <K, V extends Comparable<? super K>> 
			List<Map.Entry<Integer,Integer>> entriesSortedByValues(Map<Integer,Integer> map, boolean flag) {
		boolean flag_K_V = flag;
		List<Map.Entry<Integer,Integer>> sortedEntries = new ArrayList<Map.Entry<Integer,Integer>>(map.entrySet());

		Collections.sort(sortedEntries, 
			new Comparator<Map.Entry<Integer,Integer>>() {
				@Override
				public int compare(Map.Entry<Integer,Integer> e1, Map.Entry<Integer,Integer> e2) {
					if (flag_K_V ) {
						return e2.getKey().compareTo(e1.getKey());
					} else {
						//k I didn't use this part
						return e2.getValue().compareTo(e1.getValue());
					}
				}
			}
		);
		return sortedEntries;
	}
}
