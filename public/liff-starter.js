var bearerToken;

window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";
	bearerToken = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
				bearerToken = jsonResponse.bearerToken;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
		bearerToken = "";
        initializeLiffOrDie(myLiffId);
    }
	searchAction();
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();

    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}

/**
* Display data generated by invoking LIFF methods
*/
function displayLiffData() {
    document.getElementById('browserLanguage').textContent = liff.getLanguage();
    document.getElementById('sdkVersion').textContent = liff.getVersion();
    document.getElementById('lineVersion').textContent = liff.getLineVersion();
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
    document.getElementById('deviceOS').textContent = liff.getOS();
}

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in an external browser.';
    }
}
function generateFlex(profilePicURL,posterName,picURL,content,likes,time,URL){
    var flex = {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "image",
                    "url": picURL,
                    "size": "5xl",
                    "aspectMode": "cover",
                    "aspectRatio": "150:196",
                    "gravity": "center",
                    "flex": 1
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "image",
                        "url": profilePicURL,
                        "aspectMode": "cover",
                        "size": "full"
                      }
                    ],
                    "cornerRadius": "100px",
                    "width": "72px",
                    "height": "72px",
                    "spacing": "md"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": time,
                        "size": "xxs"
                      },
                      {
                        "type": "text",
                        "contents": [
                          {
                            "type": "span",
                            "text": posterName,
                            "weight": "bold",
                            "color": "#000000"
                          },
                          {
                            "type": "span",
                            "text": "     "
                          },
                          {
                            "type": "span",
                            "text": content
                          }
                        ],
                        "size": "sm",
                        "wrap": true
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "text",
                            "text": likes.concat(" Like"),
                            "size": "sm",
                            "color": "#bcbcbc",
                            "position": "relative"
                          }
                        ],
                        "spacing": "sm",
                        "margin": "md"
                      }
                    ]
                  }
                ],
                "spacing": "xl",
                "paddingAll": "20px"
              }
            ],
            "paddingAll": "0px",
            "action": {
              "type": "uri",
              "label": "action",
              "uri": URL
            }
        }
    }}
    return flex;
}
/**
* Register event handlers for the buttons displayed in the app
*/
function registerButtonHandlers() {
    // login call, only when external browser is used
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
            liff.login();
        }
    });

    // logout call only when external browse
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}

/**
* Alert the user if LIFF is opened in an external browser and unavailable buttons are tapped
*/
function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}
/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}

function searchAction(){
	const submit = document.getElementById("go");
	submit.addEventListener('click', function() {
		clearBox('container');
		var usage = document.querySelector('input[name = "usage"]:checked').value;
		if(usage === "user"){
			var user = document.getElementById("text");
			fetchTweetsByUser(user.value, "10", "false", "true");
			fetchTweetsByUser("realdonaldtrump", "10", "false", "true");
		}
		else if(usage === "keyword"){
			var txt = document.getElementById("text");
			fetchTweetsByText(txt.value);
		}
		else if(usage === "shareurl"){
            liff.getProfile().then(function(profile) {
            userId = profile.userId;
            fetch('/get-flex/'.concat(userId))
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                postId = jsonResponse.rows[0].postid;
                fetchTweetsByTweetID(postId);
            })
            .catch(function(error) {
                console.log(error)
            });
        }).catch(function(error) {
            window.alert('Error getting profile: ' + error);
        });
		}
	});
}

function fetchTweetsByUser(user, numcnts, rt, no_rp){
	url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+user+"&count="+numcnts+"&include_rts="+rt+"&exclude_replies="+no_rp;
	
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+bearerToken);

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow',
	};

	fetch("https://my-cors-anywhere.herokuapp.com/"+url, requestOptions)
	  .then(function(response) { return response.json(); })
	  .then(function(json) {
		  //console.log(json);
		  var x;
		  for(x in json){
			  //console.log(json[x]["id_str"]);
			  var child = document.createElement('div');
			  child.setAttribute("id", json[x]["id_str"]);
			  document.getElementById("container").appendChild(child);
			  embedTweet(json[x]["id_str"]);
			  createButton(json[x]["id_str"]);
		  }
	  })
	  .catch(error => console.log('error', error));
}

