package poker;

import java.util.*;

public class PokerResult {
    private Integer score;
    private ArrayList valuesRanks;

    public PokerResult(Integer score_in, List valuesRanks_in) {
        score = score_in;
        valuesRanks = (ArrayList) valuesRanks_in;
    }

    public int getScore() {
        return (int) score;
    }

    public List valuesRanks() {
        return valuesRanks;
    }
    
    public static void main(String[] args) {
    
    }
}