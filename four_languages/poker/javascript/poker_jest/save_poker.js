hands = [
	"4S 5H 6C 8D KH",
	"2S 4H 6S 4D JH",
]
const RANKS_INDEX = '--23456789TJQKA' 

/*
to compare JS array, loop through them and compare each value
can’t use “===’ operator  ex: [1,2,3] === [1,2,3]	is false

 return 0:equal; 1: a> b; -1: a < b
 a, b arrays can have exact same length or a is shorter than b; otherwise I will have out of bound
 use compArray() to compare for sorted_ranks with [2,3,4,5,14](special straight),
 and kinds with [4,1], [2,1,1,1], ..

 But I can't use compArray() to compare [4,1], sorted_ranks =[2,3,4,5,14]
 I avoid this compare situation, by check flush and straight before comparing
 any array in if else if statement in scoreHand()
*/

const compArray = (a, b) => {
    for (let i=0; i< a.length; i++) {
        let flag = a[i] - b[i]
        if (flag > 0) 
            return 1
        else if (flag < 0) {
            return -1
        }
    }
    // this is bad, because you assume they equal 0
    return 0
}

// return 0:equal; 1: a> b; -1: a < b
// need to comp [ Map object]
const compMap= (map1, map2) => {
    // get keys of two maps, then compare arrays is easy
    const key1 = map1.keys()
    const key2 = map2.keys()
    
    if (compArray(key1, key2) > 0) {
        return 1
    } else if ( compArray(key1,key2) < 0) {
        return -1
    } else {
        return 0
    }
}

const best_hands = hands => {
    let best_hands = hands[0]
    const pk1 = new Poker(hands[0])
    let best_score_map = pk1.score_hand()   // => [score, Map object]
    let best_score = best_score_map[0]
    let best_map = best_score_map[1]
    
    for(let i=1; i< hands.length; i++) {
        const hand = hands[i]
        let pk = new Poker(hand)
        
        const score_map = pk.score_hand()
        const score = score_map[0]
        const map = score_map[1]
        if (  best_score < score ) {
            best_hands = hand
            best_score = score
        } else if ( best_score === score) {
            // need to compare ranks map
            const flag = compMap(best_map, map)     // only place use compMap()
            if (flag < 0 ) {
                best_hands =  hand
                best_score =  score
            } else if ( flag === 0 ) {
                // change best_hands from String to String[]
                best_hands = [ best_hands].concat(hands[i])
            }
        }
    };
    console.log(best_hands) 
    console.log(best_score)
}

// simplify check for odd or even
const isOdd = x => x%2 === 0        // isOdd array index

class Poker {   
    constructor(hand) {
        this.hand = hand
        this.suits = this.parseHand(true)        // get suits
        this.ranks = this.parseHand(false)       // get ranks, convert int 
        // ranks_map: keys = ranks, values = ranks counts
        // ranks_map is reverse sorted by ranks(key), ex: [ {11: 1}, {8:2}, {2: 2}]
        this.ranks_map = this.create_ranks_map()
    }
    
    // => [ '2', 'S', '4', 'H', '6', 'S', '4', 'D', 'J', 'H' ]
    get_hand_ary() {
        const hand = this.hand
        const hand1 = hand.replace(/\s/g,'')
        const hand2 = hand1.replace(/10/g,'T')     // '10' to 'T'
        const hand_ary = hand2.split('')
        // console.log(hand_ary)
        return hand_ary
    }
    
    parseHand(flag) {
        const hand_ary = this.get_hand_ary()
        let suits = []      //=> ["S", "H", "S", "D", "H"]
        let ranks = []      //=> ["5", "2", "4", "A", "3"]
        hand_ary.map( (elem, idx) => {
            // if (idx % 2 === 0 ) {     //works too
            if (isOdd(idx)) {   
                ranks.push(hand_ary[idx])
            } else {
                suits.push(hand_ary[idx])
            }
        })
        if (flag) {
            return suits
        } else {
            return ranks
        }
    }