function fetchTweetsByTweetID(ID){
	url = "https://api.twitter.com/2/tweets/"+ID+"?";
	url += "&tweet.fields=created_at,public_metrics&expansions=author_id,attachments.media_keys&user.fields=profile_image_url&media.fields=preview_image_url,url";
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+bearerToken);

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow',
	};

	fetch("https://my-cors-anywhere.herokuapp.com/"+url, requestOptions)
	  .then(function(response) { return response.json(); })
	  .then(function(json) {
		  //prepare for flex massage
		  var user_id = json["includes"]["users"][0]["username"];
		  var username = json["includes"]["users"][0]["name"];
		  var prof_image_url = json["includes"]["users"][0]["profile_image_url"];
		  var image_url = [];
		  if(json["includes"].hasOwnProperty("media")) {
			  var x;
			  for(x in json["includes"]["media"]){
				if(json["includes"]["media"][x].hasOwnProperty("url")){
					image_url.push(json["includes"]["media"][x]["url"]);
				}
				else if(json["includes"]["media"][x].hasOwnProperty("preview_image_url")){
					image_url.push(json["includes"]["media"][x]["preview_image_url"]); 
				}
			  }
		  }
		  var tweet_text = json["data"]["text"];
		  var time = json["data"]["created_at"];
		  var like_count = json["data"]["public_metrics"]["like_count"];
		  like_count = parseInt(like_count, 10);
		  if(like_count > 1000){
			  like_count = (like_count - like_count%100) / 1000;
			  like_count = like_count.toString();
			  like_count += "K";
		  }
		  else like_count = like_count.toString();
		  var tweet_url = "https://twitter.com/i/web/status/"+json["includes"]["users"][0]["id"];
          if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([generateFlex(prof_image_url,username,image_url,tweet_text,like_count,time,tweet_url)]).then(
                document.getElementById('shareTargetPickerMessage').textContent = "Share target picker was launched."
            ).catch(function (res) {
                document.getElementById('shareTargetPickerMessage').textContent = "Failed to launch share target picker.";
            });
        }
	  })
	  .catch(error => console.log('error', error));
}

function fetchTweetsByTweetIDs(IDs){
	url = "https://api.twitter.com/2/tweets?ids=";
	var x;
	for (x in IDs) {
	  url += IDs[x];
	  url +=",";
	}
	url = url.slice(0, -1);
	url += "&tweet.fields=created_at,public_metrics&expansions=author_id,attachments.media_keys&user.fields=profile_image_url&media.fields=preview_image_url,url";
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+bearerToken);

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow',
	};

	fetch("https://my-cors-anywhere.herokuapp.com/"+url, requestOptions)
	  .then(function(response) { return response.json(); })
	  .then(function(json) {
		  var x;
		  for(x in json){
			  
		  }
	  })
	  .catch(error => console.log('error', error));
}

function fetchTweetsByText(txt){
	// hashtag: %23
	txt = encodeURIComponent(txt);
	url = "https://api.twitter.com/2/tweets/search/recent?query="+txt;
	//+"&tweet.fields=created_at,public_metrics&expansions=author_id,attachments.media_keys&user.fields=profile_image_url&media.fields=preview_image_url,url";
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+bearerToken);

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow',
	};

	fetch("https://my-cors-anywhere.herokuapp.com/"+url, requestOptions)
	  .then(function(response) { 
			return response.json(); })
	  .then(function(json) {
		  var x;
		  console.log(json);
		  for(x in json["data"]){
			  //console.log(json["data"][x]["id"]);
			  var child = document.createElement('div');
			  child.setAttribute("id", json["data"][x]["id"]);
			  document.getElementById("container").appendChild(child);
			  embedTweet(json["data"][x]["id"]);
			  createButton(json["data"][x]["id"]);
		  }
	  })
	  .catch(error => console.log('error', error));
}

function clearBox(elementID)
{
	document.getElementById(elementID).innerHTML = '';
    /*el = document.getElementById(elementID);
	while( el.hasChildNodes() ){
		el.removeChild(el.lastChild);
	}*/
}

function embedTweet(ID){
	twttr.widgets.createTweet(
		  ID,
		  document.getElementById(ID),
		  {
		  }
		);
}
function createButton(ID){
	var button = document.createElement('button');
	button.innerHTML = ID;
	button.addEventListener('click', function() {
		fetchTweetsByTweetID(ID);
	});
	document.getElementById(ID).appendChild(button);
}