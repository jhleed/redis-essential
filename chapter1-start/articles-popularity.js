var redis = require("redis");
var client = redis.createClient();

function upVote(id) {
	var key = "article:" + id + ":votes";
	client.incr(key);
}

function downVote(id) {
	var key = "article:" + id + ":votes";
	client.decr(key);
}

function showResults(id) {
	var headlineKey = "article:" + id + ":headline";
	var voteKey = "article:" + id + ":votes";

	//콜백을 전달할 수 있는 mget api 
	client.mget([headlineKey, voteKey], function (err, replies) {
		console.log("The article " + replies[0] + "has " + replies[1] + " votes");
	});
}


// 12345 아티클 3번 투표 (+3)
upVote(12345);
upVote(12345);
upVote(12345);

// 10001 아티클 3번 투표 (+2, -1)
upVote(10001);
upVote(10001);
downVote(10001);

//  60056 아티클 1번 투표 (+1)
upVote(60056);

//결과 보여주기
showResults(12345);
showResults(10001);
showResults(60056);

client.quit();