    // ranks =["2", "8", "2", "8", "J"]
    // => ranks_map = [ {11: 1}, {8:2}, {2: 2}] a map with keys reverse sorted
    create_ranks_map() {
        let ranks_ary = []
        // convert ranks chars to its index values, 
        this.ranks.map( e => {
            ranks_ary.push(RANKS_INDEX.indexOf(e))
        })
        
        // reverse sorted ranks
        // sort() is char sorted => 11 is small than 2, bc 1 < 2
        // for numberic sort I need sort((a, b) =>  a - b )  
        // => [ 11, 8, 8, 2, 2]
        ranks_ary.sort( (a,b) => a -b ).reverse()       
        // create ranks_map with sorted ranks key, value = rank count
        let ranks_map = new Map()
        ranks_ary.map( (key, i) => {
            if (ranks_map.get(key) ) {
                ranks_map.set(key, ranks_map.get(key) + 1)
            } else {
                ranks_map.set(key, 1 )
            }
        })

        // key in ranks_map is already key reverse sorted, ex: [ {11: 1}, {8:2}, {2: 2}]
        // when caculate the ranks score, I will need to reverse sort by value
        return ranks_map
    }
    
    score_hand() {
        
        // check for flush
        const flush = this.suits.every( e => this.suits[0] === e )
        
        // ranks is still char[], need to convert to index value 
        const ranks_1  = []
        this.ranks.map( e => {
            ranks_1.push(RANKS_INDEX.indexOf(e))
        })
        
        let sorted_ranks = []   // ranks Ascend sort of ranks values
        // default, JS sort() sort by alphabetically, eventhough ranks_1 is numeric array, 
        // to sort numberically, use function a - b => -1, 0, 1
        sorted_ranks = ranks_1.sort( (a, b) =>  a - b )      
        
        // check for special straight [2,3,4,5,14] => modify this.rank_dict
        //if ( compArray(sorted_ranks, [2,3,4,5,14]) === 0 ){

        // this is bug ???
        if ( compArray( sorted_ranks,[2,3,4,5,14]) === 0 ){

            // console.log("special straight")
            this.ranks_map = [ [1, 1], [2, 2], [3, 3], [4, 4], [5, 5] ] 
            sorted_ranks = [1,2,3,4,5]
        }
        
        // check straight
        let straight = true
        for ( let i= 0; i < sorted_ranks.length; i++) {
            if ( sorted_ranks[i] !== sorted_ranks[0] +i ) {
                straight = false
                break
            }
        } 
        
        // ranks_map is already key reverse sorted, ex: [ {11: 1}, {8:2}, {2: 2}]
        // create ranks_values = reverse sort values on ranks_map,
        // ranks_values will be include in return statement 

        // const ranks_values = Array.from(this.ranks_map.entries()).sort( (a,b) => b[1] - a[1] ) works
        // or
        const ranks_values = new Map([...this.ranks_map.entries()].sort( (a,b) =>  b[1] - a[1] ))
        
        // create kinds array, ex []
        const values_map = ranks_values.values()     // get keys from reverse values sorted map
        const kinds = Array.from(values_map)   // convert iterable to keys array of the map

        // caculate score: kinds, flush, straight

        let score = 0
        
        if (flush && straight) score = 8
        else if (flush) score = 5
        else if (straight) score = 4
        else if ( compArray([4,1], kinds) === 0 ) score = 7
        else if ( compArray([3,2], kinds) === 0)  score = 6
        else if ( compArray([3,1,1], kinds) === 0)  score = 3
        else if ( compArray([2,2,1], kinds) === 0)  score = 2
        else if ( compArray([2,1,1,1], kinds) === 0)  score = 1
      
        else score = 0;
        
        return [score].concat(ranks_values)     // ranks_values is a Map object
    }
}

/*
pk = new Poker("4S 5H 6C 5D KH")
//pk = new Poker("4S 5S 6S 5S KS")
//pk = new Poker("9S TS JS QS KS")
//pk = new Poker("2S 3H 4C 5D AH")

score_ary = pk.score_hand()
console.log(score_ary)
//console.log(pk.suits, pk.ranks_dict)

hands = [
	"4D 5S 6S 8D 3C",
	"2S 4C 7S 9H 10H",		
	"3S 4S 5D 6H JH",		
]		// expected = ["3S 4S 5D 6H JH"]  highest rank J work

hands = [
	"4D 5S 6S 8D 3C",
	"2S 4C 7S 9H 10H",
	"3S 4S 5D 6H JH",
	"3H 4H 5C 6C JD",
]
best_hands(hands)
expected = [ "3S 4S 5D 6H JH", "3H 4H 5C 6C JD",]// expect tie
hands = ["4S 5H 6C 8D KH","2S 4H 6S 4D JH"]     // "2S 4H 6S 4D JH" 

hands = ['2S 8H 2S 8D JH','4S 5H 4S 8D 5H']
*/
hands = ['5S 2H 4S AD 3H','2S 8H 2S 8D JH']     // test special straight
best_hands(hands)
