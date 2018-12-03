//poker.js 11/27/18

const RANKS_INDEX = '--23456789TJQKA' 

// return 0:equal; 1: a> b; -1: a < b
// assume a and b have same length
// this compArray() uses to compare ranks when the two hands have the same score.
const compArray = (a, b)  => {
	for (let i=0; i< a.length; i++) {
		let flag = a[i] - b[i]
		if (flag > 0) 
			return 1
		else if (flag < 0) {
			return -1
		}
	}
	return 0
}

// compKind(a, b) return a === b => true; otherwise => false
const compKind = (a, b) => {
	if (a.length !== b.length) {
		return false
	}
	for (let i=0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false
		}
	}
	return true
}

// return 0:equal; 1: a> b; -1: a < b
// compare Map objects, compare the keys of the Map objects not the values
const compMap = (map1, map2) => {
	// get keys of two maps, then compare arrays is easier
	const keys1_iterator = map1.keys()
	const keys2_iterator = map2.keys()
	const keys1 = Array.from(keys1_iterator)
	const keys2 = Array.from(keys2_iterator)
	
	if ( compArray(keys1, keys2) > 0) {
		return 1
	} else if (compArray(keys1, keys2) < 0) {
		return -1
	} else {
		return 0
	}		
}

// find the besthand or tie from an array of hands
const bestHands = hands => {
	let best_hands = hands[0]
	const pk1 = new Poker(hands[0])
	let best_score_map = pk1.score_hand() // => [score, Map object]
	let best_score = best_score_map[0]
	let best_map = best_score_map[1]
	
	// parse each hand
	for(let i=1; i<hands.length; i++) {
		const hand = hands[i]
		let pk = new Poker(hand)
		
		// get score and map object from poker.score_hand()
		const score_map = pk.score_hand()
		const score = score_map[0]
		const map = score_map[1]
		
		// compare score
		if (best_score < score) {
			best_hands = hand
			best_score = score
		} else if (best_score === score) {
			// need to compare ranks map
			const flag = compMap(best_map, map) 	// only place use compMap()
			if (flag < 0) {
				best_hands = hand
				best_score = score
			} else if (flag === 0) {
				// it is tie, add hand to best_hands
				// change best_hands from String to String Array
				best_hands = [best_hands].concat(hands[i])
			}
		} 
	}
	return best_hands
}

class Poker {   
	constructor(hand) {
		this.hand = hand
		this.suits = this.parseHand(true)		// get suits
		this.ranks = this.parseHand(false)	// get ranks
		
		// ranks_map: keys= ranks, values = ranks count
		// ranks_map is reverse sorted by ranks(key), ex: [ {11:1}, {8:2}, {2:2}]
		this.ranks_map = this.create_ranks_map()
	}
	
	// => ['2', 'S', '4', 'H', '6', 'S', '4', 'D', 'J', 'H']
	get_hand_ary() {
		const hand = this.hand
		const hand1 = hand.replace(/\s/g,'')
		const hand2 = hand1.replace(/10/g,'T')     // '10' to 'T'
		const hand_ary = hand2.split('')
		return hand_ary
	}

	parseHand(flag) {
		const hand_ary = this.get_hand_ary()
		let suits = []	// => ["S", "H", "S", "D", "H"]
		let ranks = []	// => ["5", "2", "4", "A", "3"]
		hand_ary.map( (elem, idx) => {
			 if ( idx%2 === 0) { // works too
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
	
	// ranks = ["2", "8", "2", "8", "2"]
	// => ranks_map = [ {11:1}, {8:2}, {2:2} ] a map with keys reverse sorted
	create_ranks_map() {
		let ranks_ary = []
		// convert ranks chars to its index values
		this.ranks.map( e => {
			ranks_ary.push(RANKS_INDEX.indexOf(e))
		})
		
		// => [11,8,8,2,2]  is reverse sort of ranks array
		ranks_ary.sort( (a,b) => b - a ) 
		
		// create ranks_map with reverse sorted ranks key, value = rank count
		let ranks_map = new Map()
		ranks_ary.forEach( key => {
			// if key exists
			if (ranks_map.has(key)) {
				ranks_map.set(key, ranks_map.get(key) + 1)
			} else {
				ranks_map.set(key, 1)
			}
		})
		
		// key in ranks_map is already key reverse sorted, ex: [{11:1}, {8:2}, {2:2}]
		// when calculate the ranks score, I will need to reverse sort by volue
		return ranks_map
	}
	
	score_hand() {
		// check for flush
		const flush = this.suits.every( e => this.suits[0] === e )
		
		// create sorted_ranks in value, sorted by ASC
		// get keys from ranks_map, then reverse sort keys from DESC to ASC
		const sortedIterator = this.ranks_map.keys()  // => iterator 
		// convert iterator to Array
		let sorted_ranks = Array.from(sortedIterator).reverse()	// change from DESC to ASC for straight comparison
		
		// check for special straight [2,3,4,5,14] => modify this.rank_map
		if (compKind(sorted_ranks, [2,3,4,5,14]) ) {
			// console.log("special straight")
			this.ranks_map = [ [1,1], [2,1], [3,3], [4,4], [5,5] ]
			sorted_ranks = [1,2,3,4,5]
		}
		
		// check straight
		let straight = true
		for ( let i=0; i<sorted_ranks.length; i++) {
			if ( sorted_ranks[i] !== sorted_ranks[0] + i) {
				straight = false
				break
			}       
		}
		
		// ranks_map is already key reverse sorted, ex:[ {11,1}, {8:2}, {2:2} ]
		// create ranks_values Map = reverse sort values on ranks_map
		// ranks_values Map will be included in return statement
		
		//const ranks_values = Array.from(this.ranks_map.entries()).sort((a,b) => b[1] - a[1])  // works
		const ranks_values = new Map([...this.ranks_map.entries()].sort((a,b) => b[1] - a[1]) )
		
		// create kinds array
		const values_map = ranks_values.values()			// => Iterator of values
		const kinds = Array.from(values_map)					// convert Iterator to array of values, [4,1], [2,1,1,1]
		
		// calculate score: kinds, flush, straight
		
		let score = 0
		if (flush && straight) score = 8
		else if ( compKind(kinds, [4,1]) ) score = 7
		else if ( compKind(kinds, [3,2]) ) score = 6
		else if ( flush ) score = 5
		else if ( straight ) score = 4
		else if ( compKind(kinds, [3,1,1]) ) score = 3
		else if ( compKind(kinds, [2,2,1]) ) score = 2
		else if ( compKind(kinds, [2,1,1,1]) ) score = 1
		else score = 0
		
		return [score].concat(ranks_values)		// ranks_values is a Map object
	}
}

export { bestHands }
