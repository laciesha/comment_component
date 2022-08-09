/*
The job of the state manager is to: 
    1. + organize the data.
    2. update the data when a component notifies the state manager.
    3. let other components know when the data has changed.


Each comment has:
    1. Name of the person
    2. Email
    3. Comment
    4. Timestamp
*/

export default class StateManager {
    constructor() {
        // this week: figuring out how to store and then reload
        // comments using indexDB.
        // this.comments = [
        //     {
        //         name: "Greg",
        //         email: "greg@gmail.com",
        //         comment: "Here is my comment!",
        //         timestamp: "7/29/2022 3:15:13PM"
        //     },
        //     {
        //         name: "Bobby",
        //         email: "bobby@gmail.com",
        //         comment: "text text text text text text text text text text ",
        //         timestamp: "8/3/2022 3:15:13PM"
        //     },
        //     {
        //         name: "Marsha",
        //         email: "marsha@gmail.com",
        //         comment: "text text text text text text text text text text ",
        //         timestamp: "8/4/2022 3:15:13PM"
        //     }
        // ]
        //mailing list
        this.subscribers = [];
        this.loadDatabase();
    }
    //loads database 
    //creats a new comment store if it doesn't exsist 
    //reads the comment stor
    loadDatabase(){
        let db;

var openRequest = indexedDB.open('my_app_db', 2);


// 1. This function created our new data store:
openRequest.onupgradeneeded = function(e) {
    var db = e.target.result;
    console.log('running onupgradeneeded');

    // create new data stores:
    if (!db.objectStoreNames.contains('comments')) {
        var storeOS = db.createObjectStore('comments',
        {keyPath: 'id', autoincrement: true});
    }
};

// 2. This function fires when the database has been opened.
// This is where we will add new comments to the datastore:
openRequest.onsuccess = (function(e) {
    console.log('running onsuccess');
    db = e.target.result;
    // call this function to create a new comment:
    
    this.readCommentsFromDataStore(db);

}).bind(this);


    }

    // 2. we need a way to update the comments list
    addComment(newComment){
        // this code is adding a new comment object to the comments array
        this.comments.push(newComment);
        console.log(this.comments);
        this.notify("comment-added", this.comments);
        
       
    }

    // 3. we need a way to tell the other components to redraw
    subscribe(theEvent, theResponse) {
        //this code adds a list of two elements to the subscribers array
        //the first elements is a string that indicates which event the subsciber is interested in
        //the second element is a function that will get invoked when the event happens
        this.subscribers.push([
            theEvent, theResponse
        ]);
    }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   

    notify(theEvent, theData) {
         //now you need to notify all the subscribers that a comment has been added
        //so that each subscriber can respond
        //to do this we're going to loop through each subscriber and invoke a callback function
        for(let i = 0; i < this.subscribers.length; i++){
            const subsciberEvent = this.subscribers[i][0];
            const theFunction = this.subscribers[i][1];
            if(theEvent === subsciberEvent){
                theFunction(theData);
            }
        }
    }
   
    readCommentsFromDataStore = (db) => {
        var transaction = db.transaction('comments', 'readonly');
        var objectStore = transaction.objectStore('comments');
        var cursorRequest = objectStore.openCursor();
        var commentList = [];
        cursorRequest.onsuccess = function (event){
            if (event.target.result){
                // if(event.target.result.value['id'] && event.target.result.value['id'] == value){ //compare values
                    commentList.push(event.target.result.value);
                // }
                event.target.result['continue']();
            }
        };
    
        transaction.oncomplete = (function (event) {
            console.log(commentList);
            this.notify("comments-loaded", commentList);
        
            // callback(agregate); // return items
        }).bind (this);
    }
    
}